import GameMap from "./Map";
import {map} from "./assets";
import {Player} from "./Player";
import {i} from "vite/dist/node/types.d-aGj9QkWt";

export default class GameWindow {
    private readonly FPS: number = 60;
    private readonly WIDTH: number = 800;
    private readonly HEIGHT: number = 600;
    private readonly HALF_WIDTH: number = this.WIDTH / 2;
    private readonly HALF_HEIGHT: number = this.HEIGHT / 2;



    //camera
    private readonly FOV = Math.PI / 3;
    private readonly HALF_FOV = this.FOV / 2;
    private readonly STEP_ANGLE = this.FOV / this.WIDTH;
    private readonly DOUBLE_PI: number = 2 * Math.PI;
    private readonly bgImage: HTMLImageElement

    canvas: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    cycleDelay: number = 1000 / this.FPS;
    oldCycleTime: number = Date.now();
    cycleCount: number = 0;
    fps_rate: string = "...";
    lastFrameTime: number = 0;

    map: GameMap
    player: Player


    private readonly walls: HTMLImageElement[] = []
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {

        this.canvas = canvas;
        this.context = context;
        this.canvas.height = this.HEIGHT;
        this.canvas.width = this.WIDTH;

        this.bgImage = document.createElement('img')
        this.bgImage.src = 'src/assets/bg.png'

        this.map = new GameMap(this.context)
        this.player = new Player(this.context, this.map.MAP_SPEED, this.map.MAP_SCALE, this.map.MAP_SIZE)

        for(let filename = 0; filename < 3; filename++){
            let image = document.createElement('img')
            image.src = 'src/assets/walls/' + filename + '.png'
            this.walls.push(image)
        }

        this.gameLoop(0);
    }

