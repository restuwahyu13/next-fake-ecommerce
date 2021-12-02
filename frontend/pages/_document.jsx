import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class NextDocument extends Document {
	static async getInitialProps(props) {
		const initialProps = await Document.getInitialProps(props)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang='id'>
				<title>Fake Ecommerce</title>
				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Head>
					<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
