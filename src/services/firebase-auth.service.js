import firebase from 'firebase/app'
import 'firebase/auth'

class FirebaseAuth {
  constructor(password) {
    this._user = firebase.auth().currentUser
    this._password = password
  }

  async reauthenticateWithCredential() {
    this._user.providerData.forEach(provider => {
      console.log(provider.providerId)
    })
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