import { VERTEX_SHADER, FRAGMENT_SHADER } from "./program.js"
import { ColorFormat } from "./core.js"

class Renderer {
    constructor(canvas, width, height, colors, colorFormat) {
        this.canvas = canvas
        this.gl = canvas.gl
        this.width = width
        this.height = height
        this.colors = colors
        this.colorFormat = colorFormat == ColorFormat.LUMINANCE ? this.gl.LUMINANCE : this.gl.RGB;
        this.setup()
    }

    createShader(shaderType, shaderSource) {
        let shader = this.gl.createShader(shaderType)
        this.gl.shaderSource(shader, shaderSource)
        this.gl.compileShader(shader)
    
        if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return shader
        }
    
        console.error(this.gl.getShaderInfoLog(shader))
        this.gl.deleteShader(shader)
    }
    
    createProgram(vertexShaderSource, fragmentShaderSource) {
        let vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource)
        let fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    
        if (vertexShader && fragmentShader) {
            let program = this.gl.createProgram()
            this.gl.attachShader(program, vertexShader)
            this.gl.attachShader(program, fragmentShader)
            this.gl.linkProgram(program)
            this.gl.detachShader(program, vertexShader)
            this.gl.detachShader(program, fragmentShader)
            this.gl.deleteShader(vertexShader)
            this.gl.deleteShader(fragmentShader)
    
            if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                return program
            }
    
            console.log(this.gl.getProgramInfoLog(program))
            this.gl.deleteProgram(program)
        }
    }

    setup() {
        let program = this.createProgram(VERTEX_SHADER, FRAGMENT_SHADER)
        let positionAttribute = this.gl.getAttribLocation(program, "a_Position")
        let textureCoordinateAttribute = this.gl.getAttribLocation(program, "a_TextureCoordinate")
        let projectionUniform = this.gl.getUniformLocation(program, "u_Projection")
        this.viewUniform = this.gl.getUniformLocation(program, "u_View")
        this.modelUniform = this.gl.getUniformLocation(program, "u_Model")
        this.textureUniform = this.gl.getUniformLocation(program, "u_Texture")

        this.backgroundColor = [Math.random(), Math.random(), Math.random(), 1]

        this.movementSpeed = 10
        this.zoomSpeed = 10
        this.zoom = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width

        let positions = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0]
        let textureCoordinates = [0, 1, 0, 0, 1, 1, 1, 0]
        this.model = new Float32Array([this.zoom, 0, 0, 0, 0, this.zoom, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        this.color = [1, 1, 1, 1]

        let projection = new Float32Array([-2 / this.canvas.width, 0, 0, 0, 0, -2 / this.canvas.height, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        this.view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])

        let positionBuffer = this.gl.createBuffer()
        this.gl.useProgram(program)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW)
        this.gl.enableVertexAttribArray(positionAttribute)
        this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0)

        let textureCoordinateBuffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordinateBuffer)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), this.gl.DYNAMIC_DRAW)
        this.gl.enableVertexAttribArray(textureCoordinateAttribute)
        this.gl.vertexAttribPointer(textureCoordinateAttribute, 2, this.gl.FLOAT, false, 0, 0)
        this.gl.uniformMatrix4fv(projectionUniform, false, projection)

        let texture = this.gl.createTexture()
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.colorFormat, this.width, this.height, 0, this.colorFormat, this.gl.UNSIGNED_BYTE, this.colors)
    }

    update() {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        this.gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], this.backgroundColor[3])
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)

    
        this.gl.uniformMatrix4fv(this.viewUniform, false, this.view)
        this.gl.uniformMatrix4fv(this.modelUniform, false, this.model)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.colorFormat, this.width, this.height, 0, this.colorFormat, this.gl.UNSIGNED_BYTE, this.colors)
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4)
    }
}

export default Renderer
