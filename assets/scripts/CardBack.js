import Card from './Card.js'
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
		this.maxIteration = 7
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

export class CardBackFold5 extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.maxIteration = 1
    }

	resetStyle() {
		this.p.smooth(8)
		this.p.noFill()
		this.p.stroke(20, 20)
		this.p.strokeWeight(0.5)
	}

	initFold() {
		this.resetStyle()

		this.go = true
		this.x1 = this.y1 = -3
		this.x2 = this.y2 = 3
		this.y = this.y1
		this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
	}

	repeatFoldLinearly(v, amount, max) {
		for(let i = 0; i < max; i++) {
			v = this.getSwirl(v, amount)
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
		// this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
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

export class CardBackFold6 extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.maxIteration = 1
    }

	resetStyle() {
		this.p.smooth(8)
		this.p.noFill()
		this.p.stroke(randomRange(0, 160), 20)
		this.p.strokeWeight(0.5)
	}

	initFold() {
		this.resetStyle()

		this.go = true
		this.x1 = this.y1 = -3
		this.x2 = this.y2 = 3
		this.y = this.y1
		this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
	}

	drawVariation(x, y) {
		let v = this.p.createVector(x, y)

		v = this.getSinusoidal(v, 1)
		v = this.getSinusoidal(v, 1)
		v = this.getSinusoidal(v, 1)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 4)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 0.5)
		v = this.getSwirl(v, 1.8)
		v = this.getSwirl(v, 1)
		//comment this, it is good too
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 3)
		v = this.getHyperbolic(v, 3)
		v = this.getHyperbolic(v, 1.5)
		v = this.getHyperbolic(v, 1.8)

		// v = this.getHyperbolic(v, 1)
		// v = this.getSwirl(v, 2)
		// v = this.getSwirl(v, 3)

		const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
		const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

		this.resetStyle()
		// this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
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

	gridline(x1, y1, x2, y2) {
		let tmp
		/* Swap coordinates if needed so that x1 <= x2 */
		if (x1 > x2) {
			tmp = x1;
			x1 = x2;
			x2 = tmp;
			tmp = y1;
			y1 = y2;
			y2 = tmp;
		}

		let dx = x2 - x1;
		let dy = y2 - y1;
		let step = 1;

		if (x2 < x1)
		  step = -step;

		let sx = x1;
		let sy = y1;
		for (let x = x1+step; x <= x2; x+=step) {
		  let y = y1 + step * dy * (x - x1) / dx;
		  this.p.strokeWeight(1 + this.p.map(this.p.noise(sx, sy), 0, 1, -0.5, 0.5));
		  this.p.line(sx, sy, x + this.p.map(this.p.noise(x, y), 0, 1, -1, 1), y + this.p.map(this.p.noise(x, y), 0, 1, -1, 1));
		  sx = x;
		  sy = y;
		}
	  }

	grid() {
		let spacing = 3
		let innerWidth = this.inner.size.width
		let innerHeight = this.inner.size.height

		for (let i = -innerWidth; i < innerHeight + innerWidth; i += spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i + this.inner.limit.x2
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(0, this.p.random(2, 16))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}

		for (let i = innerHeight + innerWidth; i >= -innerWidth; i -= spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i - this.inner.limit.x2 * 0.05
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(0, this.p.random(1, 3))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}
	}
}

