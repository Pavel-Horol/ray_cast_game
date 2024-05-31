import {map} from "./assets";

export default class Map{
    MAP_SIZE: number = 16
    MAP_SCALE: number = 20
    MAP_RANGE: number = this.MAP_SCALE * this.MAP_SIZE
    MAP_SPEED: number = ( this.MAP_SCALE / 2 ) / 10
                                    // canvas.width
    mapOffsetX: number = Math.floor(800 / 2 - this.MAP_RANGE / 2);
                                    // canvas.height
    mapOffsetY: number = Math.floor( 600 / 2 - this.MAP_RANGE / 2);
    mapTargetX: number = 0
    mapTargetY: number = 0
    MAP: number[][] = map
    context: CanvasRenderingContext2D
    constructor(context: CanvasRenderingContext2D) {
        this.context = context
    }

    isWalkable(x: number, y: number, radius: number) {
        const col = Math.floor((x - radius) / this.MAP_SCALE);
        const row = Math.floor((y - radius) / this.MAP_SCALE);
        const colEnd = Math.floor((x + radius) / this.MAP_SCALE);
        const rowEnd = Math.floor((y + radius) / this.MAP_SCALE);

        if (col < 0 || colEnd >= this.MAP_SIZE || row < 0 || rowEnd >= this.MAP_SIZE) {
            return false;
        }
        for (let r = row; r <= rowEnd; r++) {
            for (let c = col; c <= colEnd; c++) {
                if (this.MAP[r][c] !== 0) {
                    // Проверяем столкновение с непроходимой ячейкой
                    const obstacleX = c * this.MAP_SCALE + this.MAP_SCALE / 2;
                    const obstacleY = r * this.MAP_SCALE + this.MAP_SCALE / 2;
                    const distance = Math.sqrt(Math.pow(obstacleX - x, 2) + Math.pow(obstacleY - y, 2));
                    if (distance <= radius) {
                        return false; // Обнаружено столкновение
                    }
                }
            }
        }

        // Если не было столкновений, вернуть true
        return true;
        }

    draw(){

        for (let row = 0; row < this.MAP.length; row++) {
            for (let column = 0; column < this.MAP[row].length; column++) {
                // let square = row *  this.MAP_SIZE + column
                if (this.MAP[row][column] !== 0) {
                    this.context.fillStyle = 'White';
                } else {
                    this.context.fillStyle = 'Black';
                }
                this.context.fillRect(
                    this.mapOffsetX + column * this.MAP_SCALE,
                    this.mapOffsetY + row * this.MAP_SCALE,
                    this.MAP_SCALE,
                    this.MAP_SCALE
                );
            }
        }
    }
}