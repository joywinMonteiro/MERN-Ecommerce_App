// import { Product } from "../models/product.models";
import { User } from "../models/user.models.js";

const orderItems = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.productId');
        const newOrder = new Order({
            user: req.user.id,
            items: user.cart,
            total: user.cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0)
        });

        await newOrder.save();
        user.cart = [];
        await user.save();

        res.status(201).json({ message: 'Order placed', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export default orderItems;