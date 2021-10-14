const express = require('express')
const router = express.Router()
const { Toyhouse } = require('toyhou.se')

const URL_Query = {
    message: 'You need to provide a character\'s url.'
}
const Existing_URL = {
    message: 'You need to provide an existing character\'s url.'
}

router.get('/', (req, res) => {
    const Endpoints = {
            Endpoints: [
                '/creator?url=',
                '/character?url=',
                '/profile?url=',
                '/gallery?url=',
                '/creation?url=',
                '/tags?url=',
                '/all?url='
            ]
        }
    res.send(Endpoints)
})

router.get('/creator', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const Creator = await Character.Creator()
    return res.status(200).json(Creator)
})

router.get('/character', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    Character = await Character.Character()
    return res.status(200).json(Character)
})

router.get('/profile', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const Profile = await Character.Profile()
    return res.status(200).json({ Profile: Profile })
})

router.get('/gallery', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const Gallery = await Character.Gallery()
    return res.status(200).json({ Gallery: Gallery })
})

router.get('/creation', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const Creation = await Character.Creation()
    return res.status(200).json(Creation)
})

router.get('/tags', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const Tags = await Character.Tags()
    return res.status(200).json({ Tags: Tags })
})

router.get('/all', async (req, res) => {
    const URL = req.query.url
    if (!URL) return res.status(400).json(URL_Query)

    let Character;

    try {
        Character = new Toyhouse(URL)
    } catch {
        return res.status(400).json(Existing_URL)
    }

    const All = await Character.All()
    return res.status(200).json(All)
})

module.exports = router