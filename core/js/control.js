import ControlType from "./control-type.js"

class Control {
    constructor(input, controlType) {
        this.input = input
        this.controlTypeMap = {
            [ControlType.DEFAULT]: () => this.defaultControlType()
        }
        this.setControlType(controlType)
        this.x = 0
        this.y = 0
        this.z = 0
    }

    getControlType() {
        return this.controlType
    }

    setControlType(controlType) {
        if (this.controlTypeMap[controlType]) {
            this.controlType = controlType
        }
    }

    getInput() {
        return this.input
    }

    setInput(input) {
        this.input = input
    }

    defaultControlType() {
        if (this.input.keys["a"]) {
            this.x -= 5
        }
    
        if (this.input.keys["d"]) {
            this.x += 5
        }
    
        if (this.input.keys["s"]) {
            this.y -= 5
        }
    
        if (this.input.keys["w"]) {
            this.y += 5
        }
    
        if (this.input.keys["q"]) {
            this.z -= 5
        }
    
        if (this.input.keys["e"]) {
            this.z += 5
        }
    }

    update() {
        this.controlTypeMap[this.controlType]()
    }
}

export default Control
