import express from "express"
import { loginUser, registerUser, userProfile, productData } from "../controllers/user.controllers.js"
const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", userProfile)
router.get("/products", productData)

export default router 