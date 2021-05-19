import environments from "@/environments/environments"
import firebase from 'firebase/app'
import 'firebase/auth'

class FirebaseAuth {
  constructor(password, email) {
    this._user = firebase.auth().currentUser
    this._url = environments.front.url
    this._password = password
    this._email = email
  }


  /**
   * Create new user with email and password
   */
  async createUserWithEmailAndPassword() {
    const credential = await firebase.auth().createUserWithEmailAndPassword(this._email, this._password)
    const actionCodeSettings = {
      url: this._url
    }
    await credential.user.sendEmailVerification(actionCodeSettings)
  }


  /**
   * Login user with email and password
   */
  async loginUserWithEmailAndPassword() {
    await firebase.auth().signInWithEmailAndPassword(this._email, this._password)
  }


  /**
   * Signin with Google
   */
  async signInWithGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'ja'
    await firebase.auth().signInWithPopup(provider)
  }


  /**
   * Reauthenticate with credential
   */
  async reauthenticateWithCredential() {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this._user.email,
      this._password
    )
    await this._user.reauthenticateWithCredential(credential)
  }


  /**
   * Reauthenticate with Google Auth
   */
  async reauthenticateWithGoogleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'ja'
    await this._user.reauthenticateWithPopup(provider)
  }


  /**
   * Resend Email Verification
   */
   async resendEmailVerification() {
    const actionCodeSettings = {
      url: this._url
    }
    await this._user.sendEmailVerification(actionCodeSettings)
  }


  /**
   * Reset Password
   */
  async sendResetPasswordEmail() {
    const actionCodeSettings = {
      url: this._url
    }
    await firebase.auth().sendPasswordResetEmail(this._email, actionCodeSettings)
  }


  /**
   * Delete Account permanently
   */
  async initDeleteUserRequest() {
    try {
      const jwt = await this._getAccessToken()
      
      // check if jwt is empty
      if(!jwt) {
        return
      }

      const response = await fetch(`${environments.api.url}/user/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt
        },
      })

      const session = await response.json()

      return session

    } catch(err) {
      console.log(err)
    }
  }


  async _getAccessToken() {
    try {
      if(this._user) {
        return await this._user.getIdToken()
      } else {
        return null
      }
    } catch(err) {
      console.log(err)
    }
  }

}

export default FirebaseAuth