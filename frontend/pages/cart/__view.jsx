import toRupiah from '@develoka/angka-rupiah-js'

function CartSummaryView(props) {
	return (
		<>
			<div className='transform translate-y-20'>
				<div className='flex items-center justify-center'>
					<table className='w-10/12 h-auto text-center rounded-sm'>
						<thead className='font-bold text-white bg-blue-600'>
							<tr>
								<th className='w-1/6 text-md'>No</th>
								<th className='w-1/2 text-md'>Name</th>
								<th className='w-1/6 text-md'>Quantity</th>
								<th className='w-1/2 text-md'>Price</th>
							</tr>
						</thead>
						<tbody>
							{props.products &&
								props.products.length > 0 &&
								props.products.map((val, index) => (
									<tr key={index} className='p-3'>
										<td className='text-sm font-semibold text-black '>{index + 1}</td>
										<td className='text-sm font-semibold text-black'>{val.data.title}</td>
										<td className='text-sm font-semibold text-black'>{val.quantity}</td>
										<td className='text-sm font-semibold text-black'>{toRupiah(String(val.data.price))}</td>
									</tr>
								))}
							<tr>
								<td colSpan={3} style={{ fontWeight: 600, fontSize: 16, textAlign: 'center' }}>
									Subtotal
								</td>
								<td className='text-sm font-semibold text-center text-black'>
									{toRupiah(props.products.map((val) => val.data.price).reduce((c, v) => c + v, 0))}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default CartSummaryView
