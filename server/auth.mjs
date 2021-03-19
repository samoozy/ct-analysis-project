import admin from "firebase-admin"
import dotenv from 'dotenv'
dotenv.config()

const serviceAccountPath = `./service-accounts/${process.env.SERVICE_ACCOUNT_FILE_NAME}`

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
})

export const auth = admin.auth()