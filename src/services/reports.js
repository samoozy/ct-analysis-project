import environments from '@/environments/environments'
import firebase from 'firebase/app'
import 'firebase/auth'


export default class ReportsService {
  constructor(reportId) {
    this.reportId = reportId
    this.subStatus = null
    this.endpoint = environments.api.url
    this.pricingPlanId = environments.stripe.pricingPlanId
    this.jwt = null
  }

  async generateSignedUrl() {
    try {
      this.jwt = await this.getAccessToken()

      const response = await fetch(`${this.endpoint}/downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.jwt
        },
        body: JSON.stringify({
            reportId: this.reportId, 
            pricingPlanId: this.pricingPlanId
          })
      })

      const session = await response.json()

      return session

    } catch(err) {
      console.log(err)
    }
  }

  async getAccessToken() {
    try {
      const user = firebase.auth().currentUser
      if(user) {
        return await user.getIdToken()
      }
      console.log("ログインしてください")
      return null

    } catch(err) {
      console.log(err)
    }
  }
}