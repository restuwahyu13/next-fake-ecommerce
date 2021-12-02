import Link from 'next/link'
import { useRouter } from 'next/router'

function Header(props) {
	const router = useRouter()
	const handleCart = () => router.push('/cart')
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
							<span className='relative right-0 text-xs font-semibold text-gray-600 rounded-full -z-10 -top-3'>5</span>
						</button>
						<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'>Masuk</button>
						<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'>Daftar</button>
					</div>
				</div>
			</div>
			{props.children}
		</>
	)
}

export default Header
