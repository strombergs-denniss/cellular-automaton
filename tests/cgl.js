import CA from "../core/ca.js"
import Utility from "../core/utility.js"

class CGL extends CA {
    constructor(width, height) {
        super(width, height)
    }

    randomize() {
        for (let a = 0; a < this.width * this.height * 3; a += 3) {
            let val = Math.random() > 0.5 ? 255 : 0;
            this.colors[a] = val;
            this.colors[a + 1] = val;
            this.colors[a + 2] = val;
        }
    }

    setup() {
        this.randomize();
    }

    update() {
        for (let a = 0; a < this.width * this.height; a++) {
            let b = this.width * this.height;

            let neighbourCount =
                (this.colors[(a - 1) % b * 3] == 255) +
                (this.colors[(a + 1) % b * 3] == 255) +
                (this.colors[(a + this.width) % b * 3] == 255) +
                (this.colors[(a - this.width) % b * 3] == 255) +
                (this.colors[(a + this.width - 1) % b * 3] == 255) +
                (this.colors[(a + this.width + 1) % b * 3] == 255) +
                (this.colors[(a - this.width - 1) % b * 3] == 255) +
                (this.colors[(a - this.width + 1) % b * 3] == 255);


            if (this.colors[a * 3] == 0) {
                if (neighbourCount == 3) {
                    this.colors[a * 3 + 1] = 255;
                }
            }

            if (this.colors[a * 3] == 255) {
                if (neighbourCount < 2 || neighbourCount > 3) {
                    this.colors[a * 3 + 1] = 0;
                }
            }
        }

        for (let a = 0; a < this.width * this.height; a++) {
            this.colors[a * 3] = this.colors[a * 3 + 1];
            this.colors[a * 3 + 2] = this.colors[a * 3 + 1];
        }
    }
}

export default CGL