
//import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install uuid for generating GUIDs

let jwtToken: string | null = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiZDY1OWZmODItZWViYS00ZWFiLTk1ZDItZTA0MzliNWFhODFhIiwidWlkIjoiVERwaWdCT09ocyt6QWw4Y3dIMkZsODJqSkd5RDh4ZXYiLCJuYmYiOjE3NTIyNjE0MzgsImV4cCI6MTc1MjI2NTAzOCwiaWF0IjoxNzUyMjYxNDM4LCJpc3MiOiJodHRwOi8vY3licWEucGVzYXBhbC5jb20vIiwiYXVkIjoiaHR0cDovL2N5YnFhLnBlc2FwYWwuY29tLyJ9.Nk4qqMnzvSipDTSbemJ4ivRI9fUQukUj8L2zxZ_qMAY'; // Store the JWT token here
let ipnId: string | null = null; // store the IPN ID here
export async function authenticateWithPesapal() {
  const consumerKey = process.env.VITE_CONSUMER_KEY;
  const consumerSecret = process.env.VITE_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('Consumer key or secret is missing in the environment variables.');
  }

  const url = `/pesapal/pesapalv3/api/Auth/RequestToken`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Pesapal authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Pesapal Authentication Response:', data);

    // Store the JWT token
    jwtToken = data.token;
    console.log('JWT Token:', jwtToken);

    return data;
  } catch (error) {
    console.error('Error authenticating with Pesapal:', error);
    throw error;
  }
}

// Function to register the IPN URL
export async function registerIPNURL(notificationType: 'POST' | 'GET') {
  if (!jwtToken) {
    throw new Error('JWT token is not available. Please authenticate first.');
  }

  const url = `/pesapal/pesapalv3/api/URLSetup/RegisterIPNURL`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  };

  const body = JSON.stringify({
    url: `http://localhost:5174`,
    ipn_notification_type :"GET" ,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to register IPN URL: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Register IPN URL Response:', data);

    // Store the IPN ID
    ipnId = data.ipn_id;
    console.log('IPN ID:', ipnId);

    return data;
  } catch (error) {
    console.error('Error registering IPN URL:', error);
    throw error;
  }
}

// Function to get the current IPN ID
export function getIPNId() {
  if (!ipnId) {
    throw new Error('IPN ID is not available. Please register the IPN URL first.');
  }
  return ipnId;
}

// Function to get the current JWT token
export function getJwtToken() {
  if (!jwtToken) {
    throw new Error('JWT token is not available. Please authenticate first.');
  }
  return jwtToken;
}

// Automatically refresh the token every 5 minutes
setInterval(async () => {
  try {
    console.log('Refreshing JWT token...');
    await authenticateWithPesapal();
  } catch (error) {
    console.error('Failed to refresh JWT token:', error);
  }
}, 5 * 60 * 1000); // 5 minutes in milliseconds


export async function submitOrderRequest(
  currency: string,
  amount: number,
  description: string,
  firstName: string,
  phone: string,
  email: string,
  country: string
) {
  if (!jwtToken) {
    throw new Error('JWT token is not available. Please authenticate first.');
  }

  if (!ipnId) {
    throw new Error('IPN ID is not available. Please register the IPN URL first.');
  }

  const url = `/pesapal/pesapalv3/api/Transactions/SubmitOrderRequest`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  };

  const body = JSON.stringify({
    id: uuidv4(), // Generate a unique GUID
    currency,
    amount,
    description,
    callback_url: `http://localhost:5173/paymentsuccess`, // Redirect to the paymentsuccess page
    notification_id: "53c4d2e3-c9ca-4ac3-b8c9-db8dcb5c726f",
    billing_address: {
      first_name: firstName,
      phone,
      email,
      country,
    },
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit order request: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Submit Order Request Response:', data);

    // Extract the redirect URL from the response
    const redirectUrl = data.redirect_url;
    console.log('Redirect URL:', redirectUrl);

    return redirectUrl;
  } catch (error) {
    console.error('Error submitting order request:', error);
    throw error;
  }
}