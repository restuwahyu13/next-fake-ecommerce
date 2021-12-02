const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { assert } = require('is-any-type')

const { products } = require('../databases/products')
const { users } = require('../databases/users')

exports.resultsAllProduct = function (req, res) {
	let results

	if (assert.isString(req.query.category)) {
		results = products.filter((val) => val.category.includes(req.query.category) != false).map((val) => val)
	} else {
		results = products.map((val) => val)
	}

	return res.status(200).json({ code: 200, products: results })
}

exports.resultProductById = function (req, res) {
	let result = products.filter((val) => val.id == req.params.id).map((val) => val)
	return res.status(200).json({ code: 200, product: result })
}

exports.userLogin = function (req, res) {
	let getUser = users.find((val) => val.email == req.body.email)

	if (!getUser) {
		return res.status(400).json({ code: 400, message: 'Email is not registered' })
	}

	const comparePassword = bcrypt.compareSync(req.body.password, getUser.password)

	if (!comparePassword) {
		return res.status(400).json({ code: 400, message: 'Email or Password is wrong' })
	}

	const accessToken = jwt.sign({ id: getUser.id, email: getUser.email }, process.env.JWT_TOKEN, {
		expiresIn: '1d',
		audience: 'prosehat'
	})

	return res.status(200).json({ code: 200, accessToken: accessToken })
}
