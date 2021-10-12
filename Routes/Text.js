const express = require('express')
const router = express.Router()

const Text_Query = {
    message: 'You\'re missing the text query.'
}

router.get('/', (req, res) => {
    const Endpoints = {
        Endpoints: '/owofy?text='
    }

    res.send(Endpoints)
})

router.get('/owofy', (req, res) => {
    const Text = req.query.text
    if (!Text) return res.status(400).json(Text_Query)

    OwOfy = Text.replace(/(?:r|l)/g, "w")
    OwOfy = OwOfy.replace(/(?:R|L)/g, "W")
    OwOfy = OwOfy.replace(/n([aeiou])/g, 'ny$1')
    OwOfy = OwOfy.replace(/N([aeiou])/g, 'Ny$1')
    OwOfy = OwOfy.replace(/N([AEIOU])/g, 'Ny$1')
    OwOfy = OwOfy.replace(/ove/g, "uv")

    res.status(200).json({ content: OwOfy })
})

module.exports = router