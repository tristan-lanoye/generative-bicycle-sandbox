// 'Base' Card Class

export default class Card {
    constructor(p, opts = {}) {
        this.size = {
            width: opts.hasOwnProperty('size') ? opts.size.width : 240,
            height: opts.hasOwnProperty('size') ? opts.size.height : 336
        }
        this.position = {
            x: opts.hasOwnProperty('position') ? opts.position.x : p.width / 2 - this.size.width / 2,
            y: opts.hasOwnProperty('position') ? opts.position.y : p.height / 2 - this.size.height / 2
        }

        this.roundedBorders = opts.hasOwnProperty('roundedBorders') ? opts.roundedBorders : 5

        this.margin = opts.hasOwnProperty('margin') ? opts.margin : 10
        this.palette = opts.hasOwnProperty('palette') ? opts.palette : undefined

        this.innerPosition = {
            x: this.position.x + this.margin / 2,
            y: this.position.y + this.margin / 2
        }

        this.innerSize = {
            width: this.size.width - this.margin,
            height: this.size.height - this.margin
        }

        this.innerCenter = {
            x: this.innerPosition.x + this.innerSize.width / 2,
            y: this.innerPosition.y + this.innerSize.height / 2
        }
    }

    displayBase(p) {
        p.noStroke()
        p.fill(255)
        p.rect(this.position.x, this.position.y, this.size.width, this.size.height, this.roundedBorders)
    }

    displayBorder(p) {
        p.strokeWeight(4)
        p.stroke(255)
        p.noFill()
        p.rect(this.innerPosition.x, this.innerPosition.y, this.innerSize.width, this.innerSize.height, this.roundedBorders)
    }
}
