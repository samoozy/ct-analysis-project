import Stripe from "stripe"
import env from "./environments.mjs"
import {getDocData} from "./database.mjs"
const stripe = new Stripe(env.stripe.secretKey)

export async function createCustomerPortalSession(req, res) {
  try {
    const userId = req['uid']
    const returnUrl = req.body.returnUrl

    // User Verification
    if(!userId) {
      console.log('認証されていないユーザー')
      res.status(403).json({message: "認証されていないユーザーです。"})
    }

    // get stripe customer id
    const user = await getDocData(`users/${userId}`)

    const stripeCustomerId = user ? user.customer : null
    // End the session if no customer Id is found
    // No customer id means the user isnt a subscriber
    if(!stripeCustomerId) {
      console.log('このユーザーはまだStripeに登録されていません')
      res.status(403).json({error: "有料会員のみアクセス可能"})

    } else {

      // Start customer portal session
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: returnUrl
      })

      // Send back the url to frontend
      res.status(200).json({
        url: session.url,
        success: true
      })
    }

    // This causes CORS error. Cant find the solution.
    // Maybe has to do with cors not being able to recoginize status code 302 as a valid status
    // res.redirect(session.url)

  } catch(error) {
    console.log("Unexpected error occured while accessing customer portal: " + error)
    res.status(500).json({
      error: "Could not initiate customer portal"
    })
  }
}