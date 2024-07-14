import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    amount: { 
      type: Number, 
      required: true 
      
    },
    transactionId: { 
      type: String, 
      required: true 
      
    },
    status: { 
      type: String, 
      default: "Completed" 
      
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
