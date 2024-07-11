import express from "express"
import { authenticate, loginUser, registerUser, userProfile } from "../controllers/user.controllers.js"
import { productData } from "../controllers/category.controllers.js"
import { addCartItems, getCartItems, removeItem } from "../controllers/cart.controllers.js"
import orderItems from "../controllers/orders.controllers.js"



const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", userProfile)
router.get("/products", productData)
router.post("/cart", authenticate, addCartItems)
router.post("/orders",authenticate, orderItems)
router.get("/cart", authenticate, getCartItems)
router.delete("/cart/:itemId", authenticate, removeItem)



export default router 