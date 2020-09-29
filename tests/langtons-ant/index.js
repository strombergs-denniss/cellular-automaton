import { CellularAutomaton, ColorFormat, ColorIndexFunction, General, Vector2, Vector3} from "../../core/js/core.js"

new class LangtonsAnt extends CellularAutomaton {
    setup() {
        this.iterationCount = 1
        this.position = Vector2.randomInteger(new Vector2(), new Vector2(255, 255))
        this.currentDirection = 0
        this.directions = [
            new Vector2(0, 1),
            new Vector2(1, 0),
            new Vector2(0, -1),
            new Vector2(-1, 0)
        ]
    }

    update() {
        for (let a = 0; a < this.iterationCount; ++a) {
            let color = this.getLuminance(this.position, ColorIndexFunction.LOOP)

            if (color == 0) {
                this.currentDirection = General.loop(this.currentDirection - 1, this.directions.length)
                this.setLuminance(this.position, 255, ColorIndexFunction.LOOP)
            } else {
                this.currentDirection = General.loop(this.currentDirection + 1, this.directions.length)
                this.setLuminance(this.position, 0, ColorIndexFunction.LOOP)
            }

            this.position.add(this.directions[this.currentDirection])
        }
    }

    configureColors() {
        this.size = new Vector2(256, 256)
        this.colorFormat = ColorFormat.LUMINANCE
        this.generateColors()
        this.setLuminance(this.position, 255, ColorIndexFunction.LOOP)
    }

    configureObjectEditor() {
        this.exposedProperties = {
            ...this.exposedProperties,
            iterationCount: {},
            position: {},
            currentDirection: {},
            directions: {}
        }
    }
}
