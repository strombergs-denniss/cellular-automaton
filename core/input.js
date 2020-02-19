class Input {
    constructor(canvas) {
        this.canvas = canvas
        this.keys = {}
        this.buttons = {}
        this.downPosition = [0, 0]
        this.upPosition = [0, 0]
        this.movePosition = [0, 0]

        document.addEventListener("keydown", event => {
            this.keys[event.key] = true
            this.keyDown(event)
        })

        document.addEventListener("keyup", event => {
            this.keys[event.key] = false
            this.keyUp(event)
        })

        this.canvas.addEventListener("mousedown", event => {
            this.buttons[event.button] = true
            this.downPosition[0] = event.pageX
            this.downPosition[1] = event.pageY
            this.mouseDown(event)
        })

        this.canvas.addEventListener("mouseup", event => {
            this.buttons[event.button] = false
            this.upPosition[0] = event.pageX
            this.upPosition[1] = event.pageY
            this.mouseUp(event)
        })

        this.canvas.addEventListener("mousemove", event => {
            this.movePosition[0] = event.pageX
            this.movePosition[1] = event.pageY
            this.mouseMove(event)
        })
    }

    keyDown(event) {}

    keyUp(event) {}

    mouseDown(event) {}

    mouseUp(event) {}

    mouseMove(event) {}
}

export default Input
