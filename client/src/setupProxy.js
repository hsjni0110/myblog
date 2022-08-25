const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://myblog-back.run.goorm.io',
            changeOrigin: true,
			pathRewrite: {
                '^/api': ''
            }
        })
    );
};