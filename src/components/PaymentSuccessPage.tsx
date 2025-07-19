import React from 'react';

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl mb-8">Thank you for your purchase. Your transaction was successful.</p>
      <button
        className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-400 transition"
        onClick={() => window.location.href = '/'}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccessPage;

