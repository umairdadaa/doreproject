export default {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 2000000,  // Adjust chunk size limit if necessary
      };
    }
    return config;
  },
};
