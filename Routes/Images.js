const express = require('express')
const router = express.Router()
const { createCanvas, loadImage } = require('canvas')

router.get('/', (req, res) => {
    res.send('Heya.')
})

router.get('/wheresmywater/:text', (req, res) => {
    const Text = req.params.text

    if (!Text) return res.json({
		error: true,
		message: 'Missing the text parameter.'
	})
    
    const Template = createCanvas(800, 900)
    const Canvas = Template.getContext('2d')
    
    Canvas.font = '30px sans'
    Canvas.fillStyle = 'black'
    Canvas.textAlign = 'left'
    
    loadImage('https://i.imgur.com/Z5sdCl3.jpg').then(Image => {
        Canvas.drawImage(Image, 0, 0, Image.width, Image.height)
        Wrap_Text(Canvas, Text, 16, 45, 790, 35)
        
        res.set('content-type', 'image/jpeg')

res.status(200).send(Template.toBuffer())
    })
})

router.get('/opinion/:text', (req, res) => {
    const Text = req.params.text
    
    const Template = createCanvas(1200, 930)
    const Canvas = Template.getContext('2d')
    
    Canvas.font = '30px sans'
    Canvas.fillStyle = 'black'
    Canvas.textAlign = 'left'
    
    loadImage('https://i.imgur.com/OVbxvbj.jpg').then(Image => {
        Canvas.drawImage(Image, 0, 0, Image.width, Image.height)
        Wrap_Text(Canvas, Text, 14.5, 35, 1200, 35)

        res.set('content-type', 'image/jpeg')
      res.status(200).send(Template.toBuffer())
    })
})

function Wrap_Text(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ')
    var line = ''

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '
        var metrics = context.measureText(testLine)
        var testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y)
            line = words[n] + ' '
            y += lineHeight
        } else {
            line = testLine
        }
    }
    context.fillText(line, x, y)
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