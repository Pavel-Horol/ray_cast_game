import {map} from "./assets";

export default class GameMap{

    readonly MAP_SIZE: number = 16
    readonly MAP_SCALE: number = 128
    readonly MAP_RANGE: number = this.MAP_SCALE * this.MAP_SIZE
    readonly MAP_SPEED: number = ( this.MAP_SCALE / 2 ) / 10

    mapOffsetX: number = 0
    mapOffsetY: number = 0
    isShow = false

    MAP: number[] = map
    constructor(
        private readonly context: CanvasRenderingContext2D
    ) {}

    toggleShowMap(){
        this.isShow = !this.isShow
    }

    draw(width: number, height: number ){

        this.mapOffsetX = 0 //Math.floor(width / 2) -
        this.mapOffsetY = 0

        for (let row = 0; row < this.MAP_SIZE; row++) {
            for (let col = 0; col < this.MAP_SIZE; col++) {
                let square = row * this.MAP_SIZE + col
                if(this.MAP[square] !== 0){
                    this.context.fillStyle = "#555"
                }else{
                    this.context.fillStyle = "#aaa"
                }
                this.context.fillRect(
                    width - 100 + col * 5,
                    this.mapOffsetY + row * 5,
                    5,
                        5,
                )
            }
        }
    }
}