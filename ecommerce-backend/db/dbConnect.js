import mongoose from "mongoose";


const connectDB = async() => {

    const DB_NAME = "Ecommerce"
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log(`MongoDB connected successfully. DB_HOST : ${ConnectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection error: ", error)
    }
}


export default connectDB