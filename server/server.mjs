import express from 'express'
import {createCheckoutSession} from './checkout.route.mjs'
import {getUserMiddleware} from './user.middleware.mjs'
import {createCustomerPortalSession} from './customer-portal.route.mjs'
import {stripeWebhook} from './stripe-webhooks.route.mjs'
import cors from 'cors'

// used for downloads
import env from "./environments.mjs"
import { Storage } from "@google-cloud/storage"


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
  

  app.route("/downloads").get((req, res) => {
    const serviceAccountPath = `./service-accounts/${env.firebase.serviceAccount}`
    const bucketName = env.firebase.bucketName

    const storage = new Storage({
      projectId: env.firebase.projectId,
      keyFilename: serviceAccountPath
    })

    async function generateV4ReadSignedUrl() {

      const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 2 * 60 * 1000,
      }

      const [url] = await storage
        .bucket(bucketName)
        .file('report15.pdf')
        .getSignedUrl(options)
      
      console.log(url)
    }

    generateV4ReadSignedUrl().catch(console.error())

    res.send("download...")
  })



  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
  })
}