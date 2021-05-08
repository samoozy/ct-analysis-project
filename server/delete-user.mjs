import { auth } from './auth.mjs'
import Stripe from "stripe"
import {db, getDocData} from "./database.mjs"
import env from "./environments.mjs"

const stripe = new Stripe(env.stripe.secretKey)

export async function deleteUser(req, res) {
  try {
    // User Verification
    if(!req['uid']) {
      console.log('認証されていないユーザー')
      res.status(403).json({message: "認証されていないユーザーです。"})
    }

    const uid = req['uid']

    /**
     * get user document
     * returns undefined if no documen is found
     */
    const user = await getDocData(`users/${uid}`)

    if(user) {
      // get the customer id
      const documentSnapshot = await db.doc(`users/${uid}`).get()
      const customerId = documentSnapshot.get('customer')

      /**
       * Stripe webhook has a problem with firebase async await calls for some reason. Therefore the user documentation must be deleted here and not with the webhook.
       * 
       * Also the user document must be deleted first in order to prevent customer.subscription.deleted Event from creating a new user document.
       */
      await deleteUserDocument(uid)

      /**
       * delete customer
       */
      await stripe.customers.del(customerId)

    }

    // Delete firebase user
    await auth.deleteUser(uid)


    // return 200response 
    res.status(200).json({
      deleted: true
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: "Something went wrong while deleting the user"
    })
  }
}

function deleteUserDocument(userId) {
  const batch = db.batch()

  const userRef = db.doc(`users/${userId}`)

  batch.delete(userRef)

  return batch.commit()
}

