import { useRouter } from 'next/router'
import { createElement, useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import * as localStorage from 'local-storage'

import ProductView from './__view'

function Product() {
	const router = useRouter()

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [disableBuyButton, setDisabledBuyButton] = useState({ id: 0, disabled: false })
	const quantity = useRef(null)
	const [count, setCount] = useState(0)

	useEffect(() => {
		fetchData('api/v1/product')
	}, [])

	const fetchData = async (url) => {
		try {
			const res = await axios.get(url)
			setLoading(true)

			if (!loading) setProducts(res.data.products)
			setTimeout(() => setLoading(false), 1000)
		} catch (e) {
			console.error(e)
		}
	}

	const newProducts = useMemo(() => {
		return products
	}, [products])

	const handleClickFilter = (value = '') => {
		if (value != '') {
			router.push(`/product/?category=${value}`)
			fetchData(`/api/v1/product/?category=${value}`)
		}
	}

	const handleClickBuy = (id) => {
		setDisabledBuyButton({ id, disabled: true })

		const products = []
		const checkStorage = JSON.parse(localStorage.get('products'))
		const findProduct = newProducts.find((val) => val.id == id)

		if (checkStorage == null) {
			localStorage.set(`products`, JSON.stringify([{ quantity: 1, data: findProduct }]))
		} else {
			const parse = JSON.parse(localStorage.get('products'))
			if (parse != null) {
				const checkProductExist = parse.find((val) => String(val.data.id).match(String(id)))
				if (checkProductExist === undefined) {
					parse.forEach((val) => products.push(val))
					const checkOldProductExist = products.find((val) => String(val.data.id).match(String(id)))

					if (checkOldProductExist === undefined) products.push({ quantity: 1, data: findProduct })
					localStorage.set(`products`, JSON.stringify(products))
				}
			}
		}
		localStorage.set('countItems', 1)
	}

	const handleIncrement = (id) => {
		setCount((count += 1))
		const parse = JSON.parse(localStorage.get('products'))

		if (parse != null) {
			const checkProductExist = parse.find((val) => String(val.data.id).match(String(id)))
			if (checkProductExist !== undefined) {
				const items = parse.map((val) => {
					if (val.data.id == id) {
						val.quantity += 1
					}
					return val
				})
				localStorage.set(`products`, JSON.stringify(items))
				sumPrice()
			}
		}
	}

	const handleDecrement = (id) => {
		setCount((count -= 1))

		const parse = JSON.parse(localStorage.get('products'))

		if (parse != null) {
			const checkProductExist = parse.find((val) => String(val.data.id).match(String(id)))
			if (checkProductExist !== undefined) {
				const items = parse.map((val) => {
					if (val.data.id == id) {
						val.quantity -= 1
					}
					return val
				})
				localStorage.set(`products`, JSON.stringify(items))
				sumPrice()
			}
		}
	}

	const sumPrice = () => {
		const parse = JSON.parse(localStorage.get(products))

		if (parse != null) {
			const prices = parse.map((val) => val.data.price)
			const subTotal = prices.flat(Infinity).reduce((current, val) => current + val, 0)

			localStorage.set('subTotal', subTotal)
		}
	}

	return createElement(ProductView, {
		products: newProducts,
		loading,
		count,
		setCount,
		quantity,
		disableBuyButton,
		handleClickFilter,
		handleClickBuy,
		handleIncrement,
		handleDecrement
	})
}

export default Product
