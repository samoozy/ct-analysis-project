// import firebase from 'firebase/app'
// import 'firebase/auth'

export default class FirebaseAuth {
  constructor() {
    this.user
  }

  get current() {
    return this.user
  }

  set setUser(a) {
    this.user = a
  }
}