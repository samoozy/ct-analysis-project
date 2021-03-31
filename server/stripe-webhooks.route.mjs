import Stripe from "stripe"
import {getDocData, db} from "./database.mjs"
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

    // checkout.session.completed
    if(event.type === "checkout.session.completed") {
      const session = event.data.object
      onCheckoutSessionCompleted(session)
    }
    // customer.subscription.deleted
    if(event.type === "customer.subscription.deleted") {
      console.log("CUSTOMER DELETED!")
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
  // the id of the purchase session
  const purchaseSessionId = session.client_reference_id

  const {userId, pricingPlanId} = await getDocData(`purchaseSessions/${purchaseSessionId}`)

  await fulfillSubscriptionPurchase(userId, pricingPlanId, purchaseSessionId, session.customer)
}

async function fulfillSubscriptionPurchase(userId, pricingPlanId, purchaseSessionId, customer) {
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
