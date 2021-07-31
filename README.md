# ct-analysis-project

## Required env setup
### firebase app
```
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_PROJECT_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=
VUE_APP_FIREBASE_APP_ID=
```
### stripe keys
```
VUE_APP_STRIPE_PRICING_PLAN_ID=
VUE_APP_STRIPE_PUBLIC_KEY=
```
### strapi url
```
VUE_APP_STRAPI_URL=
VUE_APP_PROD_API_URL=
```
### front url
```
VUE_APP_PROD_FRONT_URL=
```

## Frontend setup
### frontend development server
```
localhost:8080
```
### npm setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Always run this before deploying to firebase hosting
```
npm run build
```

## Server-side Node.js and Stripe endpoint
### api development server
```
localhost:3000
```
### The server directory contains all the server-side code
```
npm run server
```

## production setup
### Frontend deployment
firebase hosting
```
firebase deploy
```
### Backend deployment
GCP app engine
```
gcloud app deploy
```