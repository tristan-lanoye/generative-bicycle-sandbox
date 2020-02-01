import palettes from 'nice-color-palettes'

import { pick } from '/assets/scripts/utils.js'
import { Back } from '/assets/scripts/cards.js'

const s = {
    delayToLoadBackgroundColor: 50,
    container: null,
    margin: {
        sides: 100
    },
    sketch: {
        width: 750,
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
    let card

    function createCard() {
        const opts = {}

        opts.palette = s.palette

        return new Back(p, opts)
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
    }
} 

new p5(script)