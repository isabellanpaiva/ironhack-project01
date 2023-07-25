class Message {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.messagesSize = {
            w: 500,
            h: 250
        }

        this.messagesPosition = {
            left: (gameSize.w - this.messagesSize.w) / 2,
            top: (gameSize.h - this.messagesSize.h) / 2
        }

        this.init()

    }

    init() {

        this.messagesElement = document.createElement('div')

        this.messagesElement.style.position = "absolute"
        this.messagesElement.style.width = `${this.messagesSize.w}px`
        this.messagesElement.style.height = `${this.messagesSize.h}px`
        this.messagesElement.style.left = `${this.messagesPosition.left}px`
        this.messagesElement.style.top = `${this.messagesPosition.top}px`
        this.messagesElement.style.backgroundColor = "lightgray"

        this.gameScreen.appendChild(this.messagesElement)

    }

}