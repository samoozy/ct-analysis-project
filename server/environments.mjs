import dotenv from 'dotenv'
import path from 'path'

// process.env.ENVIRONMENT is set in package.json script
const envpath = path.resolve(new URL(import.meta.url).pathname, `../config/${process.env.ENVIRONMENT}.env`)

dotenv.config({path: envpath})

export default {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  firebase: {
    serviceAccount: process.env.SERVICE_ACCOUNT_FILE_NAME,
    projectId: process.env.PROJECT_ID,
    bucketName: process.env.STORAGE_BUCKET_NAME
  }
}