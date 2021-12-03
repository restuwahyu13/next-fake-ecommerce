import { useState, useEffect, useMemo } from 'react'
import * as localStorage from 'local-storage'
import redirect from 'nextjs-redirect'

function Authentication(props) {
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

	const Redirect = redirect('/', { statusCode: 400 })

	return newAccessToken != '' ? <> {props.children} </> : <>{<Redirect />}</>
}

export default Authentication
