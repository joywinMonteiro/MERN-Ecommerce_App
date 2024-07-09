import {Product} from "../models/product.models.js";

const productData = async (req, res) => {
    try {
      const { category } = req.query;
      let query = {};
      
      if (category && category !== 'all') {
        query = { category };
      }
      
      const products = await Product.find(query).exec();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching data: ", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

export { productData };
