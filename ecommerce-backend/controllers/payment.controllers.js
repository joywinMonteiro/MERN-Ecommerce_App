import braintree from "braintree"
import dotenv from "dotenv"
import { Order } from "../models/orders.models.js";
dotenv.config()

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
  });


  const getClientToken = async (req, res) => {
    try {
      const response = await gateway.clientToken.generate({});
      res.send(response.clientToken);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  const payment = async (req, res) => {
    const { paymentMethodNonce, amount, products } = req.body;
  
    try {
      const saleRequest = {
        amount,
        paymentMethodNonce,
        options: {
          submitForSettlement: true,
        },
      };
  
      const result = await gateway.transaction.sale(saleRequest);
  
      if (result.success) {
        const newOrder = new Order({
          user: req.user._id, // Assuming you have user ID in req.user
          products,
          amount,
          transactionId: result.transaction.id,
        });
  
        const savedOrder = await newOrder.save(); // Save order asynchronously
  
        res.json({ success: true, order: savedOrder });
      } else {
        res.status(400).json({ success: false, error: result.message });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).send(error);
    }
  };
  

  export { getClientToken, payment }