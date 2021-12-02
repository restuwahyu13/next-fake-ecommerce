import '../styles/global.css'
import HeaderLayout from '../layouts/Header'

function NextApp({ Component, pageProps }) {
	return (
		<HeaderLayout>
			<Component {...pageProps} />
		</HeaderLayout>
	)
}

export default NextApp
