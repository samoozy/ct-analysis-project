import admin from "firebase-admin"
import env from "./environments.mjs"

const serviceAccountPath = `./service-accounts/${env.firebase.serviceAccount}`

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath)
})

export const auth = admin.auth()