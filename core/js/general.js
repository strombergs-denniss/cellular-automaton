class General {
    static random() {
        return Math.random()
    }

    static randomInteger(minimal, maximal) {
        return this.floor(this.random() * (maximal - minimal + 1)) + minimal
    }

    static absolute(x) {
        return Math.abs(x)
    }

    static floor(x) {
        return Math.floor(x)
    }

    static ceil(x) {
        return Math.ceil(x)
    }

    static sine(x) {
        return Math.sin(x)
    }

    static cosine(x) {
        return Math.cos(x)
    }

    static tangent(x) {
        return Math.tan(x)
    }

    static minimal(a, b) {
        return Math.min(a, b)
    }

    static maximal(a, b) {
        return Math.max(a, b)
    }

    static clamp(x, minimal, maximal) {
        return this.minimal(minimal, this.maximal(x, maximal))
    }

    static loop(x, maximal) {
        return (maximal + x % maximal) % maximal
    }
}

export default General
