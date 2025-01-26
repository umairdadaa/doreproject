module.exports = {
    webpack(config) {
        config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 1000000,  // Increase the chunk size limit if needed
        };
        return config;
    },
};
