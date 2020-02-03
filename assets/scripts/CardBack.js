import Card from './Card.js'
import paperColors from 'paper-colors'
import { pick, map, randomRange } from './utils.js'

// Class for card backs that extend 'Base' Card Class
// Create new classes when you want to test new things

// Card Back 1 : Template
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
                x: this.inner.center.x - this.triangleSize.width / 2,
                y: this.inner.center.y + this.triangleSize.height / 2
            },
            {
                x: this.inner.center.x,
                y: this.inner.center.y - this.triangleSize.height / 2
            },
            {
                x: this.inner.center.x + this.triangleSize.width / 2,
                y: this.inner.center.y + this.triangleSize.height / 2
            }
        ]
    }

    displayBack(p) {
        p.noStroke()
        p.fill(0)
        p.rect(this.inner.position.x, this.inner.position.y, this.inner.size.width, this.inner.size.height)
    }

    displayShape(p) {
        p.strokeWeight(6)
        p.stroke(pick(this.global.palette))
        p.fill()
        p.triangle(this.trianglePosition[0].x, this.trianglePosition[0].y, this.trianglePosition[1].x, this.trianglePosition[1].y, this.trianglePosition[2].x, this.trianglePosition[2].y)
    }
}

// Card Back 2
export class CardBackFold extends Card {
    constructor(p, opts) {
        super(p, opts)
    }

    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(40, 10)
        this.p.strokeWeight(0.2)
    }

    initFold() {
        this.resetStyle()

        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (10 * this.inner.size.width)
    }

    getSinusoidal(v, amount) {
        return this.p.createVector(amount * Math.sin(v.x), amount * Math.sin(v.y))
    }

    getHyperbolic(v, amount) {
        let r = v.mag() + 1.0e-10
        let theta = this.p.atan2(v.x, v.y)
        let x = amount * Math.sin(theta) / r
        let y = amount * Math.cos(theta) * r
        return this.p.createVector(x, y)
    }

    repeatFoldRandomly(v, range) {
        const times = randomRange(range.min, range.max)

        for(let i = 0; i < times; i++) {
            let amount = randomRange(1, 3)
            let which = Math.floor(randomRange(0, 2))

            switch(which) {
                case 0:
                    v = this.getHyperbolic(v, amount)
                case 1:
                    v = this.getSinusoidal(v, amount)
                default:
                    v = this.getSinusoidal(v, amount)
            }
        }

        return v
    }

    drawVariation(x, y) {
        let v = this.p.createVector(x, y)

        // v = this.repeatFoldRandomly(v, { min: 1, max: 2 })
        v = this.repeatFoldRandomly(v, { min: 1, max: 10 })

        const xx = map(this.p.randomGaussian(v.x, 0.0001), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
        const yy = map(this.p.randomGaussian(v.y, 0.0001), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

        this.resetStyle()
        this.p.point(xx, yy)
    }

    displayFold() {
        if (this.go) {
            for (let i = 0; (i < 20)&this.go; i++) {
                for (let x = this.x1; x <= this.x2; x += this.step) {
                    this.drawVariation(x, this.y)
                }
                this.y += this.step

                if (this.y > this.y2) {
                    this.go = false

                    console.log('done')
                }
            }
        }
    }
}

export class CardBackFold2 extends Card {
    constructor(p, opts) {
        super(p, opts)

        this.amount = 1 + randomRange(0.4, 0.9)
        this.maxIteration = randomRange(0, 8)
    }

    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(20, 2)
        this.p.strokeWeight(0.9)
    }

    initFold() {
        this.resetStyle()

        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
    }

    getSinusoidal(v, amount) {
        return this.p.createVector(amount * Math.sin(v.x), amount * Math.sin(v.y))
    }

    getHyperbolic(v, amount) {
        let r = v.mag() + 1.0e-10
        let theta = this.p.atan2(v.x, v.y)
        let x = amount * Math.sin(theta) / r
        let y = amount * Math.cos(theta) * r
        return this.p.createVector(x, y)
    }

    repeatFoldRandomly(v, range) {
        const times = randomRange(range.min, range.max)

        for(let i = 0; i < times; i++) {
            let which = Math.floor(randomRange(0, 2))

            switch(which) {
                case 0:
                    v = this.getSinusoidal(v, this.amount)
                case 1:
                    v = this.getSinusoidal(v, this.amount)
                default:
                    v = this.getSinusoidal(v, this.amount)
            }
        }

        return v
    }

    drawVariation(x, y) {
        let v = this.p.createVector(x, y)

        v = this.repeatFoldRandomly(v, { min: 1, max: 2 })

        const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
        const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

        this.resetStyle()
        this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
        // this.p.point(xx, yy)
    }

    displayFold() {
        if (this.go) {
            for (let i = 0; (i < 20)&this.go; i++) {
                for (let x = this.x1; x <= this.x2; x += this.step) {
                    this.drawVariation(x, this.y)
                }
                this.y += this.step

                if (this.y > this.y2) {
                    this.go = false

                    console.log('done')
                }
            }
        }
    }
}

