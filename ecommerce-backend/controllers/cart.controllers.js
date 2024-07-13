
import { Cart } from "../models/cart.models.js";


const addCartItems = async (req, res) => {
    const { productId, quantity, price } = req.body;
    console.log(req.body);
    try {
        const user = req.user;
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const total_price = (quantity * price)
        const cartItem = new Cart({ userId: user._id, productId, quantity, price, total_price });

        await cartItem.save();

        res.status(200).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const getCartItems = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = await Cart.find({ userId: user._id }).populate('productId');
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const removeItem = async(req, res) => {
    const { itemId } = req.params
    
    try {
        await Cart.deleteOne({ _id: itemId });
        res.status(204).end(); 
      } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ error: 'Server error' }); 
      }
}


const getCartCount = async (req, res) => {
    try {
        const userId = req.user._id; 
        const count = await Cart.countDocuments({ userId });
        res.json({ count });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "Error fetching cart count" });
    }
}


export { addCartItems, getCartItems, removeItem, getCartCount };