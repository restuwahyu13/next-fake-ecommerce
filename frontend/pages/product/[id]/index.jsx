import { useRouter } from 'next/router'
import { createElement, useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import * as localStorage from 'local-storage'

import ProductDetailView from './__view'

function ProductDetail() {
	const router = useRouter()

	const [product, setProduct] = useState({})
	const [loading, setLoading] = useState(false)
	const [disableBuyButton, setDisabledBuyButton] = useState({ id: 0, disabled: false })
	const quantity = useRef(null)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (router.query !== undefined) {
			fetchData()
		}
	}, [])

	const fetchData = async () => {
		try {
			const res = await axios.get(`/api/v1/product/${1}`)
			setLoading(true)

			setProduct(res.data.product)
			setTimeout(() => setLoading(false), 1000)
		} catch (e) {
			console.error(e)
		}
	}

	const newProduct = useMemo(() => {
		return product
	}, [product])

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
			const prices = items.map((val) => val.data.price)
			const subTotal = prices.flat(Infinity).reduce((current, val) => current + val, 0)
			const countItems = prices.flat(Infinity).length

			localStorage.set('subTotal', subTotal)
			localStorage.set('countItems', countItems)
		}
	}

	return createElement(ProductDetailView, {
		product: newProduct,
		loading,
		count,
		setCount,
		quantity,
		disableBuyButton,
		handleIncrement,
		handleDecrement
	})
}

export default ProductDetail
