import { useRouter } from 'next/router'
import { createElement, useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import * as localStorage from 'local-storage'
import { toast } from 'react-toastify'

import HomeView from './__view'

function Home() {
	const router = useRouter()

	const [products, setProducts] = useState([])
	const [orderItems, setOrderItems] = useState([])
	const [accessToken, setAccessToken] = useState('')
	const [loading, setLoading] = useState(false)
	const [disableBuyButton, setDisabledBuyButton] = useState({ id: 0, disabled: false })
	const quantity = useRef(null)
	const [count, setCount] = useState(0)

	useEffect(() => {
		fetchData('api/v1/product')
		const accessToken = localStorage.get('accessToken')
		if (accessToken != null) {
			setAccessToken(accessToken)
		}
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

	const newAccessToken = useMemo(() => {
		return accessToken
	}, [accessToken])

	const countProduct = useMemo(() => {
		return localStorage.get('products') != null ? JSON.parse(localStorage.get('products')).length : orderItems.length
	}, [JSON.parse(localStorage.get('products'))])

	const handleClickFilter = (value = '') => {
		if (value != '') {
			router.push(`/product/list/?category=${value}`)
			fetchData(`/api/v1/product?category=${value}`)
		}
	}

	const handleClickBuy = (id) => {
		const accessToken = localStorage.get('accessToken')

		if (accessToken != null) {
			toast.success('Add to cart success', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined
			})
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
			setOrderItems(products)
		} else {
			router.push('/auth/login')
		}
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
			}
		}
	}

	const handleCart = () => router.push('/cart')
	const handleLogin = () => router.push('/auth/login')

	return createElement(HomeView, {
		products: newProducts,
		accessToken: newAccessToken,
		loading,
		count,
		setCount,
		quantity,
		disableBuyButton,
		countProduct,
		handleClickFilter,
		handleClickBuy,
		handleIncrement,
		handleDecrement,
		handleCart,
		handleLogin
	})
}

export default Home
