import Link from 'next/link'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import * as localStorageServer from 'local-storage'

function Header(props) {
	const router = useRouter()
	const handleCart = () => router.push('/cart')
	const handleLogin = () => router.push('/auth/login')

	const countProduct = useMemo(() => {
		return localStorageServer.get('products') != null ? JSON.parse(localStorageServer.get('products')).length : 0
	}, [JSON.parse(localStorageServer.get('products'))])

	return (
		<>
			<div className='w-full py-2 mt-3 bg-white h-14'>
				<div className='flex items-center justify-between '>
					<Link href='/'>
						<h1 className='my-1 ml-20 text-xl font-semibold text-blue-600 cursor-pointer'>Awaszon</h1>
					</Link>
					<div className='my-1 mr-20'>
						<button className='w-20 h-10 mx-2 text-lg font-bold ' onClick={handleCart}>
							<i className='text-gray-600 fa fa-shopping-cart ' />
							<span className='relative right-0 text-xs font-semibold text-gray-600 rounded-full -z-10 -top-3'>
								{countProduct}
							</span>
						</button>
						<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md' onClick={handleLogin}>
							Masuk
						</button>
						<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'>Daftar</button>
					</div>
				</div>
				{props.children}
			</div>
		</>
	)
}

export default Header
