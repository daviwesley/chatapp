import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"


export function authenticateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(req.cookies);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, "yourSecretKey", (err: any, user: any) => {
      if (err) return res.sendStatus(403)
      next()
    })
  }