import Card from './Card.js'
import { pick } from './utils.js'

// Class for card backs that extend 'Base' Card Class
// Create new classes when you want to test new things

// Card Back 1
export class CardBack extends Card {
    constructor(p, opts) {
        super(p, opts)

        this.initTriangle()
    }

    initTriangle() {
        this.triangleSize = {
            width: 60,
            height: 60
        }
        this.trianglePosition = [
            {
                x: this.innerCenter.x - this.triangleSize.width / 2,
                y: this.innerCenter.y + this.triangleSize.height / 2
            },
            {
                x: this.innerCenter.x,
                y: this.innerCenter.y - this.triangleSize.height / 2
            },
            {
                x: this.innerCenter.x + this.triangleSize.width / 2,
                y: this.innerCenter.y + this.triangleSize.height / 2
            }
        ]
    }

    displayBack(p) {
        p.noStroke()
        p.fill(0)
        p.rect(this.innerPosition.x, this.innerPosition.y, this.innerSize.width, this.innerSize.height)
    }

    displayShape(p) {
        p.strokeWeight(6)
        p.stroke(pick(this.palette))
        p.fill(pick(this.palette))
        p.triangle(this.trianglePosition[0].x, this.trianglePosition[0].y, this.trianglePosition[1].x, this.trianglePosition[1].y, this.trianglePosition[2].x, this.trianglePosition[2].y)
    }
}
