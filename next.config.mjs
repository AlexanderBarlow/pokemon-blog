const nextConfig = {
	webpack(config, { dev }) {
		if (dev) {
			config.cache = false; // Disable Webpack's cache
		}
		return config;
	},
};

export default nextConfig; // ✅ Use ES Module export
