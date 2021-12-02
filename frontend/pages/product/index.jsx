import { useRouter } from 'next/router'
import { createElement, useState, useEffect, useMemo } from 'react'
import axios from 'axios'

import ProductView from './__view'

function Product() {
	const router = useRouter()

	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

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
	return createElement(ProductView, {
		products: newProducts,
		loading,
		handleClickFilter
	})
}

export default Product
