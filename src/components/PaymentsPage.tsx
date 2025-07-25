import React, { useState } from 'react';
import paymentService, { PaymentIframeRequest } from '../services/paymentService';

interface PaymentsPageProps {
  onPaymentSuccess: () => void;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({ onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    currency: 'UGX',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const paymentRequest: PaymentIframeRequest = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      type: 'MERCHANT',
      reference: paymentService.generatePaymentReference(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      currency: formData.currency,
    };

    try {
      const response = await paymentService.generatePaymentIframe(paymentRequest);
      window.location.href = response.iframe_url;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-black py-2 rounded font-semibold hover:bg-green-400 transition"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentsPage;

