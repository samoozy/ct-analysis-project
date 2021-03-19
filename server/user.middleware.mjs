import { auth } from './auth.mjs'

export function getUserMiddleware(req, res, next) {
  const jwt = req.headers.authorization

  if(jwt) {
    auth.verifyIdToken(jwt)
    .then(jwtPayload => {
      req["uid"] = jwtPayload.uid
      next()
    })
    .catch(err => {
      console.log("認証に失敗", err)
      res.status(403).json({message: "認証に失敗しました"})
    })
  } else {
    next()
  }

}