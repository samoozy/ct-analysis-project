import CheckoutService from './checkout'

export default class CustomerPortal extends CheckoutService {
  constructor(...args) {
    super(...args)
  }

  buildReturnUrl() {
    let url = `${this.protocol}//${this.hostname}`

    return this.port ? url += `:${this.port}` : url
  }

  async startCustomerPortalSession() {
    try {
      this.jwt = await super.getAccessToken()

      // End the session if no access token
      if(!this.jwt) {
        return null
      }

      const data = {
        returnUrl: this.buildReturnUrl()
      }

      const response = await fetch(`${this.endpoint}/api/customer-portal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.jwt
        },
        body: JSON.stringify(data)
      })

      const session = await response.json()

      return session

    } catch(err) {
      console.log("startCustomerPortalSession: " + err)
    }
  }
}