    public gameLoop = (timestamp: number) => {
        const elapsedTime = timestamp - this.lastFrameTime;
        if (elapsedTime > this.cycleDelay) {
            this.lastFrameTime = timestamp - (elapsedTime % this.cycleDelay);

            this.calcFPS();
            this.updateScreen();
            this.showDebug()

            this.player.updatePosition()


            //ray casting
            let currentAngle = this.player.angle + this.HALF_FOV

            let rayStartX = Math.floor(this.player.x / this.map.MAP_SCALE) * this.map.MAP_SCALE
            let rayStartY = Math.floor(this.player.y / this.map.MAP_SCALE) * this.map.MAP_SCALE

           //loop for cast rays
            for(let ray = 0; ray < this.WIDTH; ray ++){

                let currentSin = Math.sin(currentAngle); currentSin = currentSin ? currentSin : 0.000001
                let currentCos = Math.cos(currentAngle); currentCos = currentCos ? currentCos : 0.000001

                // vertical intersection
                let rayEndX, rayEndY, rayDirectionX, verticalDepth = 0;
                let textureEndY: number
                let textureY: number
                if (currentSin > 0) {
                    rayEndX = rayStartX + this.map.MAP_SCALE
                    rayDirectionX = 1
                }else {
                    rayEndX = rayStartX
                    rayDirectionX = -1
                }
                rayEndY = this.player.y * currentCos
                for(let offset = 0; offset < this.map.MAP_RANGE; offset += this.map.MAP_SCALE){
                    verticalDepth = (rayEndX - this.player.x) / currentSin
                    rayEndY = this.player.y + verticalDepth * currentCos
                    let mapTargetX = Math.floor(rayEndX / this.map.MAP_SCALE)
                    let mapTargetY = Math.floor(rayEndY / this.map.MAP_SCALE)
                    if( currentSin <= 0 ) mapTargetX += rayDirectionX

                    let targetSquare = mapTargetY * this.map.MAP_SIZE + mapTargetX
                    if(targetSquare < 0 || targetSquare > this.map.MAP.length - 1) break
                    if(map[targetSquare] !== 0) {textureY = map[targetSquare]; break }
                    rayEndX += rayDirectionX * this.map.MAP_SCALE

                }
                textureEndY = rayEndY
                // vertical intersection
                let  rayDirectionY, horizontalDepth = 0;
                let textureEndX: number
                let textureX: number
                if (currentCos > 0) { rayEndY = rayStartY + this.map.MAP_SCALE; rayDirectionY = 1 }
                else { rayEndY = rayStartY; rayDirectionY = -1 }

                for(let offset = 0; offset < this.map.MAP_RANGE; offset += this.map.MAP_SCALE){
                    horizontalDepth = (rayEndY - this.player.y) / currentCos
                    rayEndX = this.player.x + horizontalDepth * currentSin
                    let mapTargetX = Math.floor(rayEndX / this.map.MAP_SCALE)
                    let mapTargetY = Math.floor(rayEndY / this.map.MAP_SCALE)
                    if( currentCos <= 0 ) mapTargetY += rayDirectionY

                    let targetSquare = mapTargetY * this.map.MAP_SIZE + mapTargetX
                    if(targetSquare < 0 || targetSquare > this.map.MAP.length - 1) break
                    if(map[targetSquare] !== 0) { textureX = map[targetSquare]; break }
                    rayEndY += rayDirectionY * this.map.MAP_SCALE
                }
                textureEndX = rayEndX
                //render 3d
                let textureOffset = verticalDepth < horizontalDepth ? textureEndY : textureEndX
                textureOffset = Math.floor( textureOffset - Math.floor(textureOffset / this.map.MAP_SCALE) * this.map.MAP_SCALE)

                let depth = verticalDepth < horizontalDepth ? verticalDepth : horizontalDepth
                let wallHeight = Math.min(Math.floor(this.map.MAP_SCALE * 256 / (depth + 0.0001)), 5000)

                let textureImage =  verticalDepth < horizontalDepth ? textureY! : textureX!

                // this.context.fillStyle = verticalDepth < horizontalDepth ? '#aaa' : '#333'
                // this.context.fillRect(this.map.mapOffsetX + ray, this.map.mapOffsetY + (this.HEIGHT / 2 - wallHeight / 2), 1, wallHeight )

                // draw image
                    this.context.drawImage(
                        this.walls[textureImage],
                        textureOffset,
                        0,
                        1,
                        128,
                        this.map.mapOffsetX + ray,
                        this.map.mapOffsetY + (this.HALF_HEIGHT - Math.floor(wallHeight / 2)),
                        1,
                        wallHeight,
                    )

                currentAngle -= this.STEP_ANGLE
            }

            if(this.map.isShow){
                this.map.draw(this.WIDTH, this.HEIGHT)
                this.player.draw(this.map.mapOffsetX, this.map.mapOffsetY)
            }
            this.showFPS();

        }
        requestAnimationFrame(this.gameLoop);
    }


// ---------- game methods -------------

    private updateScreen() {
        this.context.fillStyle = 'Black';
        this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this.context.drawImage(this.bgImage, 0, 0)
    }
    private showFPS() {
        this.context.fillStyle = 'White';
        this.context.font = '12px Monospace';
        this.context.fillText('FPS: ' + this.fps_rate, 10, 20);
    }
    private calcFPS() {
        this.cycleCount++;
        if (this.cycleCount >= 60) this.cycleCount = 0;
        const startTime = Date.now();
        const cycleTime = startTime - this.oldCycleTime;
        this.oldCycleTime = startTime;
        if (this.cycleCount % 60 === 0) this.fps_rate = `${Math.floor(1000 / cycleTime)}`;
    }
    private showDebug() {
        this.context.fillStyle = 'White';
        this.context.font = '12px Monospace';

        const debugInfo = {
            mapOffsetX: this.map.mapOffsetX,
            mapOffsetY: this.map.mapOffsetY,
            playerX: this.player.x,
            playerY: this.player.y,
            playerAngel: this.player.angle,
            playerMapX: this.player.pMapX,
            playerMapY: this.player.pMapY,
            playerOffsetX: this.player.pOffsetX,
            playerOffsetY: this.player.pOffsetY,
            mapTargetX: this.player.mTargetX,
            mapTargetY: this.player.mTargetY,
        };

        let yPosition = 50; // Starting y position for text

        for (const [key, value] of Object.entries(debugInfo)) {
            this.context.fillText(`${key}: ${value}`, 10, yPosition);
            yPosition += 12; // Move to the next line
        }
    }
}
