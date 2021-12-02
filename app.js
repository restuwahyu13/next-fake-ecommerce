require('dotenv/config')
const http = require('http')
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const zlib = require('zlib')
const path = require('path')

const app = express()
const server = http.createServer(app)
const nextApp = next({ dev: process.env.NODE_ENV !== 'production', dir: path.join(__dirname, 'frontend') })
const handler = nextApp.getRequestHandler()

const route = require('./routes')

nextApp
	.prepare()
	.then(() => {
		app.use(
			'/public',
			express.static(path.join(__dirname, 'frontend/public'), {
				maxAge: '30d',
				immutable: true
			})
		)
		app.use(bodyParser.urlencoded({ extended: true }))
		app.use(bodyParser.json())
		app.use(cors())
		app.use(helmet({ contentSecurityPolicy: false }))
		app.use(
			compression({
				strategy: zlib.constants.Z_RLE,
				level: zlib.constants.Z_BEST_COMPRESSION,
				memLevel: zlib.constants.Z_BEST_COMPRESSION
			})
		)
		app.use('/api/v1', route)
		app.get('**', (req, res) => handler(req, res))
		server.listen(process.env.PORT, () => console.info(`Server running on port ${server.address().port}`))
	})
	.catch((e) => console.error(`Next application error: ${e.message}`))
