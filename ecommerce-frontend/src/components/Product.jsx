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
        const response = await axios.get(`/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };
    fetchProducts();
  }, [category]);


  return (
    
    <div className="container mx-auto mt-10">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {products.map(product => (
      <div key={product._id} className="relative rounded-lg overflow-hidden shadow-lg">
        <img src={product.image} alt={product.name} className="w-full h-auto" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none"> {/* pointer-events-none prevents overlay from blocking hover */}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-300">{product.description}</p>
          <div className="mt-2 flex flex-col">
            <span className="text-xl font-bold line-through text-red-400">${product.old_price}</span>
            <span className="text-xl font-bold text-green-400">${product.new_price}</span>
          </div>
        </div>
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
