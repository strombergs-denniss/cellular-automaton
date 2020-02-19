class CA {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.colors = new Uint8Array(width * height * 3)
    }

    loop(x, y) {
        let loopingX = (((this.width + x) % this.width) + this.width) % this.width
        let loopingY = (((this.height + y) % this.height) + this.height) % this.height
        return loopingX + loopingY * this.width
    }
}

export default CA
