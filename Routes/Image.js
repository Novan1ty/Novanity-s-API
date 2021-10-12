const express = require('express')
const router = express.Router()
const { createCanvas, loadImage, registerFont } = require('canvas')
const jimp = require('jimp')

registerFont('./Assets/Open_Sans.ttf', {
    family: 'Sans'
})

const Content = {
    'Content-Type': 'image/png'
}
const Text_Query = {
    message: 'You need to provide the text query.'
}
const Image_Query = {
    message: 'You need to provide the image query.'
}
const Image_URL_Query = {
    message: 'You need to provide a valid image url.'
}

router.get('/', (req, res) => {
    const Endpoints = {
        Endpoints: [
            '/wheresmywater?text=',
            '/opinion?text=',
            '/art?image=',
            '/greyscale?image=&intensity',
            '/invert?image=',
            '/sepia?image=',
            '/blur?image=',
            '/gaussian?image=',
            '/posterize?image=',
            '/circle?image=',
            '/pixellate?image=',
            '/brightness?image='
        ]
    }

    res.send(Endpoints)
})

router.get('/wheresmywater', async (req, res) => {
    const Text = req.query.text
    if (!Text) return res.status(400).json(Text_Query)

    const Canvas = createCanvas(800, 900)
    const Context = Canvas.getContext('2d')

    Context.font = '35px Sans'
    Context.fillStyle = 'black'
    Context.textAlign = 'left'

    const Template = await loadImage('https://i.imgur.com/Z5sdCl3.jpg')
    Context.drawImage(Template, 0, 0, Template.width, Template.height)
    Wrap_Text(Context, Text, 16, 40, 790, 40)

    const Image = Canvas.toBuffer()

    res.set(Content)
    res.status(200).send(Image)
})

router.get('/opinion', async (req, res) => {
    const Text = req.query.text
    if (!Text) return res.status(400).json(Text_Query)

    const Canvas = createCanvas(1200, 930)
    const Context = Canvas.getContext('2d')

    Context.font = '45px Sans'
    Context.fillStyle = 'black'
    Context.textAlign = 'left'
    
    const Template = await loadImage('https://i.imgur.com/OVbxvbj.jpg')
    Context.drawImage(Template, 0, 0, Template.width, Template.height)
    Wrap_Text(Context, Text, 14.5, 43, 1200, 46)

    const Image = Canvas.toBuffer()

    res.set(Content)
    res.status(200).send(Image)
})

router.get('/art', async (req, res) => {
    const Image_URL = req.query.image
    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await loadImage(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    const Canvas = createCanvas(637, 675)
    const Context = Canvas.getContext('2d')

    const Template = await loadImage('https://media.discordapp.net/attachments/839163340714409996/860530502086557736/Art.png?width=573&height=610')

    Context.drawImage(Chosen_Image, 436, 43, 145, 170)
    Context.drawImage(Chosen_Image, 438, 379, 146, 174)
    Context.drawImage(Template, 0, 0, Canvas.width, Canvas.height)

    const Image = Canvas.toBuffer()

    res.set(Content)
    res.status(200).send(Image)
})

router.get('/greyscale', async (req, res) => {
    const Image_URL = req.query.image
    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.greyscale()
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/invert', async (req, res) => {
    const Image_URL = req.query.image
    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.invert()
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/sepia', async (req, res) => {
    const Image_URL = req.query.image
    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.sepia()
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/blur', async (req, res) => {
    const Image_URL = req.query.image
    const Intensity = req.query.intensity

    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.blur(Number(Intensity) || 3)
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/gaussian', async (req, res) => {
    const Image_URL = req.query.image
    const Intensity = req.query.intensity

    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.gaussian(Number(Intensity) || 3)
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/posterize', async (req, res) => {
    const Image_URL = req.query.image
    const Intensity = req.query.intensity

    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.posterize(Number(Intensity) || 3)
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/circle', async (req, res) => {
    const Image_URL = req.query.image
    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.circle()
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/pixellate', async (req, res) => {
    const Image_URL = req.query.image
    const Intensity = req.query.intensity

    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    Chosen_Image.pixelate(Number(Intensity) || 10)
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

router.get('/brightness', async (req, res) => {
    const Image_URL = req.query.image
    let Value = req.query.value

    if (!Image_URL) return res.status(400).json(Image_Query)

    let Chosen_Image;
    
    try {
        Chosen_Image = await jimp.read(Image_URL)
    } catch {
        return res.status(400).json(Image_URL_Query)
    }

    if (!Value) return res.status(400).json({
		message: 'You need to provide the value query.'
	})

	if (!Number(Value)) {
        return res.status(400).json({
            message: 'The value has to be a number.'
        })
    } else {
        Value = Number(Value)
    }

	if (Value > 1 || Value < -1) return res.status(400).json({
		message: 'The value must be between -1 to +1.'
	})

    Chosen_Image.brightness(Value)
    const Image = await Chosen_Image.getBufferAsync('image/png')
    
    res.set(Content)
    res.status(200).send(Image)
})

function Wrap_Text(Context, Text, x, y, Max_Width, Line_Height) {
    var Letters = Text.split(' ')
    var Line = ''

    for (var n = 0; n < Letters.length; n++) {
        var Resulting_Line = Line + Letters[n] + ' '
        var Width = Context.measureText(Resulting_Line)
        var Resulting_Width = Width.width
        if (Resulting_Width > Max_Width && n > 0) {
            Context.fillText(Line, x, y)
            Line = Letters[n] + ' '
            y += Line_Height
        } else {
            Line = Resulting_Line
        }
    }
    Context.fillText(Line, x, y)
}
function Apply_Text(Canvas, Text, Font, Font_Size) {
    const Context = Canvas.getContext('2d')

    // Declare a base size of the font
    let _Font_Size_ = Font_Size;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        Context.font = `${_Font_Size_ -= 10}px ${Font}`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (Context.measureText(Text).width > Canvas.width - 300);

    // Return the result to use in the actual canvas
    return Context.font;
}

module.exports = router