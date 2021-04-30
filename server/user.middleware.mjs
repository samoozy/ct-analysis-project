import { auth } from './auth.mjs'

export async function getUserMiddleware(req, res, next) {
  const jwt = req.headers.authorization

  if(jwt) {

    const jwtPayload = await auth.verifyIdToken(jwt)
    const uid = jwtPayload.uid

    // Get user email verification
    // If its false return 403
    const user = await auth.getUser(uid)
    
    if(!user.emailVerified) {
      const message = "このメールアドレスは認証されていません。"
      console.log(message)
      res.status(403).json({message})
    }

    req['uid'] = uid

    next()

  } else {

    const message = "トークンが確認できません。"
    console.log(message)
    res.status(403).json({message})

  }

}