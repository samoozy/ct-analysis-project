import { createApp } from 'vue'

import router from './router.js'
import store from './store/index.js'
import App from './App.vue'

import BaseCard from './components/ui/BaseCard.vue'

// Initialize firebase auth
import environments from '@/environments/environments.js'
import firebase from "firebase/app"
import "firebase/auth"

// Make sure to initialize the firebase auth SDK only once, otherwise the app will try to call initializeApp multiple times and cause an error.
if (!firebase.apps.length) {
  firebase.initializeApp(environments.firebase);
}

const app = createApp(App)


app.use(router)
app.use(store)

app.component('base-card', BaseCard)

app.mount('#app')
