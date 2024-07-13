import braintree from "braintree"
import dotenv from "dotenv"

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
    const { paymentMethodNonce, amount } = req.body;
  
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
        res.send({ success: true, transaction: result.transaction });
      } else {
        res.send({ success: false, error: result.message });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };

  export { getClientToken, payment }