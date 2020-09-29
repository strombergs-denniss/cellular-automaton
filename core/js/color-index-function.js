import General from "./general.js"

const ColorIndexFunction = {
    NORMAL: (size, position) => {
        return position.getY() * size.getY() + position.getX()
    },
    CLAMP: (size, position) => {
        return General.clamp(position.getY(), 0, size.getY()) * size.getY() + General.clamp(position.getX(), 0, size.getX())
    },
    LOOP: (size, position) => {
        return General.loop(position.getY(), size.getY()) * size.getY() + General.loop(position.getX(), size.getX())
    }
}

export default ColorIndexFunction
