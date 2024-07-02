import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/dbConnect.js"
import cookieParser from "cookie-parser"

dotenv.config()

const PORT = process.env.PORT || 3000

connectDB()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.listen(PORT , () =>{
    console.log(`Server running at port: ${PORT}`);
})

app.get('/', (req, res) =>{
    res.send("Hello, MERN stack!!")
    .status(200)
})


import router from "./routes/user.routes.js"

app.use("/api/users", router)


import path from 'path';
import { fileURLToPath } from 'url';
// Define __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "images" directory
app.use(express.static(path.join(__dirname, 'public')));


export default app
