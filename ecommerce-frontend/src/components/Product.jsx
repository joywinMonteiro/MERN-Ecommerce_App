// Product.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Product = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error(`Error fetching ${category} products:`, error);
        }
    };
        fetchProducts(); 
}, [category]);


  return (
    
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border p-4">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
            <p className="mt-2 text-lg font-semibold">{product.name}</p>
            <p className="text-gray-500">{product.description}</p>
            <p className="mt-2 text-xl text-gray-500 font-bold line-through">${product.old_price}</p>
            <p className="mt-2 text-xl font-bold">${product.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

Product.propTypes = {
  category: PropTypes.oneOf(['all', 'men', 'women', 'kid']).isRequired,
};

export default Product;
