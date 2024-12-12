const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');


require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());

const productsRouter = require('./routes/product')
const userRouter = require('./routes/user')

app.use("/api/products", productsRouter)
app.use("/api/user", userRouter)


const PORT =8000

app.listen(PORT, () => {
    console.log("Server is running....")
})