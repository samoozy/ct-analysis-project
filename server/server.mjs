import express from 'express'
import {createCheckoutSession} from './checkout.route.mjs'
import {getUserMiddleware} from './user.middleware.mjs'
import {createCustomerPortalSession} from './customer-portal.route.mjs'
import {stripeWebhook} from './stripe-webhooks.route.mjs'
import {signedUrl} from './signed-url.route.mjs'
import {deleteUser} from './delete-user.mjs'
import cors from 'cors'


export function initServer() {

  const app = express()

  app.use(cors())

  app.route("/").get((req, res) => {
    res.status(200).send("<h1>API IS RUNNING</h1>")
  })

  app.route("/api/checkout/").post(
    express.json(),
    getUserMiddleware,
    createCheckoutSession
  )

  app.route("/api/customer-portal/").post(
    express.json(),
    getUserMiddleware,
    createCustomerPortalSession
  )

  app.route("/stripe-webhooks").post(
    express.raw({type: 'application/json'}),
    stripeWebhook
  )
  

  app.route("/downloads").post(
    express.json(),
    getUserMiddleware,
    signedUrl
  )

  app.route("/user/delete").post(
    express.json(),
    getUserMiddleware,
    deleteUser
  )


  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
  })
}