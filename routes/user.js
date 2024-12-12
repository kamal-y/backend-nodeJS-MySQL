const express = require("express")
const router = express.Router()

const userController = require("../controllers/auth")

router.post('/signup', userController.register);
router.get('/login', userController.login);


module.exports = router