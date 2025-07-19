import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { config } from 'dotenv';
config();
//import pesapalProxy from './proxy.ts';
//import  ProxyOptions from './proxy';
//import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        payment: resolve(__dirname, 'src/payment/index.html'),
        paymentsuccess: resolve(__dirname, 'src/paymentsuccess/index.html'),
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      '/pesapal': { // You can change this prefix
        target: 'https://cybqa.pesapal.com', // Replace with the actual API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pesapal/, '') //Optional: Adjust path if needed
    },
  },
},
});
