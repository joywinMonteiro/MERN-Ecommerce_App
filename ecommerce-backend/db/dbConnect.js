import mongoose from "mongoose";
// import { Product } from "../models/product.models.js";
// import all_product from "../assets/all_product.js";


const connectDB = async() => {

    const DB_NAME = "Ecommerce"
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        })
        
        console.log(`MongoDB connected successfully. DB_HOST : ${ConnectionInstance.connection.host}`)
        
        // await Product.insertMany(all_product)
        // .then(() =>{
        //     console.log("Data added to the database...");
        // })
        // .catch((err) =>{
        //     console.error("Error: ", err);
        // })

    } catch (error) {
        console.error("MongoDB connection error: ", error)
    }
}


export default connectDB