import {map} from "./assets";

export class Player {
    x: number
    y: number
    angle: number = Math.PI / 3
    moveX: number = 0
    moveY: number = 0
    moveAngle: number = 0
    radius: number = 10

    constructor(
        private readonly context: CanvasRenderingContext2D,
        private readonly mapSpeed: number,
        private readonly mapScale: number,
        private readonly mapSize: number,
    ) {
        this.x = this.mapScale + 30
        this.y = this.mapScale + 30
    }

    moveForward() { this.moveX = 1; this.moveY = 1; }
    moveBackward(){ this.moveX = -1; this.moveY = -1; }
    lookLeft() { this.moveAngle = 1 }
    lookRight() { this.moveAngle = -1 }
    resetMoveXY() { this.moveX = 0; this.moveY = 0 }
    resetMoveAngle(){ this.moveAngle = 0 }

    draw(mapOffsetX:number, mapOffsetY: number){
        // player
        let playerMapX = this.x + mapOffsetX
        let playerMapY = this.y + mapOffsetY
        this.context.fillStyle = "Red"
        this.context.beginPath();
        this.context.arc(
            playerMapX,
            playerMapY,
            this.radius,
            0,
            Math.PI * 2)
        this.context.fill()
        this.context.closePath()

        // look vector
        this.context.strokeStyle = 'Yellow'
        this.context.lineWidth = 1
        this.context.beginPath()
        this.context.moveTo(playerMapX, playerMapY)
        this.context.lineTo(
            playerMapX + Math.sin(this.angle) * 50,
            playerMapY + Math.cos(this.angle) * 50
        )
        this.context.stroke()
    }

    updatePosition(){
        let playerOffsetX = Math.sin(this.angle) * this.mapSpeed
        let playerOffsetY = Math.cos(this.angle) * this.mapSpeed
        let mapTargetX = Math.floor(this.y / this.mapScale) * this.mapSize + Math.floor((this.x + playerOffsetX * this.moveX) / this.mapScale)
        let mapTargetY = Math.floor(this.x / this.mapScale) * this.mapSize + Math.floor((this.y + playerOffsetY * this.moveY) / this.mapScale)

        if(this.moveX && map[mapTargetX] === 0) this.x += playerOffsetX * this.moveX
        if(this.moveY && map[mapTargetY] === 0) this.y += playerOffsetY * this.moveY
        if(this.moveAngle) this.angle += 0.03 * this.moveAngle

    }
}