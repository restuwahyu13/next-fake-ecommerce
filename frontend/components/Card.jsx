import toRupiah from '@develoka/angka-rupiah-js'

function Card(props) {
	return (
		<div>
			<div className='flex flex-row items-center justify-center transform translate-y-20'>
				<div className='grid w-10/12 h-auto grid-cols-4 gap-1'>
					{props.loading == false &&
						props.products.length > 0 &&
						props.products.map((val, index) => (
							<>
								<div className='w-10/12 p-3 my-3 bg-white rounded-md shadow-md' key={index}>
									<div className='flex flex-col p-3'>
										<a href={`/product/${val.id}`} className='inline-block no-underline '>
											<img src={val.image} className='w-full rounded-md h-52' />
										</a>
										<span className='mt-3 text-sm font-semibold text-gray-700 '>{val.title}</span>
										<span className='mt-2 text-sm font-normal text-gray-600'>{toRupiah(val.price)}</span>
										<div className='flex flex-row items-center justify-between mt-2'>
											{props.disableBuyButton.disabled == false && (
												<button
													className='w-20 p-2 mt-3 text-sm font-normal text-white bg-blue-600 rounded-md'
													onClick={() => props.handleClickBuy(val.id)}>
													Buy
												</button>
											)}
											{props.disableBuyButton.disabled == true && val.id != props.disableBuyButton.id && (
												<button
													className='w-20 p-2 mt-3 text-sm font-normal text-white bg-blue-600 rounded-md'
													onClick={() => {
														props.handleClickBuy(val.id)
														props.setCount(0)
													}}>
													Buy
												</button>
											)}
											{props.disableBuyButton.disabled == true && val.id == props.disableBuyButton.id && (
												<div className='flex flex-row items-center justify-center'>
													<button
														className='mt-3 text-sm font-normal text-white bg-blue-600 rounded-sm w-7 h-7'
														onClick={() => props.handleDecrement(val.id)}
														disabled={props.count < 1 ? true : false}>
														-
													</button>
													<input
														type='number'
														ref={props.quantity}
														className='w-6 mx-1 mt-3 text-center border border-gray-300 outline-none'
														value={props.count}
													/>
													<button
														className='mt-3 text-sm font-normal text-white bg-blue-600 rounded-sm w-7 h-7'
														onClick={() => props.handleIncrement(val.id)}>
														+
													</button>
												</div>
											)}
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
