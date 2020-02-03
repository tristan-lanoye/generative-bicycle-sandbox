export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c

export const randomRange = (min, max) => {
    return Math.random() * (max - min) + min
}

export const pick = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
}
