import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import * as localStorage from 'local-storage'

function Header(props) {
	const [accessToken, setAccessToken] = useState('')

	useEffect(() => {
		const accessToken = localStorage.get('accessToken')
		if (accessToken != null) {
			setAccessToken(accessToken)
		}
	}, [])

	const newAccessToken = useMemo(() => {
		return accessToken
	}, [accessToken])

	const handleLogin = () => router.push('/auth/login')

	return (
		<>
			<div className='w-full py-2 mt-3 bg-white h-14'>
				<div className='flex items-center justify-between '>
					<Link href='/'>
						<h1 className='my-1 ml-20 text-xl font-semibold text-blue-600 cursor-pointer'>Awaszon</h1>
					</Link>
					{newAccessToken == '' && (
						<>
							<div className='my-1 mr-20'>
								<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md' onClick={handleLogin}>
									Masuk
								</button>
								<button className='p-2 mx-2 text-xs font-semibold text-white bg-blue-600 rounded-md'>Daftar</button>
							</div>
						</>
					)}
				</div>
			</div>
			{props.children}
		</>
	)
}

export default Header