export class CardBackFoldTest extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.maxIteration = 1
    }

	resetStyle() {
		this.p.smooth(8)
		this.p.noFill()
		this.p.stroke(randomRange(0, 140), 20)
		this.p.strokeWeight(0.5)
	}

	initFold() {
		this.resetStyle()

		this.go = true
		this.x1 = this.y1 = -3
		this.x2 = this.y2 = 3
		this.y = this.y1
		this.step = (this.x2 - this.x1) / (2 * this.inner.size.width)
	}

	drawVariation(x, y) {
		let v = this.p.createVector(x, y)

		// v = this.getSpherical(v, 1)
		// v = this.getSwirl(v, 1)
		// v = this.getSwirl(v, 1)
		// v = this.getSpherical(v, 1)

		v = this.getHorseshoe(v, 1)
		v = this.getHorseshoe(v, 1)
		v = this.getHorseshoe(v, 1)
		v = this.getHorseshoe(v, 1)
		v = this.getHorseshoe(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getHyperbolic(v, 1)
		v = this.getPolar(v, 1)
		v = this.getPolar(v, 1)
		v = this.getPolar(v, 1)
		v = this.getPolar(v, 1)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 2)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 1)
		v = this.getSwirl(v, 1)
		v = this.getHorseshoe(v, 1)

		// v = this.getHeart(v, 4)
		// v = this.getSinusoidal(v, 2)
		// v = this.getSwirl(v, 1)
		// v = this.getSwirl(v, 1)
		// v = this.getSwirl(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHandkerchief(v, 1)
		// v = this.getHandkerchief(v, 1)
		// v = this.getHandkerchief(v, 1)
		// v = this.getHandkerchief(v, 1)
		// v = this.getSpherical(v, 1)
		// v = this.getSpherical(v, 1)
		// v = this.getSpherical(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHeart(v, 1)
		// v = this.getHyperbolic(v, 1)
		// v = this.getHyperbolic(v, 1)


		const xx = map(this.p.randomGaussian(v.x, 0.009), this.x1, this.x2, this.inner.limit.x1, this.inner.limit.x2)
		const yy = map(this.p.randomGaussian(v.y, 0.009), this.y1, this.y2, this.inner.limit.y1, this.inner.limit.y2)

		this.resetStyle()
		// this.p.rect(xx - 5.5, yy - 5.5, 11, 11)
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

export class CardBackWatercolor extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.initial_size = 5
		this.initial_deviation = 300
		this.deviation = 90

		this.points
		this.current
	}

	setup() {
		this.p.noStroke()
		this.p.colorMode(this.p.HSB)
		this.p.blendMode(this.p.DARKEST)
		this.p.noLoop()
	}

	draw() {
		for (let h = -100; h < this.canvas.size.height; h += 25) {
			this.init(h)
			this.p.fill(this.p.random(360), 100, 80, .01)

			for (let i = 0; i < 35; i++) {
				this.current = this.update()
				this.display()
			}
		}
	}

	init(ypos) {
		this.points = [];

		for (let i = 0; i < this.initial_size; i++) {
		  	this.points.push(this.p.createVector((i / (this.initial_size - 1)) * this.canvas.width, ypos, this.p.random(-1,1)))
		}

		for(let b = 0; b < 6; b++) {
		  	this.interpolate(this.points, this.initial_deviation)
		}
	}

	update() {
		let c = this.deep_copy(this.points)

		for(let b = 0; b < 5; b++) {
			for (let i = 0; i < c.length; i++) {
				this.move_nearby(c[i], this.deviation)
			}
		}

		return c
	}

	display() {
		this.p.beginShape()

		for (let i = 0; i < this.current.length; i++) {
			if(this.current[i].x > this.inner.limit.x1
				&& this.current[i].x < this.inner.limit.x2
				&& this.current[i].y > this.inner.limit.y1
				&& this.current[i].y < this.inner.limit.y2) {
				this.p.vertex(this.current[i].x, this.current[i].y)
			}
		}

		this.p.vertex(this.canvas.width, this.canvas.height)
		this.p.vertex(0, this.canvas.height)
		this.p.endShape(this.p.CLOSE)
	}

	interpolate(points, sd) {
		for (let i = points.length-1; i > 0; i--) {
		  	points.splice(i, 0, this.generate_midpoint(points[i-1], points[i], sd))
		}
	}

	generate_midpoint(p1, p2, sd) {
		let p3 = this.p.createVector((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, ((p1.z + p2.z) / 2) * .45 * this.p.random(.1, 3.5))
		this.move_nearby(p3, sd)

		return p3
	}

	move_nearby(pnt, sd) {
		pnt.x = this.p.randomGaussian(pnt.x, pnt.z * sd);
		pnt.y = this.p.randomGaussian(pnt.y, pnt.z * sd);
	}

	deep_copy(arr) {
		let narr = []

		for (var i = 0; i < arr.length; i++) {
		  	narr.push(arr[i].copy())
		}

		return narr
	}
}

