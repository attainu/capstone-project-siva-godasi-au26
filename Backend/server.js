const express = require('express');
const app = express();

const {errorHandler,notFound} = require('./middlewares/error/errorHandler')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors');
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const dbConnect = require('./config/db/dbConnect')
dbConnect()

const userrouter = require('./routes/user');

app.use('/api/user',userrouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(('blog application server started'))
})