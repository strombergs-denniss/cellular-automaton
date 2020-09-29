class Canvas {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.element = document.createElement("canvas")
        this.element.width = this.width
        this.element.height = this.height
        document.body.appendChild(this.element)
        this.gl = this.element.getContext("webgl2")
    }

    getWidth() {
        return this.width
    }

    setWidth(width) {
        this.width = width
        this.element.width = this.width
    }

    getHeight() {
        return this.height
    }

    setHeight(height) {
        this.height = height
        this.element.height = this.height
    }

    getElement() {
        return this.element
    }

    getGL() {
        return this.gl
    }
}

export default Canvas