export class CardBackFold3 extends Card {
    constructor(p, opts) {
        super(p, opts)

        //7 is good, 2 & 3 interesting
        this.maxIteration = 3
    }

    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(20, 2)
        this.p.strokeWeight(0.9)
    }

    initFold() {
        this.resetStyle()

        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
    }

    getSinusoidal(v, amount) {
        return this.p.createVector(amount * Math.sin(v.x), amount * Math.sin(v.y))
    }

    getHyperbolic(v, amount) {
        let r = v.mag() + 1.0e-10
        let theta = this.p.atan2(v.x, v.y)
        let x = amount * Math.sin(theta) / r
        let y = amount * Math.cos(theta) * r
        return this.p.createVector(x, y)
    }

    repeatFoldLinearly(v, amount, max) {
        for(let i = 0; i < max; i++) {
            v = this.getHyperbolic(v, amount)
        }

        return v
    }

    drawVariation(x, y) {
        const amount = 1
        let v = this.p.createVector(x, y)

        //max:2, max:10
        v = this.repeatFoldLinearly(v, amount, this.maxIteration)

        const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
        const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

        this.resetStyle()
        // this.p.rect(xx, yy, 11, 11)
        this.p.point(xx, yy)
    }

    displayFold() {
        if (this.go) {
            for (let i = 0; (i < 20)&this.go; i++) {
                for (let x = this.x1; x <= this.x2; x += this.step) {
                    this.drawVariation(x, this.y)
                }
                this.y += this.step

                if (this.y > this.y2) {
                    this.go = false

                    console.log('done')
                }
            }
        }
    }
}

export class CardBackFold4 extends Card {
    constructor(p, opts) {
        super(p, opts)

        this.maxIteration = 3
    }

    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(20, 2)
        this.p.strokeWeight(0.9)
    }

    initFold() {
        this.resetStyle()

        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
    }

    getSinusoidal(v, amount) {
        return this.p.createVector(amount * Math.sin(v.x), amount * Math.sin(v.y))
    }

    getHyperbolic(v, amount) {
        let r = v.mag() + 1.0e-10
        let theta = this.p.atan2(v.x, v.y)
        let x = amount * Math.sin(theta) / r
        let y = amount * Math.cos(theta) * r
        return this.p.createVector(x, y)
    }

    repeatFoldLinearly(v, amount, max) {
        for(let i = 0; i < max; i++) {
            v = this.getSinusoidal(v, amount)
        }

        return v
    }

    drawVariation(x, y) {
        const amount = 2.9
        let v = this.p.createVector(x, y)

        //max:2, max:10
        v = this.repeatFoldLinearly(v, amount, this.maxIteration)

        const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
        const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

        this.resetStyle()
        this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
        // this.p.point(xx, yy)
    }

    displayFold() {
        if (this.go) {
            for (let i = 0; (i < 20)&this.go; i++) {
                for (let x = this.x1; x <= this.x2; x += this.step) {
                    this.drawVariation(x, this.y)
                }
                this.y += this.step

                if (this.y > this.y2) {
                    this.go = false

                    console.log('done')
                }
            }
        }
    }
}

//current
export class CardBackFold5 extends Card {
    constructor(p, opts) {
        super(p, opts)

        this.maxIteration = 3
    }

    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(20, 2)
        this.p.strokeWeight(0.9)
    }

    initFold() {
        this.resetStyle()

        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
    }

    getSinusoidal(v, amount) {
        return this.p.createVector(amount * Math.sin(v.x), amount * Math.sin(v.y))
    }

    getHyperbolic(v, amount) {
        let r = v.mag() + 1.0e-10
        let theta = this.p.atan2(v.x, v.y)
        let x = amount * Math.sin(theta) / r
        let y = amount * Math.cos(theta) * r
        return this.p.createVector(x, y)
    }

    repeatFoldLinearly(v, amount, max) {
        for(let i = 0; i < max; i++) {
            v = this.getSinusoidal(v, amount)
        }

        return v
    }

    drawVariation(x, y) {
        const amount = 2.9
        let v = this.p.createVector(x, y)

        //max:2, max:10
        v = this.repeatFoldLinearly(v, amount, this.maxIteration)

        const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
        const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

        this.resetStyle()
        this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
        // this.p.point(xx, yy)
    }

    displayFold() {
        if (this.go) {
            for (let i = 0; (i < 20)&this.go; i++) {
                for (let x = this.x1; x <= this.x2; x += this.step) {
                    this.drawVariation(x, this.y)
                }
                this.y += this.step

                if (this.y > this.y2) {
                    this.go = false

                    console.log('done')
                }
            }
        }
    }
}


// Card Back Fold 6 : Template
export class CardBackFold6 extends Card {
    constructor(p, opts) {
        super(p, opts)
    }
    
    resetStyle() {
        this.p.smooth(8)
        this.p.noFill()
        this.p.stroke(40, 10)
        this.p.strokeWeight(0.2)
    }
    
    initFold() {
        this.resetStyle()
        
        this.go = true
        this.x1 = this.y1 = -3
        this.x2 = this.y2 = 3
        this.y = this.y1
        this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
    }
    
    drawVariation() {
        const {
            position,
            size
        } = this.inner
        
        let xx    = this.p.random(position.x + size.width, size.width),
            yy    = this.p.random(position.y + size.height, size.height),
            w     = this.p.random(5, 200),
            h     = this.p.random(5, 200),
            shape = Math.round(this.p.random(0, 1))

        this.resetStyle()
    
        let c = this.p.color(pick(paperColors).hex)
        c.setAlpha(this.p.random(50, 100))
        
        switch (shape) {
            case 0:
                this.p.fill(c)
                this.p.ellipse(xx - (w / 2), yy - (h / 2), w, h)
                break;
            case 1:
                this.p.fill(c)
                this.p.rect(xx - (w / 2), yy - (h / 2), w, h)
                break;
            default:
                this.p.fill(c)
                this.p.rect(xx - (w / 2), yy - (h / 2), w, h)
                break;
        }
    }
    
    displayFold (total) {
        if (this.go) {
            for (let i = 0; (i < total)&this.go; i++) {
                this.drawVariation();
                
                if ((i+1) === total)
                    this.go = false
            }
        }
    }
}
