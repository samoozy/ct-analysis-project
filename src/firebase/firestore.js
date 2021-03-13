import Firebase from 'firebase/app'
import 'firebase/firestore'

import env from '../environments/environments'

const config = env.firebase

Firebase.initializeApp(config)
const firestore = Firebase.firestore()

export default firestore