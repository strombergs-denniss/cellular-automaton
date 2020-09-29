import { Canvas, ObjectEditor, Loop, Renderer, Input, Control, ControlType, Vector3, ColorFormat, Vector2 } from "../../core/js/core.js"

class CellularAutomaton {
    constructor() {
        this.size = new Vector2(1, 1)
        this.colorFormat = ColorFormat.LUMINANCE
        this.exposedProperties = {
            size: {},
            colorFormat: {}
        }
        this.setup()
        this.configureColors()
        this.configureObjectEditor()
        this.build()
    }

    getLuminance(position, indexFunction) {
        let index = indexFunction(this.size, position)
        return this.colors[index]
    }

    setLuminance(position, value, indexFunction) {
        let index = indexFunction(this.size, position)
        this.colors[index] = value
    }

    getRGB(position, indexFunction) {
        let index = indexFunction(this.size, position)

        return new Vector3(
            this.colors[index],
            this.colors[index + 1],
            this.colors[index + 2]
        )
    }

    setRGB(position, value, indexFunction) {
        let index = indexFunction(this.size, position)
        this.colors[index] = value.getX()
        this.colors[index + 1] = value.getY()
        this.colors[index + 2] = value.getZ()
    }

    generateColors() {
        this.colorChannelCount = this.colorFormat == ColorFormat.LUMINANCE ? 1 : 3
        this.colors = new Uint8Array(this.size.getX() * this.size.getY() * this.colorChannelCount)
    }

    build() {
        this.canvas = new Canvas(document.body.clientWidth, document.body.clientHeight)
        this.objectEditor = new ObjectEditor(this, this.exposedProperties)
        this.loop = new Loop()
        this.renderer = new Renderer(this.canvas, this.size.getX(), this.size.getY(), this.colors, this.colorFormat)
        this.input = new Input(this.canvas)
        this.control = new Control(this.input, ControlType.DEFAULT)

        var self = this
        this.loop.process = () => {
            self.renderer.update(self.position.getX(), self.position.getY(), self.colors)
            self.renderer.view[12] = self.control.x
            self.renderer.view[13] = self.control.y
            self.renderer.model[0] = -self.control.z
            self.renderer.model[5] = self.control.z
            self.control.update()
            self.update()
        }

        this.loop.setIsRunning(true)
        this.loop.update()
    }
}

export default CellularAutomaton
