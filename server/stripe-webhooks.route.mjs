import Stripe from "stripe"
import {getDocIdByPropValue, getDocData, db} from "./database.mjs"
import env from "./environments.mjs"

const stripe = new Stripe(env.stripe.secretKey)

export async function stripeWebhook(req, res) {
  try {
    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.stripe.webhookSecret
    )

    // Business logic
    // check which event to trigger webhook
    switch(event.type) {
      // checkout.session.completed
      case "checkout.session.completed":
        const session = event.data.object
        await onCheckoutSessionCompleted(session)
        break
      // customer.subscription.deleted
      case "customer.subscription.deleted":
        const subscriptionDeleted = event.data.object
        await onSubscriptionDeleted(subscriptionDeleted)
        break
      default:
        // console.log(`Unhandled event type ${event.type}`)
        break
    }

    // Send response to Stripe acknowledging that the server did receive the Event Object and handled it accordingly
    res.json({received:true})

  } catch(err) {
    console.log('Error processing webhook event', err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
}




// New subscription
async function onCheckoutSessionCompleted(session) {
  try {

    // the id of the purchase session
    const purchaseSessionId = session.client_reference_id

    const {userId, pricingPlanId} = await getDocData(`purchaseSessions/${purchaseSessionId}`)

    await fulfillSubscriptionPurchase(userId, pricingPlanId, purchaseSessionId, session.customer)

  } catch(err) {
    return res.status(400).send(`Webhook error: ${err.message}`)
  }
}

function fulfillSubscriptionPurchase(userId, pricingPlanId, purchaseSessionId, customer) {
  const batch = db.batch()

  // Change the status to complete
  const purchaseSessionRef = db.doc(`purchaseSessions/${purchaseSessionId}`)
  batch.update(purchaseSessionRef, {status: "completed"})

  // Add the pricingPlanId to the user
  const userRef = db.doc(`users/${userId}`)
  batch.set(userRef, {pricingPlanId, customer}, {merge: true})

  return batch.commit()
}






// Subscription deleted
async function onSubscriptionDeleted(subscriptionDeleted) {
  try {
    const customerId = subscriptionDeleted.customer

    // Get the user Id associated with the stripe customer id
    const userId = await getDocIdByPropValue('users', 'customer', customerId)

    // Check if the user document exists. If it doesnt, terminate the execution.
    const user = await getDocData(`users/${userId}`)
    if(!user) {
      return
    }
  

    await removePricingPlanIdFromUser(userId)

  } catch(err) {
    return res.status(400).send(`Webhook error: ${err.message}`)
  }
}



function removePricingPlanIdFromUser(userId) {

  const batch = db.batch()

  const userRef = db.doc(`users/${userId}`)
  // batch.delete(userRef)
  batch.update(userRef, {pricingPlanId: ""})

  return batch.commit()
}
