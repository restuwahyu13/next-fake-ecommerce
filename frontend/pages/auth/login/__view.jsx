import React from 'react'
import { ToastContainer } from 'react-toastify'

function LoginView(props) {
	return (
		<>
			<ToastContainer />
			<div className='flex items-center justify-center w-11/12 mt-10 shadow-md'>
				<div className='flex flex-col px-8 pt-6 pb-8 mb-4 bg-white rounded'>
					<form>
						<div className='mb-4'>
							<label className='block mb-2 text-sm font-bold text-grey-darker' htmlFor='email'>
								Email
							</label>
							<input
								className='w-full px-3 py-2 mb-3 border border-gray-500 rounded-md shadow appearance-none text-grey-darker'
								type='email'
								name='email'
								placeholder='Email'
								onChange={props.handleInput}
							/>
						</div>
						<div className='mb-6'>
							<label className='block mb-2 text-sm font-bold text-grey-darker' htmlFor='password'>
								Password
							</label>
							<input
								className='w-full px-3 py-2 mb-3 border border-gray-500 rounded-md shadow appearance-none text-grey-darker'
								type='password'
								name='password'
								placeholder='******************'
								onChange={props.handleInput}
							/>
						</div>
						<div className='flex items-center justify-between'>
							{props.loading == false && (
								<button
									className='px-4 py-2 font-semibold text-white bg-blue-600 rounded-md'
									type='submit'
									onClick={props.handleClick}>
									Masuk
								</button>
							)}
							{props.loading == true && (
								<button
									className='px-4 py-2 font-semibold text-white bg-blue-400 rounded-md'
									type='submit'
									onClick={props.handleClick}>
									Masuk
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginView
