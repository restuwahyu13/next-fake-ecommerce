import Link from 'next/link'

import Authentication from '../../../components/Authentication'
import Filter from '../../../components/Filter'
import CardProduct from '../../../components/Card'

function ProductView(props) {
	return (
		<>
			<Authentication>
				<div className='w-full py-2 mt-3 bg-white h-14'>
					<div className='flex items-center justify-between '>
						<Link href='/'>
							<h1 className='my-1 ml-20 text-xl font-semibold text-blue-600 cursor-pointer'>Awaszon</h1>
						</Link>
						{props.accessToken == '' && (
							<>
								<div className='my-1 mr-20'>
									<button className='w-20 h-10 mx-2 text-lg font-bold ' onClick={props.handleCart}>
										<i className='text-gray-600 fa fa-shopping-cart ' />
										<span className='relative right-0 text-xs font-semibold text-gray-600 rounded-full -z-10 -top-3'>
											{props.countProduct}
										</span>
									</button>
									<button
										className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'
										onClick={props.handleLogin}>
										Masuk
									</button>
									<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'>Daftar</button>
								</div>
							</>
						)}
						{props.accessToken != '' && (
							<>
								<div className='my-1 mr-28'>
									<button className='w-20 h-10 text-lg font-bold ' onClick={props.handleCart}>
										<i className='text-gray-600 fa fa-shopping-cart ' />
										<span className='relative right-0 text-xs font-semibold text-gray-600 rounded-full -z-10 -top-3'>
											{props.countProduct}
										</span>
									</button>
									<span className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-full'>John Doe</span>
								</div>
							</>
						)}
					</div>
				</div>
				<Filter handler={props.handleClickFilter} />
				<CardProduct {...props} />
			</Authentication>
		</>
	)
}

export default ProductView
