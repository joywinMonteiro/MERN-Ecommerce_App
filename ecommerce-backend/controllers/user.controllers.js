import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import jwt, { decode } from "jsonwebtoken"


const registerUser = async (req, res) =>{
    const {username, email, password} = req.body

    try { 
        
        if((!username || !email || !password) === "")
            return res.status(400).json({message: "All fields are necessary!!"})

        const existedUser = await User.findOne({
            $or: [{email}, {username}]
        })

        if(existedUser)
            return res.status(403).json({messsage: "User already exists"})

        const user = await User.create({
            username, 
            email, 
            password
        })
        await user.save()
        res.staus(201).json(user)
    } catch (error) {
        console.error("error: ", error);
        res.status(422).json(error)
    }
}


const jwtSecret = "dfb3sdga346sjdg246ujdfgw4js"
const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.findOne({email})
        if(user){
            const passwordOk = bcrypt.compareSync(password, user.password)
            if(passwordOk){
                const token = jwt.sign({ email: user.email, id: user._id, username: user.username }, jwtSecret)
                    res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'}).json(user)
                    }
            else{
                res.status(422).json("password incorrect!!")
            }
        }else{
            res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        console.error("error: ", error);
        res.status(500).json("Internal Server error")
    }  
}


const userProfile = async(req, res) => {
    const { token } = req.cookies
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if(err) throw err
            const userInfo = await User.findById(user.id).select("-password")
            res.json(userInfo)
        })
    }else{
        res.json(null)
    }
}

const authenticate = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
};


export { registerUser, loginUser, userProfile, authenticate }

