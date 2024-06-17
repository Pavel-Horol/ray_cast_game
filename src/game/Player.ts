import {map} from "./assets";

export class Player {
    x: number;
    y: number;
    angle: number = Math.PI / 3;
    moveX: number = 0;
    moveY: number = 0;
    moveAngle: number = 0;
    radius: number = 5;

    // for debug
    pMapX: number = 0;
    pMapY: number = 0;
    pOffsetX = 0;
    pOffsetY = 0;
    mTargetX = 0;
    mTargetY = 0;

    constructor(
        private readonly context: CanvasRenderingContext2D,
        private readonly mapSpeed: number,
        private readonly mapScale: number,
        private readonly mapSize: number,
    ) {
        this.x = this.mapScale + 20;
        this.y = this.mapScale + 20;
    }

    moveForward() { this.moveY = 1; }
    moveBackward() { this.moveY = -1; }
    moveRight() { this.moveX = -1; }
    moveLeft() { this.moveX = 1; }
    lookLeft() { this.moveAngle = 1; }
    lookRight() { this.moveAngle = -1; }
    resetMoveAngle() { this.moveAngle = 0; }
    resetMoveX() { this.moveX = 0; }
    resetMoveY() { this.moveY = 0; }

    draw(mapOffsetX: number, mapOffsetY: number) {
        // player
        let playerMapX = (this.x / this.mapScale) * 5 + mapOffsetX + 700;
        let playerMapY = (this.y / this.mapScale) * 5 + mapOffsetY;
        this.pMapX = playerMapX;
        this.pMapY = playerMapY;

        this.context.fillStyle = "Red";
        this.context.beginPath();
        this.context.arc(
            playerMapX,
            playerMapY,
            this.radius,
            0,
            Math.PI * 2
        );
        this.context.fill();
        this.context.closePath();
    }

    updatePosition() {
        let forwardOffsetX = Math.sin(this.angle) * this.mapSpeed * this.moveY;
        let forwardOffsetY = Math.cos(this.angle) * this.mapSpeed * this.moveY;
        let strafeOffsetX = Math.cos(this.angle) * this.mapSpeed * this.moveX * 0.5;
        let strafeOffsetY = -Math.sin(this.angle) * this.mapSpeed * this.moveX * 0.5;

        let newX = this.x + forwardOffsetX + strafeOffsetX ;
        let newY = this.y + forwardOffsetY + strafeOffsetY ;

        let mapTargetX = Math.floor(newY / this.mapScale) * this.mapSize + Math.floor(newX / this.mapScale);
        let mapTargetY = Math.floor(newX / this.mapScale) * this.mapSize + Math.floor(newY / this.mapScale);

        this.pOffsetX = forwardOffsetX + strafeOffsetX;
        this.pOffsetY = forwardOffsetY + strafeOffsetY;
        this.mTargetX = mapTargetX;
        this.mTargetY = mapTargetY;

        let newPosX = this.x + forwardOffsetX;
        let newPosY = this.y + forwardOffsetY;
        let mapPosX = Math.floor(newPosX / this.mapScale);
        let mapPosY = Math.floor(newPosY / this.mapScale);

        if (map[mapPosY * this.mapSize + mapPosX] === 0) {
            this.x = newPosX;
            this.y = newPosY;
        } else {
            if (map[Math.floor((this.y + forwardOffsetY) / this.mapScale) * this.mapSize + Math.floor(this.x / this.mapScale)] === 0) {
                this.y += forwardOffsetY;
            }
            if (map[Math.floor(this.y / this.mapScale) * this.mapSize + Math.floor((this.x + forwardOffsetX) / this.mapScale)] === 0) {
                this.x += forwardOffsetX;
            }
        }

        newPosX = this.x + strafeOffsetX;
        newPosY = this.y + strafeOffsetY;
        mapPosX = Math.floor(newPosX / this.mapScale);
        mapPosY = Math.floor(newPosY / this.mapScale);

        if (map[mapPosY * this.mapSize + mapPosX] === 0) {
            this.x = newPosX;
            this.y = newPosY;
        } else {
            if (map[Math.floor((this.y + strafeOffsetY) / this.mapScale) * this.mapSize + Math.floor(this.x / this.mapScale)] === 0) {
                this.y += strafeOffsetY;
            }
            if (map[Math.floor(this.y / this.mapScale) * this.mapSize + Math.floor((this.x + strafeOffsetX) / this.mapScale)] === 0) {
                this.x += strafeOffsetX;
            }
        }

        if (this.moveAngle) {
            this.angle += 0.03 * this.moveAngle;
        }
    }
}
