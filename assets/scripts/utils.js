export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c

export const randomRange = (min, max) => {
    return Math.random() * (max - min) + min
}

export const pick = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

export const hexToRgb = (hex) => {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null
}

export const shuffleArray = (a) => {
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}
