class Obstacle {

    constructor(gameScreen, gameSize, obstacle) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.obstacle = obstacle

        this.obstacleSize = {
            w: 75,
            h: 50
        }

        this.obstaclePosition = {

            left: Math.floor(Math.random() * (this.gameSize.w - (2 * this.obstacleSize.w))),
            top: Math.floor(Math.random() * (this.gameSize.h - (2 * this.obstacleSize.h)))

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
        this.obstacleElement.style.backgroundColor = "orange"

        this.gameScreen.appendChild(this.obstacleElement)

    }

}
