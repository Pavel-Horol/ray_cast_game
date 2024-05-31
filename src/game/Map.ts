import {map} from "./assets";

export default class GameMap{

    readonly MAP_SIZE: number = 16
    readonly MAP_SCALE: number = 20
    readonly MAP_RANGE: number = this.MAP_SCALE * this.MAP_SIZE
    readonly MAP_SPEED: number = ( this.MAP_SCALE / 2 ) / 10

    mapOffsetX: number = 0
    mapOffsetY: number = 0


    MAP: number[] = map
    constructor(
        private readonly context: CanvasRenderingContext2D
    ) {}



    draw(width: number, height: number ){
        this.mapOffsetX = Math.floor(width / 2 - this.MAP_RANGE / 2)
        this.mapOffsetY = Math.floor(height / 2 - this.MAP_RANGE / 2)

        for (let row = 0; row < this.MAP_SIZE; row++) {
            for (let col = 0; col < this.MAP_SIZE; col++) {
                let square = row * this.MAP_SIZE + col
                if(this.MAP[square] !== 0){
                    this.context.fillStyle = "#555"
                }else{
                    this.context.fillStyle = "#aaa"
                }
                this.context.fillRect(
                    Math.floor(width / 2 - this.MAP_RANGE / 2) + col * this.MAP_SCALE,
                    Math.floor(height / 2 - this.MAP_RANGE / 2) + row * this.MAP_SCALE,
                    this.MAP_SCALE,
                    this.MAP_SCALE
                )
            }
        }
    }
}