import { useRouter } from 'next/router'
import { createElement, useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import * as localStorage from 'local-storage'

import ProductDetailView from './__view'

function ProductDetail() {
	const router = useRouter()

	const [accessToken, setAccessToken] = useState('')
	const [product, setProduct] = useState({})
	const quantity = useRef(null)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (router.query.id !== undefined) {
			fetchData(router.query.id)
		}

		const accessToken = localStorage.get('accessToken')
		if (accessToken != null) {
			setAccessToken(accessToken)
		}
	}, [router.query.id])

	const fetchData = async (id) => {
		try {
			const res = await axios.get(`/api/v1/product/${id}`)
			setProduct(res.data.product)
		} catch (e) {
			console.error(e)
		}
	}

	const newAccessToken = useMemo(() => {
		return accessToken
	}, [accessToken])

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
		const parse = JSON.parse(localStorage.get('products'))

		if (parse != null) {
			const prices = parse.map((val) => val.data.price)
			const subTotal = prices.flat(Infinity).reduce((current, val) => current + val, 0)
			const countItems = prices.flat(Infinity).length

			localStorage.set('subTotal', subTotal)
			localStorage.set('countItems', countItems)
		}
	}

	return createElement(ProductDetailView, {
		product: newProduct,
		accessToken: newAccessToken,
		count,
		quantity,
		handleIncrement,
		handleDecrement
	})
}

export default ProductDetail
