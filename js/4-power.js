class Power {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.powerSize = {
            w: 15,
            h: 15
        }

        this.powerPosition = {


            left: Math.floor(Math.random() * (this.gameSize.w - this.powerSize.w)),
            top: Math.floor(Math.random() * (this.gameSize.h - this.powerSize.h))
        }

        this.init()

    }

    init() {

        this.powerElement = document.createElement('div')

        this.powerElement.style.position = "absolute"
        this.powerElement.style.width = `${this.powerSize.w}px`
        this.powerElement.style.height = `${this.powerSize.h}px`
        this.powerElement.style.left = `${this.powerPosition.left}px`
        this.powerElement.style.top = `${this.powerPosition.top}px`
        this.powerElement.style.backgroundColor = "yellow"

        this.gameScreen.appendChild(this.powerElement)

    }

}




