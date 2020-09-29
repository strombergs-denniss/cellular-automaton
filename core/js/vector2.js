import General from "./general.js"
import Vector3 from "./vector3.js"

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    getX() {
        return this.x
    }

    setX(x) {
        this.x = x
    }

    getY() {
        return this.y
    }

    setY(y) {
        this.y = y
    }

    add(other) {
        this.x += other.getX()
        this.y += other.getY()
    }

    static randomInteger(a, b) {
        return new Vector2(General.randomInteger(a.getX(), b.getX()), General.randomInteger(a.getY(), b.getY()))
    }
}

export default Vector2
