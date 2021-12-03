import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css'

import { withRouter } from 'next/router'
import HeaderLayout from '../layouts/Header'

function NextApp({ Component, pageProps, router }) {
	return (
		<>
			{['/', '/product/list'].includes(router.pathname.split('?')[0]) && <Component {...pageProps} />}
			{!['/', '/product/list'].includes(router.pathname.split('?')[0]) && (
				<HeaderLayout>
					<Component {...pageProps} />
				</HeaderLayout>
			)}
		</>
	)
}

export default withRouter(NextApp)
