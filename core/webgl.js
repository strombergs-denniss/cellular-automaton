class WebGL {
    constructor(gl) {
        this.gl = gl;
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
}

export default WebGL;
