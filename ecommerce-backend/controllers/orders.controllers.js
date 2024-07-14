// import { Product } from "../models/product.models";
import { User } from "../models/user.models.js";
import { Order } from "../models/orders.models.js";

const orderItems = async(req, res) => {
    const { paymentMethodNonce, amount, products } = req.body;
    const userId = req.user._id;
  
    try {
      // Process the payment using Braintree (or your chosen payment gateway)
      const transactionResult = await gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true
        }
      });
  
      if (transactionResult.success) {
        // Find the order for the user
        let order = await Order.findOne({ user: userId, paymentStatus: 'Pending' });
  
        if (order) {
          // If order exists, add new products to the order
          products.forEach(product => {
            const existingProductIndex = order.products.findIndex(p => p.productId.toString() === product.productId);
            if (existingProductIndex >= 0) {
              order.products[existingProductIndex].quantity += product.quantity;
            } else {
              order.products.push(product);
            }
          });
          order.totalAmount += amount;
        } else {
          // If order does not exist, create a new order
          order = new Order({
            user: userId,
            products,
            totalAmount: amount,
            paymentStatus: 'Completed'
          });
        }
  
        await order.save();
  
        res.status(200).send({ success: true, transactionId: transactionResult.transaction.id });
      } else {
        res.status(400).send({ success: false, error: transactionResult.message });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).send({ success: false, error: 'Server error' });
    }
  };
  


export default orderItems;