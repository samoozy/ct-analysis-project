import { createApp } from 'vue'

import router from './router.js'
import store from './store/index.js'
import App from './App.vue'

import BaseCard from './components/ui/BaseCard.vue'

// Initialize firebase auth
import environments from '@/environments/environments.js'
import firebase from "firebase/app"
import "firebase/auth"

if (!firebase.apps.length) {
  firebase.initializeApp(environments.firebase);
}

const app = createApp(App)



app.use(router)
app.use(store)

app.component('base-card', BaseCard)

app.mount('#app')
