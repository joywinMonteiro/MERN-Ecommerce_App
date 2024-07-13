// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { ClipLoader } from 'react-spinners';

const Payment = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await axios.get('/client_token');
        setClientToken(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching client token:', error);
        setLoading(false); 
      }
    };

    fetchClientToken();
  }, []);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const response = await axios.post('/checkout', {
        paymentMethodNonce: nonce,
        amount,
      });

      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert(`Payment failed: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
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
              options={{ authorization: clientToken }}
              onInstance={(instance) => setInstance(instance)}
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="mt-4 p-2 border rounded w-full"
            />
            <button
              onClick={handlePayment}
              disabled={!instance}
              className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-full disabled:opacity-50"
            >
              Pay Now
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Payment;
