import env from "./environments.mjs"
import {getDocData, getDocIdByPropValue} from "./database.mjs"
import { Storage } from "@google-cloud/storage"

export async function signedUrl(req, res, next) {
  try {
    const serviceAccountPath = `./service-accounts/${env.firebase.serviceAccount}`
    const storage = new Storage({
      projectId: env.firebase.projectId,
      keyFilename: serviceAccountPath
    })
    const bucketName = env.firebase.bucketName
    const reportId = req.body.reportId
    const fileName = `${reportId}.pdf`
    const userId = req['uid']
    const subscriber = await checkIfUserIsSubscriber(userId)
    const reportDocId = await getDocIdByPropValue('reports/', 'name', reportId)
    const reportDocData = await getDocData(`reports/${reportDocId}`)
    const paid = reportDocData.paid

    if(subscriber) {
      // Has access to both free and paid url
      const url = await generateV4ReadSignedUrl(storage, bucketName, fileName)

      res.status(200).json({
        signedUrl: url,
        success: true
      })
    } else {
      if(paid) {
        // Has no access to paid url
        res.status(403).json({error: "有料会員のみアクセス可能"})
      } else {
        // Has access to free url
        const url = await generateV4ReadSignedUrl(storage, bucketName, fileName)

        res.status(200).json({
          signedUrl: url,
          success: true
        })
      }
    }

    // console.log(`subscriber: ${subscriber}`)
    // console.log(`fileName: ${fileName}`)
    // console.log(`paid: ${paid}`)
  
  } catch(error) {
    console.error()
  }
  
}

async function checkIfUserIsSubscriber(userId) {
  const user = await getDocData(`users/${userId}`)

  // If no user exits, the user is not a subscriber so should not be able to access paid download link
  if(user) {
    return true
  }

  return false
}

async function generateV4ReadSignedUrl(storage, bucketName, fileName) {

  try {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 2 * 60 * 1000
    }
  
    const [url] = await storage
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(options)
  
    return url

  } catch(error) {
    console.error()
  }
}