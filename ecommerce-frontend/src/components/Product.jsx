// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Product = ({ category }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products?category=${category}`);
        // Initialize quantity state with zeros corresponding to each product
        setQuantity(new Array(response.data.length).fill(1));
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };
    fetchProducts();
  }, [category]);

  const incrementQuantity = (index) => {
    const newQuantities = [...quantity];
    newQuantities[index] += 1;
    setQuantity(newQuantities);
  };

  const decrementQuantity = (index) => {
    const newQuantities = [...quantity];
    if (newQuantities[index] > 1) {
      newQuantities[index] -= 1;
      setQuantity(newQuantities);
    }
  };

  const addToCart = async (productId, quantityToAdd, price) => {
    try {
      await axios.post(
        "/cart",
        { productId, quantity: quantityToAdd, price },
        { withCredentials: true }
      );
      alert("Added to cart");
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const buyNow = async (productId, price) => {
    try {
      await addToCart(productId, 1, price);
      await axios.post(
        "/order",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("Order placed");
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-300">{product.description}</p>
              <div className="mt-2 flex flex-col">
                <span className="text-xl font-bold line-through text-red-400">
                  ${product.old_price}
                </span>
                <span className="text-xl font-bold text-green-400">
                  ${product.new_price}
                </span>
              </div>
              <div className="flex gap-4 mt-4 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(index)}
                    className="px-2 py-[2px] rounded-md font-semibold bg-gray-700 text-xl font-bold text-white hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="px-2 py-[2px] bg-white text-black rounded-md font-semibold">
                    {quantity[index]} {/* Display the quantity for this product */}
                  </span>
                  <button
                    onClick={() => incrementQuantity(index)}
                    className="px-2 py-[2px] rounded-md font-semibold bg-gray-700 text-xl font-bold text-white hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
                <button
                  className="px-2 py-[4px] rounded-md font-semibold bg-pink-600 hover:scale-105 "
                  onClick={() =>
                    addToCart(product._id, quantity[index], product.new_price)
                  }
                >
                  Add to Cart
                </button>
                <button
                  className="px-2 py-[4px] rounded-md font-semibold bg-green-700 hover:scale-105 "
                  onClick={() => buyNow(product._id, product.new_price)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Product.propTypes = {
  category: PropTypes.oneOf(["all", "men", "women", "kid"]).isRequired,
};

export default Product;
