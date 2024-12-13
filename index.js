const express = require("express")
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');


require('dotenv').config()

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());

const productsRouter = require('./routes/product')
const userRouter = require('./routes/user')
const authRouter = require('./routes/authentication')

app.use("/api/products", productsRouter)
app.use("/api/user", userRouter)
app.use("/api", authRouter)


const PORT =8000

app.listen(PORT, () => {
    console.log("Server is running....")
})