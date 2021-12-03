import { useRouter } from 'next/router'
import { createElement, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as localStorageServer from 'local-storage'

import LoginView from './__view'

function Login() {
	const router = useRouter()
	const [value, setValue] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)

	const handleInput = (e) => setValue({ ...value, [e.target.name]: e.target.value })

	const handleClick = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('/api/v1/auth/login', { email: value.email, password: value.password })
			setLoading(true)
			toast.success('Login success', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined
			})
			localStorageServer.set('accessToken', res.data.accessToken)
			setTimeout(() => {
				setLoading(false)
				router.push('/')
			}, 2000)
		} catch (e) {
			setLoading(true)
			toast.error(e.response.data.message, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined
			})
			setTimeout(() => setLoading(false), 2000)
		}
	}

	return createElement(LoginView, {
		loading,
		handleInput,
		handleClick
	})
}

export default Login
