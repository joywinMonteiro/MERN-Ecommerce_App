import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState();

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("/cart");
      const items = res.data;
      let total_price = 0;
      items.map((item) => setTotal((total_price += item.total_price)));
      setCartItems(res.data);
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
    <div className="container mx-auto my-[30px] px-4 py-8">
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="bg-white rounded-lg border-t-2 shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={item.productId.image}
                alt={item.name}
                className="w-full h-64 object-contain mt-4 "
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2">
                  {item.productId.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  Category: {item.productId.category}
                </p>
                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                <div className="flex flex-col mb-auto">
                  <p className="text-gray-500 line-through">
                    ${item.productId.old_price}
                  </p>
                  <p className="text-green-600 font-semibold">
                    <span className="text-gray-500 mr-4">New Price: </span>$
                    {item.productId.new_price}
                  </p>
                </div>
                <p className="text-green-600 font-semibold">
                  <span className="text-gray-500 mr-4">Total price: </span>$
                  {item.total_price}
                </p>
                <div className="flex flex-col mt-4 gap-2">
                  <button
                    className="px-2 py-[4px] rounded-md font-semibold bg-red-600 hover:scale-105 text-white"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                  <Link to = "/payment" className="px-2 py-[4px] text-center rounded-md font-semibold bg-green-700 hover:scale-105 text-white">
                  <button 
                  >
                    Buy Now
                  </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-4 w-full border h-32 mt-16 p-2 text-lg font-bold rounded-md text-gray-600">
        <p>Total Price : ${total}</p>
        <button className="px-2 py-[4px] w-32 rounded-md font-semibold bg-green-700 hover:scale-105 text-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
