const express = require('express')
const router = express.Router()

const testController = require('../controllers/test')

// Routes beginning with "HOSTNAME/api/test/..."

router.route('/').get(testController.root)

module.exports = router