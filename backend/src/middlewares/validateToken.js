import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export function validateToken( req, res, next){
    // const token = req.headers.cookie
    const {token} = req.cookies
    
    console.log("token: ", req.cookies)
    
    if(!token) return res.status(401).json({message: "No token"})
    
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: "No valid token"})
        req.user = decoded
        
        next()
    })

}