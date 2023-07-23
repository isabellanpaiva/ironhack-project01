class Power {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.powerSize = {
            w: 35,
            h: 35
        }

        this.powerPosition = {
            left: 100,
            top: 100
        }

        this.init()

        this.powerCounter = 0

    }

    // [QUESTION: CAN WE REPLACE LEFT AND TOP PROPERTIES FOR HORIZONTAL AND VERTICAL?]


    init() {

        this.powerElement = document.createElement('div')

        this.powerElement.style.position = "absolute"
        this.powerElement.style.width = `${this.powerSize.w}px`
        this.powerElement.style.height = `${this.powerSize.h}px`
        this.powerElement.style.left = `${this.powerPosition.left}px`
        this.powerElement.style.top = `${this.powerPosition.top}px`
        this.powerElement.style.backgroundColor = "green"

        this.gameScreen.appendChild(this.powerElement)

    }

    generateRandomPowerPosition() {

        const maxLeft = this.gameSize.w - this.powerSize.w;
        const maxTop = this.gameSize.h - this.powerSize.h;

        this.powerPosition.left = Math.floor(Math.random() * maxLeft);
        this.powerPosition.top = Math.floor(Math.random() * maxTop);

        this.updatePowerPosition()

        this.increasePowerCounter()

    }

    updatePowerPosition() {
        this.powerElement.style.left = `${this.powerPosition.left}px`
        this.powerElement.style.top = `${this.powerPosition.top}px`
    }

    increasePowerCounter() {

        this.powerCounter++
        console.log(this.powerCounter)

    }

}




