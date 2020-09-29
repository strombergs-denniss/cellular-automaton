export default class Loop {
    constructor() {
        this.isRunning = false
        this.currentTime = performance.now()
        this.lastTime = this.currentTime
        this.deltaTime = this.currentTime - this.lastTime
        this.process = () => {}
    }

    getIsRunning() {
        return this.isRunning
    }

    setIsRunning(isRunning) {
        return this.isRunning = isRunning
    }

    getCurrentTime() {
        return this.currentTime
    }

    getLastTime() {
        return this.lastTime
    }

    getDeltaTime() {
        return this.deltaTime
    }

    update() {
        this.currentTime = performance.now()
        this.deltaTime = this.currentTime - this.lastTime
        this.process()
        this.lastTime = this.currentTime
        
        if (this.isRunning) {
            window.requestAnimationFrame(() => this.update())
        }
    }
}
