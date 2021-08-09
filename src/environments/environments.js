let environments = {
  firebase: {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
  },
  stripe: {
    publicKey: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
    pricingPlanId: process.env.VUE_APP_STRIPE_PRICING_PLAN_ID
  },
  strapi: {
    url: process.env.VUE_APP_STRAPI_URL,
  },
  contactForm: {
    url: process.env.VUE_APP_CONTACT_FORM
  }
}

if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
  environments.api = {
    url: `${window.location.protocol}//${window.location.hostname}:3000`
  }
  environments.front = {
    url: `${window.location.protocol}//${window.location.hostname}:8080`
  }
} else if(process.env.NODE_ENV == "production") {
  environments.api = {
    url: process.env.VUE_APP_PROD_API_URL
  }
  environments.front = {
    url: process.env.VUE_APP_PROD_FRONT_URL
  }
}

export default environments