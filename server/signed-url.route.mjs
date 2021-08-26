import env from "./environments.mjs"
import {db, getDocData, getDocIdByPropValue} from "./database.mjs"
import { Storage } from "@google-cloud/storage"

const serviceAccountPath = `./service-accounts/${env.firebase.serviceAccount}`

const bucketName = env.firebase.bucketName

const storage = new Storage({
  projectId: env.firebase.projectId,
  keyFilename: serviceAccountPath
})

export async function signedUrl(req, res, next) {
  try {

    const fileName = `${req.body.reportId}.pdf`

    /**
     * check if the user is a paid subscriber
     * returns Boolean
     */
    const subscriber = await checkIfUserIsSubscriber(req['uid'], req.body.pricingPlanId)

    /**
     * Gets the reports document id by its name field
     * returns String
     */
    const reportDocId = await getDocIdByPropValue('reports/', 'name', req.body.reportId)

    /**
     * Get paid field from reports document
     * paid field stores Boolean
     */
    const reportDocData = await getDocData(`reports/${reportDocId}`)
    const paid = reportDocData.paid

    // reportDownloadsに保存するデータ
    const downloadData = {
      fileName: fileName,
      reportId: req.body.reportId,
      reportDocId: reportDocId,
      userId: req['uid'],
      timestamp: formatDate()
    }

    if(subscriber) {
      /**
       * paid user
       */

      // signedUrl発行時に、ユーザーがダウロードしたことをfirestoreに記録する
      await addReportDownloads(downloadData);

      const url = await generateV4ReadSignedUrl(storage, bucketName, fileName);

      res.status(200).json({
        signedUrl: url,
        success: true
      })
    } else {
      /**
       * free user
       */

      if(paid) {
        // return access denied
        res.status(403).json({error: "有料会員のみアクセス可能"})
      } else {

        // signedUrl発行時に、ユーザーがダウロードしたことをfirestoreに記録する
        await addReportDownloads(downloadData);
        // free report
        const url = await generateV4ReadSignedUrl(storage, bucketName, fileName);

        res.status(200).json({
          signedUrl: url,
          success: true
        })
      }
    }
  
  } catch(err) {
    return res.status(400).send(`SignedUrl Error: ${err.message}`)
  }
  
}

function formatDate() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

async function addReportDownloads(downloadData) {
  return await db.collection('reportDownloads').add(downloadData)
}

async function checkIfUserIsSubscriber(userId, pricingPlanId) {

  try {
    // Check if the user has this specific pricingPlanId in its pricingPlanId field
    const documentSnapshot = await db.doc(`users/${userId}`).get()
    const pid = documentSnapshot.get('pricingPlanId')
    
    if(pid === pricingPlanId) {
      return true
    } else {
      return false
    }

    /**
     * This is for deleting the user document
     */
    // const user = await getDocData(`users/${userId}`)
    // if(user) {
    //   return true
    // } else {
    //   return false
    // }
  } catch(err) {
    return res.status(400).send(`SignedUrl Error: ${err.message}`)
  }

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

  } catch(err) {
    return res.status(400).send(`SignedUrl Error: ${err.message}`)
  }
}