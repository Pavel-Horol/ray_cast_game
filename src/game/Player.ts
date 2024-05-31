import {DOUBLE_PI} from "./constant";
import Map from "./Map";
export class Player {
    xpos: number
    ypos: number
    angle: number
    mapX: number
    mapY: number
    moveX: number
    moveY: number
    moveAngle: number
    radius: number = 10

    map: Map
    offsetX: number
    offsetY: number
    mapOffsetX: number
    mapOffsetY: number
    mapSpeed: number

    context: CanvasRenderingContext2D
    constructor(
        x:number,
        y: number,
        angle:number,
        mapOffsetX: number,
        mapOffsetY:number,
        mapSpeed: number,
        context: CanvasRenderingContext2D,
        map: Map
    ) {
        this.xpos = x
        this.ypos = y
        this.angle = angle
        this.mapX = mapOffsetX + this.xpos
        this.mapY = mapOffsetY + this.ypos
        this.mapOffsetX = mapOffsetX
        this.mapOffsetY = mapOffsetY

        this.moveX = 0
        this.moveY = 0
        this.moveAngle = 0

        this.offsetX = Math.sin(this.angle) * mapSpeed
        this.offsetY = Math.cos(this.angle) * mapSpeed
        this.mapSpeed = mapSpeed

        this.context = context

        this.map = map

    }

    moveForward() {
        this.moveX = 1
        this.moveY = 1
    }

    moveBackward(){
        this.moveX = -1
        this.moveY = -1
    }

    lookLeft() {
        this.moveAngle = 1
    }

    lookRight() {
        this.moveAngle = -1
    }

    resetMoveXY() {
        this.moveX = 0
        this.moveY = 0
    }

    resetMoveAngle(){
        this.moveAngle = 0
    }

    draw(){
        this.context.fillStyle = "Red"
        this.context.beginPath();
        this.context.arc(this.mapX, this.mapY, this.radius, 0, DOUBLE_PI)
        this.context.fill()
        this.context.closePath()
    }

    drawLookVector(){
        this.context.strokeStyle = 'Yellow'
        this.context.lineWidth = 1
        this.context.beginPath()
        this.context.moveTo(this.mapX, this.mapY)
        this.context.lineTo(
            this.mapX + Math.sin(this.angle) * 50,
            this.mapY + Math.cos(this.angle) * 50
        )
        this.context.stroke()
    }

    updatePosition() {
        this.offsetX = Math.sin(this.angle) * this.mapSpeed;
        this.offsetY = Math.cos(this.angle) * this.mapSpeed;

        let newXpos = this.xpos + this.offsetX * this.moveX;
        let newYpos = this.ypos + this.offsetY * this.moveY;

        if (!this.map.isWalkable(newXpos, this.ypos, this.radius)) {
            newXpos = this.xpos; // если новое X положение не проходимое, остаемся на старом X
        }
        if (!this.map.isWalkable(this.xpos, newYpos, this.radius)) {
            newYpos = this.ypos; // если новое Y положение не проходимое, остаемся на старом Y
        }

        this.xpos = newXpos;
        this.ypos = newYpos;

        if (this.moveAngle) {
            this.angle += 0.03 * this.moveAngle;
        }

        this.mapX = this.mapOffsetX + this.xpos;
        this.mapY = this.mapOffsetY + this.ypos;
    }


}