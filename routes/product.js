const express = require("express")
const router = express.Router()

const productController = require("../controllers/Product")
const authentication = require('../middlewares/auth')

router.delete("/:id", authentication.auth, productController.delete)
router.put("/:id", productController.update)
router.post("/", productController.create)
router.get("/", authentication.auth , productController.getAll)
router.get("/:id", authentication.auth , productController.getById)


module.exports = router