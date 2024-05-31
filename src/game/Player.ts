export class Player {
    xpos: number
    ypos: number
    angle: number
    mapX: number
    mapY: number
    moveX: number
    moveY: number
    moveAngle: number


    offsetX: number
    offsetY: number
    mapOffsetX: number
    mapOffsetY: number
    mapSpeed: number
    constructor(
        x:number,
        y: number,
        angle:number,
        mapOffsetX: number,
        mapOffsetY:number,
        mapSpeed: number
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

    updatePosition() {

        this.mapX = this.mapOffsetX + this.xpos
        this.mapY = this.mapOffsetY + this.ypos
        this.offsetX = Math.sin(this.angle) * this.mapSpeed
        this.offsetY = Math.cos(this.angle) * this.mapSpeed

        if( this.moveX ) {
            this.xpos += this.offsetX * this.moveX
        }
        if( this.moveY ) {
            this.ypos += this.offsetY * this.moveY
        }
        if ( this.moveAngle ) this.angle += 0.03 * this.moveAngle
    }

    draw_player() {

    }
}