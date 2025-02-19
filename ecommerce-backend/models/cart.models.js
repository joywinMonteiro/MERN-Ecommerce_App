import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    price : {
        type: Number,
        required: true
    }, total_price: {
        type:Number,
        required: true
    }

}, { timestamps: true });

export const Cart = mongoose.model('Cart', cartSchema);


