import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './payment.css';
import { submitOrderRequest, authenticateWithPesapal, registerIPNURL } from '../utils/pesapalAuth';

function PaymentForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Trigger auth
    try {
      await authenticateWithPesapal();
    } catch (error) {
      console.error('Error authenticating with Pesapal:', error);
    }

    // Wait for 30 seconds
    setTimeout(async () => {
      // Trigger registerIPNURL
      try {
        await registerIPNURL('POST');
      } catch (error) {
        console.error('Error registering IPN URL:', error);
      }

      // Wait for 30 seconds
      setTimeout(async () => {
        // Trigger submitOrderRequest
        try {
          const formData = new FormData(e.target as HTMLFormElement);
          const firstName = formData.get('firstName') as string;
          const currency = formData.get('currency') as string;
          const amount = parseFloat(formData.get('amount') as string);
          const description = formData.get('description') as string;
          const phone = formData.get('phone') as string;
          const email = formData.get('email') as string;
          const country = formData.get('country') as string;

          const redirectUrl = await submitOrderRequest(
            currency,
            amount,
            description,
            firstName,
            phone,
            email,
            country
          );

          // Redirect to the payment URL
          window.location.href = redirectUrl;
        } catch (error) {
          console.error('Error submitting payment:', error);
          alert('Failed to submit payment. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 3000); // 3 seconds
    }, 3000); // 3 seconds
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Payment Form </h1>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            Currency
          </label>
          <select
            id="currency"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UGX">UGX</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? 'Processing...': 'Submit Payment'}
        </button>
      </form>
    </div>
  );
}

createRoot(document.getElementById('payment-root')!).render(
  <StrictMode>
    <PaymentForm />
  </StrictMode>
);