module.exports = {
	env: {
		API_HOST: process.env.API_HOST
	},
	compress: process.env.NODE_ENV !== 'development' ? true : false,
	poweredByHeader: process.env.NODE_ENV !== 'development' ? true : false
}
