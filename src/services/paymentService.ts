import axios from 'axios';

const API_BASE_URL =  'http://localhost:3001';

// Types for API requests and responses
export interface PaymentIframeRequest {
  amount: number;
  description: string;
  type: string;
  reference: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  currency?: string;
}

export interface PaymentIframeResponse {
  iframe_url: string;
}

export interface SubmitOrderRequest {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    line_1: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    zip_code?: string;
  };
  account_number?: string;
  subscription_details?: {
    start_date: string;
    end_date: string;
    frequency: 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'YEARLY';
  };
}

export interface SubmitOrderResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error: any | null;
  status: string;
}

export interface PaymentStatusRequest {
  merchantReference: string;
  trackingId?: string;
}

export interface PaymentStatusResponse {
  status: string;
  response_data?: string;
}

class PaymentService {
  private baseURL: string;
  private oauthToken: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Generate OAuth token
   */
  async generateOAuthToken(): Promise<string> {
    try {
      const response = await axios.post(`${this.baseURL}/oauth/token`, {
        grant_type: 'client_credentials',
        client_id: 'your-client-id', // Replace with your client ID
        client_secret: 'your-client-secret', // Replace with your client secret
      });
      this.oauthToken = response.data.access_token;
      if (!this.oauthToken) {
        throw new Error('OAuth token is null');
      }
      return this.oauthToken;
    } catch (error) {
      console.error('Failed to generate OAuth token:', error);
      throw error;
    }
  }

  /**
   * Check if the payment server is healthy
   */
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/health`);
      return response.status === 200;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  }

  /**
   * Generate payment iframe URL using OAuth 1.0a (Legacy PesaPal)
   */
  async generatePaymentIframe(request: PaymentIframeRequest): Promise<PaymentIframeResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/payments/generate-iframe-link`, request);
      return response.data;
    } catch (error) {
      console.error('Generate payment iframe failed:', error);
      throw error;
    }
  }

  /**
   * Submit order request (Modern PesaPal API)
   */
  async submitOrder(request: SubmitOrderRequest): Promise<SubmitOrderResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/payments/submit-order`, request);
      return response.data;
    } catch (error) {
      console.error('Submit order failed:', error);
      throw error;
    }
  }

  /**
   * Query payment status by merchant reference
   */
  async queryPaymentStatusByReference(merchantReference: string): Promise<PaymentStatusResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/payments/query-payment-status-by-reference`, {
        merchantReference
      });
      return response.data;
    } catch (error) {
      console.error('Query payment status failed:', error);
      throw error;
    }
  }

  /**
   * Query payment status by merchant reference and tracking ID
   */
  async queryPaymentStatus(request: PaymentStatusRequest): Promise<PaymentStatusResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/payments/query-payment-status`, request);
      return response.data;
    } catch (error) {
      console.error('Query payment status failed:', error);
      throw error;
    }
  }

  /**
   * Get transaction status by order tracking ID
   */
  async getTransactionStatus(orderTrackingId: string) {
    try {
      const response = await axios.get(`${this.baseURL}/payments/transaction-status/${orderTrackingId}`);
      return response.data;
    } catch (error) {
      console.error('Get transaction status failed:', error);
      throw error;
    }
  }

  /**
   * Generate a unique payment reference
   */
  generatePaymentReference(): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    return `FARMTEX-${timestamp}-${randomId}`;
  }

  /**
   * Generate a unique order ID
   */
  generateOrderId(): string {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    return `ORDER-${timestamp}-${randomId}`;
  }
}

const paymentService = new PaymentService();
export default paymentService;
