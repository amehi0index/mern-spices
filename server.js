const express = require('express')
const connectDB = require('./config/db')
//const cors = require('cors');
const path = require ('path')

//Initialize app
const app = express()

connectDB()

app.use(express.json())

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))
app.use('/api/herbs', require('./routes/herbs'))


//Listen to server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))