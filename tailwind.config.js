module.exports = {
	purge: ['./frontend/pages/**/*.jsx', './frontend/components/**/*.jsx'],
	darkMode: false,
	theme: {
		extend: {}
	},
	variants: {
		transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
		extend: {
			backgroundColor: ['active']
		}
	},
	plugins: []
}