export class CardBackTexture extends Card {
    constructor(p, opts) {
		super(p, opts)
	}

	gridline(x1, y1, x2, y2) {
		let tmp
		/* Swap coordinates if needed so that x1 <= x2 */
		if (x1 > x2) {
			tmp = x1;
			x1 = x2;
			x2 = tmp;
			tmp = y1;
			y1 = y2;
			y2 = tmp;
		}

		let dx = x2 - x1;
		let dy = y2 - y1;
		let step = 1;

		if (x2 < x1)
		  step = -step;

		let sx = x1;
		let sy = y1;
		for (let x = x1+step; x <= x2; x+=step) {
		  let y = y1 + step * dy * (x - x1) / dx;
		  this.p.strokeWeight(1 + this.p.map(this.p.noise(sx, sy), 0, 1, -0.5, 0.5));
		  this.p.line(sx, sy, x + this.p.map(this.p.noise(x, y), 0, 1, -1, 1), y + this.p.map(this.p.noise(x, y), 0, 1, -1, 1));
		  sx = x;
		  sy = y;
		}
	  }

	grid() {
		let spacing = 3
		let innerWidth = this.inner.size.width
		let innerHeight = this.inner.size.height

		for (let i = -innerWidth; i < innerHeight + innerWidth; i += spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i + this.inner.limit.x2
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(this.p.random(5, 15))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}

		for (let i = innerHeight + innerWidth; i >= -innerWidth; i -= spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i - this.inner.limit.x2 * 0.05
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(0, this.p.random(5, 15))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}
	  }
}

