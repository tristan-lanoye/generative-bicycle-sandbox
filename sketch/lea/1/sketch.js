import palettes from 'nice-color-palettes'

import { pick } from '/assets/scripts/utils.js'
import { CardBack, CardBack2 } from '/assets/scripts/CardBack.js'

const s = {
    delayToLoadBackgroundColor: 50,
    container: null,
    margin: {
        sides: 100
    },
    sketch: {
        width: window.innerHeight,
        height: window.innerHeight
    }
}

s.palette = pick(palettes)
s.color = pick(s.palette)

window.setTimeout(() => {
    s.container = document.querySelector('#container')
    s.container.style.background = s.color
}, s.delayToLoadBackgroundColor)

const script = (p) => {
    let card, card2

    function createCard(opts = {}) {
		if(!opts.hasOwnProperty('palette')) opts.palette = s.palette
		let type = opts.hasOwnProperty('type') ? opts.type : CardBack

        return new type(p, opts)
    }

	p.setup = () => {
		const canvas = p.createCanvas(s.sketch.width - s.margin.sides, s.sketch.height - s.margin.sides)
        canvas.parent('container')

        p.background(s.color)

        card = createCard()
        card.displayBase(p)
        card.displayBack(p)
        card.displayBorder(p)
        card.displayShape(p)

		// card2 = createCard({
		// 	type: CardBack2,
		// 	position: {
		// 		x: 0,
		// 		y: 0
		// 	}
		// })
        // card2.displayBase(p)
        // card2.displayBack(p)
        // card2.displayBorder(p)
        // card2.displayShape(p)
    }
}

new p5(script)
