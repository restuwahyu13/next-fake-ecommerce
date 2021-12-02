import React from 'react'
import toRupiah from '@develoka/angka-rupiah-js'

function ProductDetailView(props) {
	return (
		<>
			<div className='flex flex-row items-center justify-center transform translate-y-8'>
				<div className='flex flex-col w-6/12 p-3 '>
					<div className='flex flex-row items-center justify-center '>
						<img src='https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg' className='w-4/12 h-90' />
					</div>
					<ul className='p-2 mt-3'>
						<li className='w-full p-1 text-gray-500 rounded-sm'>
							<strong className='text-md'>Name:</strong>
							<p className='mt-1 text-sm'>{props.product.title}</p>
						</li>
						<li className='w-full p-1 my-3 text-gray-500 rounded-sm'>
							<strong className='text-md'>Category:</strong>
							<p className='mt-1 text-sm'>{props.product.category}</p>
						</li>
						<li className='w-full p-1 my-3 text-gray-500 rounded-sm'>
							<strong className='text-md'>Price:</strong>
							<p className='mt-1 text-sm'>{toRupiah(String(props.product.price))}</p>
						</li>
						<li className='w-full p-1 my-3 text-gray-500 rounded-sm'>
							<strong className='text-md'> Description:</strong>
							<p className='mt-1 text-sm'>{props.product.description}</p>
						</li>
					</ul>
					<div className='flex flex-row items-center justify-between'>
						<button
							className='h-10 mt-3 text-xl font-normal text-white bg-blue-600 rounded-sm w-52'
							onClick={() => props.handleDecrement(props.product.id)}
							disabled={props.count < 1 ? true : false}>
							-
						</button>
						<input
							type='number'
							ref={props.quantity}
							className='h-10 mt-3 text-center border border-gray-300 outline-none w-52'
							defaultValue={props.count}
						/>
						<button
							className='h-10 mt-3 text-xl font-normal text-white bg-blue-600 rounded-sm w-52'
							onClick={() => props.handleIncrement(props.product.id)}>
							+
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductDetailView
