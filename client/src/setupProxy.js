const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://web-blog-back.run.goorm.io',
            changeOrigin: true,
			pathRewrite: {
                '^/api': ''
            }
        })
    );
};