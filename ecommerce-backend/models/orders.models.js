import mongoose, {Schema} from "mongoose";


const orderSchema = new Schema({
  user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  products: [{
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    }
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  purchasedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Order = mongoose.model('Order', orderSchema);
