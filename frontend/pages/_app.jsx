import '../styles/global.css'
import HeaderLayout from '../layouts/Header'

function NextApp({ Component, pageProps }) {
	return (
		<HeaderLayout {...pageProps}>
			<Component {...pageProps} />
		</HeaderLayout>
	)
}

export default NextApp
