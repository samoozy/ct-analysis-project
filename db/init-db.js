const data = require('./db-data')
const firebase = require('firebase')

// dotenv is required to access the env variables because this file is not a part of Vue
require('dotenv').config()

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
}

console.log('Uploading to firestore with the following config...\n')
console.log('config:')
console.log(JSON.stringify(config))

firebase.initializeApp(config)
const db = firebase.firestore()

async function uploadData() {
  const batch = db.batch()
  const articles = db.collection('articles')

  Object.values(data.ARTICLES)
    .forEach(async (article) => {
      const articleRef = await articles.add(article)
      const content = articleRef.collection("content")
      const articleContent = data.findContentForArticle(article.id)

      await content.add(articleContent)

    })
  
  return batch.commit()
}


uploadData().then(() => {
  console.log("Writing data...")
  setTimeout(() => {
    console.log("Data upload complete")
    process.exit(0)
  }, 5000)
}).catch(err => {
  console.log("Data upload failed: ", err)
  process.exit(-1)
})