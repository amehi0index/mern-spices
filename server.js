const express = require('express')
const connectDB = require('./config/db')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const path = require ('path')
require('dotenv').config()

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,     
    optionSuccessStatus:200
}

const app = express()

app.set('trust proxy', 1)

connectDB()

app.use(express.json())
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.use('/api/herbs', require('./routes/herbs'))
app.use('/api/recipes', require('./routes/recipes'))
app.use(cors(corsOptions))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))