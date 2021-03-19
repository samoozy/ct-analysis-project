import express from 'express'
import {createCheckoutSession} from './checkout.route.mjs'
import {getUserMiddleware} from './user.middleware.mjs'
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

  app.route("/stripe-webhooks").post(

  )

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
  })
}