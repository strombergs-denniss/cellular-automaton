import WebGL from "./webgl.js"
import Input from "./input.js"
import Test from "../tests/test.js"

let canvas = document.createElement("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

let gl = canvas.getContext("webgl")

let webGL = new WebGL(gl);

let vertexShaderSource = `precision mediump float;
attribute vec3 a_Position;
attribute vec2 a_TextureCoordinate;
uniform mat4 u_Projection;
uniform mat4 u_View;
uniform mat4 u_Model;
varying vec2 v_TextureCoordinate;

void main(void) {
    gl_Position = u_Projection * u_View * u_Model * vec4(a_Position, 1);
    v_TextureCoordinate = a_TextureCoordinate;
}
`

let fragmentShaderSource = `precision mediump float;
uniform sampler2D u_Texture;
varying vec2 v_TextureCoordinate;

void main(void) {
    gl_FragColor = texture2D(u_Texture, v_TextureCoordinate);
}
`

let program = webGL.createProgram(vertexShaderSource, fragmentShaderSource)
let positionAttribute = gl.getAttribLocation(program, "a_Position")
let textureCoordinateAttribute = gl.getAttribLocation(program, "a_TextureCoordinate")
let projectionUniform = gl.getUniformLocation(program, "u_Projection")
let viewUniform = gl.getUniformLocation(program, "u_View")
let modelUniform = gl.getUniformLocation(program, "u_Model")
let textureUniform = gl.getUniformLocation(program, "u_Texture")

let backgroundColor = [0, 0, 0, 1]

let movementSpeed = 10
let zoomSpeed = 10
let width = canvas.clientWidth
let height = canvas.clientHeight
let zoom = width > height ? height : width

let positions = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0]
let textureCoordinates = [0, 1, 0, 0, 1, 1, 1, 0]
let model = new Float32Array([zoom, 0, 0, 0, 0, zoom, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
let color = [1, 1, 1, 1]



let projection = new Float32Array([-2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
let view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

let frameRate = 1000 / 60

let test = new Test();
test.ca.setup();

let positionBuffer = gl.createBuffer()
gl.useProgram(program)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
gl.enableVertexAttribArray(positionAttribute)
gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0)

let textureCoordinateBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.DYNAMIC_DRAW)
gl.enableVertexAttribArray(textureCoordinateAttribute)
gl.vertexAttribPointer(textureCoordinateAttribute, 2, gl.FLOAT, false, 0, 0)
gl.uniformMatrix4fv(projectionUniform, false, projection)

let texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, test.ca.width, test.ca.height, 0, gl.RGB, gl.UNSIGNED_BYTE, test.ca.colors)

let input = new Input(canvas)

function render() {
    if (input.keys["a"]) {
        view[12] -= movementSpeed
    }

    if (input.keys["d"]) {
        view[12] += movementSpeed
    }

    if (input.keys["s"]) {
        view[13] -= movementSpeed
    }

    if (input.keys["w"]) {
        view[13] += movementSpeed
    }

    if (input.keys["q"]) {
        model[0] -= zoomSpeed
        model[5] -= zoomSpeed
    }

    if (input.keys["e"]) {
        model[0] += zoomSpeed
        model[5] += zoomSpeed
    }

    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight)
    gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniformMatrix4fv(viewUniform, false, view)
    gl.uniformMatrix4fv(modelUniform, false, model)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, test.ca.width, test.ca.height, 0, gl.RGB, gl.UNSIGNED_BYTE, test.ca.colors)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

setInterval(render, frameRate)
setInterval(() => {
    test.ca.update()
}, frameRate)
