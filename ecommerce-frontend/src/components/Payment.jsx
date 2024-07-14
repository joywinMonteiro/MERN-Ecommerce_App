// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { ClipLoader } from 'react-spinners';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { productId, quantity, price } = useParams();
  const [amount, setAmount] = useState(0);
  const [payButtonDisabled, setPayButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        if (!user) {
          return navigate("/login");
        }
        const response = await axios.get('/client_token');
        setClientToken(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client token:', error);
        setLoading(false);
      }
    };

    fetchClientToken();
  }, [user, navigate]);

  useEffect(() => {
    const qty = parseInt(quantity, 10);
    const prc = parseFloat(price);

    // Check for NaN values and log if necessary
    if (isNaN(qty) || isNaN(prc)) {
      console.error('Invalid quantity or price:', quantity, price);
      setAmount(0); // Set a default value or handle error state
    } else {
      setAmount(qty * prc);
    }
  }, [quantity, price]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post('/checkout', {
        paymentMethodNonce: nonce,
        amount: quantity * price,
        products: [
          {
            productId,
            quantity,
            price,
          },
        ],
      });
  
      if (response.data.success) {
        alert('Payment successful!');
        setInstance(null); // Reset Drop-In instance
        setPayButtonDisabled(true);
        navigate('/'); // Disable pay button after successful payment
      } else {
        alert(`Payment failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        clientToken && (
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Payment</h2>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: 'vault',
                },
              }}
              onInstance={(instance) => {
                setInstance(instance);
                setPayButtonDisabled(false); // Enable pay button when Drop-In instance is ready
              }}
            />
            <input
              type="number"
              value={amount}
              readOnly
              className="mt-4 p-2 border rounded w-full"
            />
            <button
              onClick={handlePayment}
              disabled={!instance || payButtonDisabled}
              className={`mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-full ${payButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {payButtonDisabled ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Payment;
