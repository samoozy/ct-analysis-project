import Stripe from "stripe"
import {db, getDocData} from "./database.mjs"
import {Timestamp} from "@google-cloud/firestore"
import env from "./environments.mjs"
const stripe = new Stripe(env.stripe.secretKey)

export async function createCheckoutSession(req, res) {
  try {

    // User Verification
    if(!req['uid']) {
      console.log('認証されていないユーザー')
      res.status(403).json({message: "認証されていないユーザーです。"})
    }

    /**
     * Check to see if the user is already a paid subscriber by comparing the pricingPlanId field in user document with the request body's pricingPlanId.
     * Send back a 403 error status response if the user is already a paid subscriber
     */
    const documentSnapshot = await db.doc(`users/${req['uid']}`).get()
    const pid = documentSnapshot.get('pricingPlanId')
    const priceId = pid ? pid : undefined
    if(priceId === req.body.pricingPlanId) {
      console.log("有料会員に登録済み")
      res.status(403).json({message: "このアカウントは、有料会員に登録済みです"})
    }

    // Create info object with reuqest body
    const info = {
      pricingPlanId: req.body.pricingPlanId,
      callbackUrl: req.body.callbackUrl,
      userId: req['uid']
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
      stripePublicKey: env.stripe.publicKey
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

