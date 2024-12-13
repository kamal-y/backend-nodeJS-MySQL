const express = require("express")
const router = express.Router()

const authentication = require('../middlewares/auth')

router.get("/validate-token", authentication.authCurrentUser)

module.exports = router