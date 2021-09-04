const express = require('express')
const app = express()
const Port = 3000

const path = require('path')
const favicon = require('serve-favicon')

const Image_Route = require('./Routes/Images')

app.use(favicon(path.join(__dirname, 'Assets', 'Mitch.ico')))

app.get('/', (req, res) => {
    const Endpoints = {
        Endpoints: [
            '/images/wheresmywater/',
            '/images/opinion/'
        ]
    }
    res.json(Endpoints)
})

app.use('/images', Image_Route)

app.listen(Port, () => {
    console.log('Listening at http://localhost:' + Port)
})