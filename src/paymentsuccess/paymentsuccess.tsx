import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './paymentsuccess.css';

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Thank You for Paying!</h1>
        <p className="text-gray-700">Your payment has been successfully processed.</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('paymentsuccess-root')!).render(
  <StrictMode>
    <PaymentSuccess />
  </StrictMode>
);