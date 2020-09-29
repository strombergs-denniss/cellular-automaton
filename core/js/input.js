import Vector2 from "./vector2.js"

class Input {
    constructor(canvas) {
        this.canvas = canvas
        this.keys = {}
        this.buttons = {}
        this.cursorPosition = new Vector2()
        this.buttonDownPosition = new Vector2()
        this.buttonUpPosition = new Vector2()
        this.onKeyDown = (event) => {}
        this.onKeyUp = (event) => {}
        this.onCursorMove = (event) => {}
        this.onButtonDown = (event) => {}
        this.onButtonUp = (event) => {}

        document.addEventListener("keydown", (event) => {
            this.keys[event.key] = true
            this.onKeyDown(event)
        })

        document.addEventListener("keyup", (event) => {
            this.keys[event.key] = false
            this.onKeyUp(event)
        })

        this.canvas.getElement().addEventListener("mousemove", (event) => {
            this.cursorPosition[0] = event.pageX
            this.cursorPosition[1] = event.pageY
            this.onCursorMove(event)
        })

        this.canvas.getElement().addEventListener("mousedown", (event) => {
            this.buttons[event.button] = true
            this.buttonDownPosition[0] = event.pageX
            this.buttonDownPosition[1] = event.pageY
            this.onButtonDown(event)
        })

        this.canvas.getElement().addEventListener("mouseup", (event) => {
            this.buttons[event.button] = false
            this.buttonUpPosition[0] = event.pageX
            this.buttonUpPosition[1] = event.pageY
            this.onButtonUp(event)
        })
    }
}

export default Input
