module.exports = {
	env: {
		API_HOST: process.env.API_HOST
	},
	swcMinify: process.env.NODE_ENV !== 'development' ? true : false,
	reactStrictMode: process.env.NODE_ENV !== 'development' ? true : false,
	compress: process.env.NODE_ENV !== 'development' ? true : false,
	poweredByHeader: process.env.NODE_ENV !== 'development' ? true : false
}
