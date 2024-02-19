import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"


async function register(req,res){
    const {email, password,username} = req.body
    
    try{
        const userFound = await User.findOne({email})  // cheque de si el usuario existe
        if(userFound) return res.status(400).json({ error: "El correo electrónico ya existe"  })


        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username ,
            email ,
            password: passwordHash
        })
        const savedUser = await newUser.save()

        const token = await createAccessToken({
                id: savedUser._id
            })
        
        res.cookie("token", token)
        res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt 
        })

// LLEVADO A JWT.JS  
        // jwt.sign({
        //     id: savedUser._id
        // },
        // "secret123",  // key para cifrar y decifrar
        // {
        //   expiresIn: "1d"  // options
        // },
        // (err, token) => {
        //     if (err) console.log(err)
        //     res.cookie("token", token)
        //     res.json({message: "User created succesfully"})
        // })
    }catch(e){
        res.status(400).json({message: e.message})
    }
    
}


async function login(req,res){
    const {email, password} = req.body
    
    try{
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json({message: "User not found"})

        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        const token = await createAccessToken({
                id: userFound._id,
                name: userFound.username
            })
        
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt 
        })

    }catch(e){
        res.status(400).json( {message: e.message}  );
    }
    
}


function logout(req, res) {
    res.cookie("token", "", {expires: new Date(0)})
    res.sendStatus(200)
}

function verifyToken(req, res){
    const {token} = req.body
    if(!token) return res.status(401).json({message: "unauthorized"})

    jwt.verify(token, TOKEN_SECRET, async (err, decodedUser) => {
        // if(!token) return res.status(401).json({message: "unauthorized"})
        if(err && err.name == "TokenExpiredError") return res.status(401).json({message: "TokenExpiredError"})

        const userFound = await User.findById(decodedUser.id)
        if(!userFound) return res.status(401).json({message: "unauthorized"})

        return  res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt 
        })
    })
}


async function profile(req, res){
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: "User Not Found"})
    
    return  res.json({
           id: userFound._id,
           username: userFound.username,
           email: userFound.email,
           createdAt: userFound.createdAt 
       })
}


export  {register, login, logout, profile, verifyToken}