class Obstacle {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        this.obstacleSize = {
            w: 35,
            h: 35
        }

        this.obstaclePosition = {

            left: Math.floor(Math.random() * this.gameSize.w - this.obstacleSize.w),
            top: Math.floor(Math.random() * this.gameSize.h - this.obstacleSize.h)
        }

        this.init()

    }


    init() {

        this.obstacleElement = document.createElement('div')

        this.obstacleElement.style.position = "absolute"
        this.obstacleElement.style.width = `${this.obstacleSize.w}px`
        this.obstacleElement.style.height = `${this.obstacleSize.h}px`
        this.obstacleElement.style.left = `${this.obstaclePosition.left}px`
        this.obstacleElement.style.top = `${this.obstaclePosition.top}px`
        this.obstacleElement.style.backgroundColor = "red"

        this.gameScreen.appendChild(this.obstacleElement)

    }



}
