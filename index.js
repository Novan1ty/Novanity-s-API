const express = require('express')
const app = express()
const Port = 3000

const path = require('path')
const favicon = require('serve-favicon')

const Image_Route = require('./Routes/Image.js')
const Text_Route = require('./Routes/Text.js')

app.use(favicon(path.join(__dirname, 'Assets', 'Mitch.ico')))

app.get('/', (req, res) => {
    const Endpoints = {
        Endpoints: [
            '/image',
            '/text'
        ]
    }
    res.json(Endpoints)
})

app.use('/image', Image_Route)
app.use('/text', Text_Route)

app.listen(Port, () => {
    console.log('Listening at http://localhost:' + Port)
})