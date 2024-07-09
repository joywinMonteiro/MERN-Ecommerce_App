/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'

import Product from './Product';
import axios from 'axios';
import PropTypes from 'prop-types';



// eslint-disable-next-line react/prop-types
const ProductDisplay = ({ category }) => {

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
    {products.map(product => (
      <div key={product._id}>
        {console.log(product.image)}
        <img className="h-[160px] w-[150px]" src={product.image} alt="" />
      </div>
    ))}
  </div>   
  )
}


Product.propTypes = {
  category: PropTypes.oneOf([ 'all', 'men', 'women', 'kid']).isRequired,
};

export default ProductDisplay