import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    new_price:{
        type: Number,
        required: true
    },
    old_price:{
        type: Number,
        required: true
    }
})

export const Product = mongoose.model("Product", productSchema)
