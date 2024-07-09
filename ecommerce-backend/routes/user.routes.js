import express from "express"
import { loginUser, registerUser, userProfile } from "../controllers/user.controllers.js"
import { productData } from "../controllers/category.controllers.js"
const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", userProfile)
router.get("/products", productData)

export default router 