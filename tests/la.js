import CA from "../core/ca.js"
import Utility from "../core/utility.js"

class LA extends CA {
    constructor(width, height) {
        super(width, height)
    }

    randomColor() {
        return [Utility.random(0, 255), Utility.random(0, 255), Utility.random(0, 255)]
    }

    colorToString(color) {
        return color[0] + " " + color[1] + " " + color[2]
    }

    randomColorMap(colorCount, turns) {
        let firstColor
        let colorMap = {}
        let nextColor

        if (turns) {
            colorCount = turns.length
        }

        for (let a = 0; a < colorCount; a++) {
            let color = this.randomColor()

            if (a == 0) {
                firstColor = color
            }

            if (a > 0) {
                color = [...nextColor]
            }

            let turn = Utility.random(-4, 4)

            if (turns) {
                turn = turns[a]
            }

            nextColor = this.randomColor()

            if (a == colorCount - 1) {
                nextColor = firstColor
            }

            colorMap[this.colorToString(color)] = { color: nextColor, turn: turn }
        }

        for (let a = 0; a < this.colors.length; a++) {
            this.colors[a * 3] = firstColor[0]
            this.colors[a * 3 + 1] = firstColor[1]
            this.colors[a * 3 + 2] = firstColor[2]
        }

        return colorMap
    }

    toTurns(string) {
        let turns = []

        for (let a = 0; a < string.length; a++) {
            switch (string[a]) {
                case "R":
                    turns.push(-1)
                    break
                case "L":
                    turns.push(1)
                    break
            }
        }

        return out
    }

    setup() {
        let width = 512
        let height = 512
        let cells = []
        let x = Math.trunc(width / 2)
        let y = Math.trunc(height / 2)
        let iterationCount = 1000
        let ca = new LA(width, height, cells, x, y, iterationCount)
        this.x = x
        this.y = y
        this.iterationCount = iterationCount
        this.directions = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
        ]
        this.directionIndex = 0
        this.colorMap = this.randomColorMap(48)
    }

    update() {
        for (let a = 0; a < this.iterationCount; a++) {
            let point = this.loop(this.x, this.y)

            let color = this.colors[point * 3] + " " + this.colors[point * 3 + 1] + " " + this.colors[point * 3 + 2]
            let cData = this.colorMap[color]

            this.colors[point * 3] = cData.color[0]
            this.colors[point * 3 + 1] = cData.color[1]
            this.colors[point * 3 + 2] = cData.color[2]
            this.directionIndex = (this.directionIndex + cData.turn + this.directions.length) % this.directions.length

            let aDir = this.directions[this.directionIndex]
            this.x = this.x + aDir[0]
            this.y = this.y + aDir[1]
        }
    }
}

export default LA
