import { Firestore } from '@google-cloud/firestore'
import env from "./environments.mjs"

const serviceAccountPath = `./service-accounts/${env.firebase.serviceAccount}`

export const db = new Firestore({
  projectId: env.firebase.projectId,
  keyFilename: serviceAccountPath
})

export async function getDocData(docPath) {
  const snap = await db.doc(docPath).get()
  return snap.data()
}
