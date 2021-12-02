import toRupiah from '@develoka/angka-rupiah-js'

function Card(props) {
	return (
		<div>
			<div className='flex flex-row items-center justify-center transform translate-y-20'>
				<div className='grid w-10/12 h-auto grid-cols-4 gap-1'>
					{props.loading == false &&
						props.products.length > 0 &&
						props.products.map((val) => (
							<>
								<div className='w-10/12 p-3 my-3 bg-white rounded-md shadow-md'>
									<div className='flex flex-col p-3'>
										<img src={val.image} className='w-full rounded-md h-52' />
										<span className='mt-3 text-sm font-semibold text-gray-700 '>{val.title}</span>
										<span className='mt-2 text-sm font-normal text-gray-600'>{toRupiah(val.price)}</span>
										<div className='flex flex-row items-center justify-between mt-2'>
											<button className='w-20 p-2 mt-3 text-sm font-normal text-white bg-blue-600 rounded-md'>Buy</button>
											<a
												href='/product'
												className='inline-block w-20 p-2 mt-3 text-xs font-normal text-gray-500 border border-blue-600 rounded-md outline-none'>
												Read More
											</a>
										</div>
									</div>
								</div>
							</>
						))}
					{props.loading == true && <h1 className='font-semibold text-gray-500 text-md'>Loading...</h1>}
				</div>
			</div>
		</div>
	)
}

export default Card
