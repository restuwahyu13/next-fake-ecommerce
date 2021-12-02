import React from 'react'

function Filter(props) {
	const { handler } = props
	return (
		<div>
			<div className='flex flex-row items-center justify-center transform translate-y-12'>
				<div className='grid w-10/12 grid-cols-4 gap-3'>
					<button onClick={() => handler('electronics')} className='p-2 text-white bg-blue-600 rounded-md shadow-md'>
						Electronics
					</button>
					<button onClick={() => handler('jewelery')} className='p-2 text-white bg-blue-600 rounded-md shadow-md'>
						Jewelery
					</button>
					<button onClick={() => handler('mens clothing')} className='p-2 text-white bg-blue-600 rounded-md shadow-md'>
						Men's clothing
					</button>
					<button onClick={() => handler('womens clothing')} className='p-2 text-white bg-blue-600 rounded-md shadow-md'>
						Women's clothing
					</button>
				</div>
			</div>
		</div>
	)
}

export default Filter
