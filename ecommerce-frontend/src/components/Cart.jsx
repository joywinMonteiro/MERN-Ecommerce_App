import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("/cart");
      setCartItems(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`/cart/${itemId}`);
      fetchCartItems();
      console.log("Item removed successfully");
    } catch (error) {
      console.log("Error removing item: ", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.productId.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {item.productId.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  Category: {item.productId.category}
                </p>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 line-through">
                    ${item.productId.old_price}
                  </p>
                  <p className="text-green-600 font-semibold">
                    ${item.productId.new_price}
                  </p>
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <button
                    className="px-2 py-[4px] rounded-md font-semibold bg-pink-600 hover:scale-105  text-white"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                  <button className="px-2 py-[4px] rounded-md font-semibold bg-green-700 hover:scale-105  text-white">
                    Buy Now
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
