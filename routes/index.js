const { Router } = require('express')
const { resultProductById, resultsAllProduct, userLogin } = require('../controllers/index')
const router = Router()

router.get('/product', resultsAllProduct)
router.get('/product/:id', resultProductById)
router.post('/auth/login', userLogin)

module.exports = router