export class CardBackTexture2 extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.maxIteration = 7
	}

	gridline(x1, y1, x2, y2) {
		let tmp
		/* Swap coordinates if needed so that x1 <= x2 */
		if (x1 > x2) {
			tmp = x1;
			x1 = x2;
			x2 = tmp;
			tmp = y1;
			y1 = y2;
			y2 = tmp;
		}

		let dx = x2 - x1;
		let dy = y2 - y1;
		let step = 1;

		if (x2 < x1)
		  step = -step;

		let sx = x1;
		let sy = y1;
		for (let x = x1+step; x <= x2; x+=step) {
		  let y = y1 + step * dy * (x - x1) / dx;
		  this.p.strokeWeight(1 + this.p.map(this.p.noise(sx, sy), 0, 1, -0.5, 0.5));
		  this.p.line(sx, sy, x + this.p.map(this.p.noise(x, y), 0, 1, -1, 1), y + this.p.map(this.p.noise(x, y), 0, 1, -1, 1));
		  sx = x;
		  sy = y;
		}
	  }

	grid() {
		let spacing = 3
		let innerWidth = this.inner.size.width
		let innerHeight = this.inner.size.height

		for (let i = -innerWidth; i < innerHeight + innerWidth; i += spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i + this.inner.limit.x2
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(0, this.p.random(2, 10))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}

		for (let i = innerHeight + innerWidth; i >= -innerWidth; i -= spacing) {
			let adjustedX1 = i + this.inner.limit.x1
			let adjustedX2 = i - this.inner.limit.x2 * 0.05
			let adjustedY1 = this.inner.limit.y1
			let adjustedY2 = this.inner.limit.y2

			this.p.stroke(0, this.p.random(2, 10))
			this.gridline(adjustedX1, adjustedY1, adjustedX2, adjustedY2)
		}
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

export class CardBackTest extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.points = [
			{
				x: 75,
				y: 150
			},
			{
				x: 380,
				y: 230
			},
			{
				x: 250,
				y: 400
			},
			{
				x: 490,
				y: 520
			}
		]
	}

	resetStyle() {
		this.p.smooth(8)
		this.p.noFill()
		this.p.stroke(20, 2)
		this.p.strokeWeight(0.9)
	}

	createConstellation() {
		this.points.forEach((p, i) => {
			const x = map(p.x, 0, this.canvas.size.width, this.inner.limit.x1, this.inner.limit.x2)
			const y = map(p.y, 0, this.canvas.size.height, this.inner.limit.y1, this.inner.limit.y2)

			this.p.fill(200, 30)
			this.p.rect(x - 2, y - 2, 4, 4)

			if(i !== this.points.length - 1) {
				const np = this.points[i + 1]
				const npx = map(np.x, 0, this.canvas.size.width, this.inner.limit.x1, this.inner.limit.x2)
				const npy = map(np.y, 0, this.canvas.size.width, this.inner.limit.y1, this.inner.limit.y2)

				this.p.stroke(255, 30)
				this.p.line(x, y, npx, npy)
			}
		})
	}

	createFrame() {
		this.p.fill(30)
		this.p.strokeWeight(1)
		this.p.stroke(255)
		this.p.rect(this.inner.limit.x1 + 50, this.inner.limit.y1 + 50, this.inner.size.width - 100, this.inner.size.height - 100)
	}

	circle8(x, y, r) {
		this.p.noFill();
		this.p.stroke(255, 50);
		this.p.ellipse(x, y, 2*r, 2*r);
		this.p.stroke(255, 5);
		for (let rt = 0; rt < 360; rt += 15) {
		  for (let i = 0; i <= 2*r; i+=this.p.random(1, 20)) {
			this.p.strokeWeight(this.p.random(1, 5));
			let cx = x + (r - i/2) * this.p.cos(this.p.radians(rt));
			let cy = y + (r - i/2) * this.p.sin(this.p.radians(rt));
			this.p.ellipse(cx, cy, i, i);
		  }
		}
	}

	circle14(x, y, r) {
		this.p.noFill();
		let sw = 1;
		this.p.strokeWeight(sw);
		for (let i = 0; i <= r - sw/2; i+=3*sw) {
		  for (let k = 0; k < 30; k++) {
			this.p.stroke(255, this.p.random(1, 10));
			this.p.arc(x, y, 2*i, 2*i, this.p.random(this.p.TWO_PI + this.p.PI/2), this.p.random(this.p.TWO_PI + this.p.PI/2), this.p.CHORD);
		  }
		}
	  }

	circle28(x, y, r) {
		let rt = this.p.random(360)

		this.p.noStroke();
		for (let i = 0; i <= 2*r; i+=this.p.map(i, 0, 2*r, 1, 3)) {
		  this.p.fill(0, this.p.map(i, 0, 2*r, 80, 10));
		  this.p.ellipse(x, y, i, i);
		}

		this.p.fill(0);
		this.p.ellipse(x, y, 2*r, 2*r);
		for (let i = 0; i < 100; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(40, 60));
		  this.p.ellipse(sx, sy, 8, 8);
		}

		for (let i = 0; i < 300; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(50, 80));
		  this.p.ellipse(sx, sy, 5, 5);
		}

		for (let i = 0; i < 500; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(80, 90));
		  this.p.ellipse(sx, sy, 2, 2);
		}

		for (let i = 0; i < 1000; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255);
		  this.p.ellipse(sx, sy, 1, 1);
		}
	}

	createPlanet() {
		let x = this.canvas.size.width / 2
		let y = this.canvas.size.height / 2
		let r = 150

		this.circle28(x, y, r)
	}
}

export class CardBackTest2 extends Card {
    constructor(p, opts) {
		super(p, opts)

		this.points = [
			{
				x: 75,
				y: 150
			},
			{
				x: 380,
				y: 230
			},
			{
				x: 250,
				y: 400
			},
			{
				x: 490,
				y: 520
			}
		]
	}

