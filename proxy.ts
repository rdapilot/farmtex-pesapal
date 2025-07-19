import { createProxyMiddleware } from 'http-proxy-middleware';

const target = 'https://cybqa.pesapal.com';

const pesapalProxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { '^/pesapal': '' },
});

export default pesapalProxy;


