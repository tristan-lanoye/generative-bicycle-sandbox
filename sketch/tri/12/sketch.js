import paperColors from 'paper-colors'

import { pick } from '/assets/scripts/utils.js'
import { CardBackGlobal } from '/assets/scripts/CardBack.js'

const settings = {
	card: {
		size: {
			width: 240,
			height: 336
		}
	},
	canvas: {
		container: null,
		size: {
			width: window.innerHeight,
			height: window.innerHeight
		},
		margin: 100
	},
	color: {
		palette: paperColors
	},
	delayToLoadBackgroundColor: 50,
}

settings.color.background = pick(settings.color.palette).hex
settings.color.card = settings.color.background

while(settings.color.card === settings.color.background) {
	settings.color.card = pick(settings.color.palette).hex
}

window.setTimeout(() => {
    settings.container = document.querySelector('#container')
    settings.container.style.background = settings.color.background
}, settings.delayToLoadBackgroundColor)

const script = (p) => {
    let card

    function createCard(opts = {}) {
		let type = opts.hasOwnProperty('type') ? opts.type : CardBack

		opts.card = settings.card
		opts.canvas = settings.canvas
		opts.color = settings.color

        return new type(p, opts)
    }

	p.setup = () => {
		const canvas = p.createCanvas(settings.canvas.size.width - settings.canvas.margin, settings.canvas.size.height - settings.canvas.margin)
		canvas.parent('container')

        p.background(settings.color.background)

        card = createCard({
			type: CardBackGlobal
		})
        card.displayBase()
        card.displayBack()
		card.initFold()
	}

	p.draw = () => {
		card.displayFold()
		card.displayBorder()
		card.displayWalls()
	}
}

new p5(script)