	resetStyle() {
		this.p.smooth(8)
		this.p.noFill()
		this.p.stroke(20, 2)
		this.p.strokeWeight(0.9)
	}

	createConstellation() {
		this.points.forEach((p, i) => {
			const x = map(p.x, 0, this.canvas.size.width, this.inner.limit.x1, this.inner.limit.x2)
			const y = map(p.y, 0, this.canvas.size.height, this.inner.limit.y1, this.inner.limit.y2)

			this.p.fill(200, 30)
			this.p.rect(x - 2, y - 2, 4, 4)

			if(i !== this.points.length - 1) {
				const np = this.points[i + 1]
				const npx = map(np.x, 0, this.canvas.size.width, this.inner.limit.x1, this.inner.limit.x2)
				const npy = map(np.y, 0, this.canvas.size.width, this.inner.limit.y1, this.inner.limit.y2)

				this.p.stroke(255, 30)
				this.p.line(x, y, npx, npy)
			}
		})
	}

	createFrame() {
		this.p.fill(30)
		this.p.strokeWeight(1)
		this.p.stroke(255)
		this.p.rect(this.inner.limit.x1 + 50, this.inner.limit.y1 + 50, this.inner.size.width - 100, this.inner.size.height - 100)
	}

	circle8(x, y, r) {
		this.p.noFill();
		this.p.stroke(255, 50);
		this.p.ellipse(x, y, 2*r, 2*r);
		this.p.stroke(255, 5);
		for (let rt = 0; rt < 360; rt += 15) {
		  for (let i = 0; i <= 2*r; i+=this.p.random(1, 20)) {
			this.p.strokeWeight(this.p.random(1, 5));
			let cx = x + (r - i/2) * this.p.cos(this.p.radians(rt));
			let cy = y + (r - i/2) * this.p.sin(this.p.radians(rt));
			this.p.ellipse(cx, cy, i, i);
		  }
		}
	}

	circle14(x, y, r) {
		this.p.noFill();
		let sw = 1;
		this.p.strokeWeight(sw);
		for (let i = 0; i <= r - sw/2; i+=3*sw) {
		  for (let k = 0; k < 30; k++) {
			this.p.stroke(255, this.p.random(1, 10));
			this.p.arc(x, y, 2*i, 2*i, this.p.random(this.p.TWO_PI + this.p.PI/2), this.p.random(this.p.TWO_PI + this.p.PI/2), this.p.CHORD);
		  }
		}
	  }

	circle28(x, y, r) {
		let rt = this.p.random(360)

		this.p.noStroke();
		for (let i = 0; i <= 2*r; i+=this.p.map(i, 0, 2*r, 1, 3)) {
		  this.p.fill(0, this.p.map(i, 0, 2*r, 80, 10));
		  this.p.ellipse(x, y, i, i);
		}

		this.p.fill(0);
		this.p.ellipse(x, y, 2*r, 2*r);
		for (let i = 0; i < 100; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(40, 60));
		  this.p.ellipse(sx, sy, 8, 8);
		}

		for (let i = 0; i < 300; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(50, 80));
		  this.p.ellipse(sx, sy, 5, 5);
		}

		for (let i = 0; i < 500; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255, this.p.random(80, 90));
		  this.p.ellipse(sx, sy, 2, 2);
		}

		for (let i = 0; i < 1000; i++) {
		  rt = this.p.radians(this.p.random(360));
		  let sx = x + this.p.noise(rt, i) * r * this.p.cos(rt);
		  let sy = y + this.p.noise(rt, i) * r * this.p.sin(rt);
		  this.p.fill(255);
		  this.p.ellipse(sx, sy, 1, 1);
		}
	}

	createPlanet() {
		let x = this.canvas.size.width / 2
		let y = this.canvas.size.height / 2
		let r = 150

		this.circle28(x, y, r)
	}
}

export class CardBackGlobal extends Card {
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

	combineFolds(v) {

	}

	drawVariation(x, y) {
		let v = this.p.createVector(x, y)

		v = this.combineFolds(v)

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
