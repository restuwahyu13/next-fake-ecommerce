import { createElement, useEffect, useState, useMemo } from 'react'
import * as localStorageServer from 'local-storage'

import CartSummaryView from './__view'

function CartSummary() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		if (localStorageServer.get('products') != null) {
			const productsData = JSON.parse(localStorage.getItem('products'))
			if (productsData.length) {
				setProducts(JSON.parse(productsData))
			}
		}
	}, [])

	const newProducts = useMemo(() => {
		return products
	}, [products])

	return createElement(CartSummaryView, {
		products: newProducts
	})
}

export default CartSummary
