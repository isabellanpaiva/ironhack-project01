class Cookie {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.cookieSize = {
            w: 25,
            h: 25
        }

        this.cookiePosition = {

            left: Math.floor(Math.random() * (this.gameSize.w - this.cookieSize.w)),
            top: Math.floor(Math.random() * (this.gameSize.h - this.cookieSize.h))
        }

        this.init()

    }


    init() {

        this.cookieElement = document.createElement('div')

        this.cookieElement.style.position = "absolute"
        this.cookieElement.style.width = `${this.cookieSize.w}px`
        this.cookieElement.style.height = `${this.cookieSize.h}px`
        this.cookieElement.style.left = `${this.cookiePosition.left}px`
        this.cookieElement.style.top = `${this.cookiePosition.top}px`
        this.cookieElement.style.backgroundColor = "blue"

        this.gameScreen.appendChild(this.cookieElement)

    }



}
