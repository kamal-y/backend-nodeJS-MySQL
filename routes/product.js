const express = require("express")
const router = express.Router()

const productController = require("../controllers/Product")
const authentication = require('../middlewares/auth')

router.delete("/:id", authentication.auth, productController.delete)
router.put("/:id",authentication.auth ,  productController.update)
router.post("/", authentication.auth , productController.create)
router.get("/", authentication.auth , productController.getAll)

module.exports = router