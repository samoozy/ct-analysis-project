import Stripe from "stripe"
import {db, getDocData} from "./database.mjs"
import {Timestamp} from "@google-cloud/firestore"


export async function createCheckoutSession(req, res) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    // Create info object with reuqest body
    const info = {
      pricingPlanId: req.body.pricingPlanId,
      callbackUrl: req.body.callbackUrl,
      userId: req['uid']
    }


    // User Verification
    if(!info.userId) {
      console.log('認証されていないユーザー')
      res.status(403).json({message: "認証されていないユーザーです。"})
    }


    // Store checkout record to firestore
    // Create a collection on firestore
    const purchaseSession = await db.collection("purchaseSessions").doc()
    const checkoutSessionData = {
      status: "ongoing",
      created: Timestamp.now(),
      userId: info.userId,
      pricingPlanId: info.pricingPlanId
    }
    await purchaseSession.set(checkoutSessionData)


    // Find customer id
    const user = await getDocData(`users/${info.userId}`)
    const stripeCustomerId = user ? user.customer : undefined
    // Initiate Stripe checkout session
    const sessionConfig = setupSubscription(info, purchaseSession.id, stripeCustomerId)
    const session = await stripe.checkout.sessions.create(sessionConfig)


    // Send back the response data to frontend
    res.status(200).json({
      id: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY
    })


  } catch(error) {
    console.log("Unexpected error occured while purchasing: " + error)
    res.status(500).json({
      error: "Could not initiate Stripe checkout"
    })
  }
}

function setupSubscription(info, sessionId, stripeCustomerId) {
  const sessionConfig = {
    payment_method_types: ['card'],
    success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingPurchaseSessionId=${sessionId}`,
    cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
    locale: 'ja',
    subscription_data: {
      items: [
        {plan: info.pricingPlanId}
      ]
    },
    client_reference_id: sessionId,
  }
  // Set cutomer id if the user is a returning customer.
  if(stripeCustomerId) {
    sessionConfig.customer = stripeCustomerId
  }

  return sessionConfig
}

