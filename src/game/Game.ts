import {Player} from "./Player";
import Map from "./Map";

export default class GameWindow {

    private readonly FPS: number = 60;
    private readonly WIDTH: number = 800;
    private readonly HEIGHT: number = 600;
    private readonly HALF_WIDTH: number = this.WIDTH / 2;
    private readonly HALF_HEIGHT: number = this.HEIGHT / 2;
    private readonly DOUBLE_Pi: number = 2 * Math.PI;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    // FPS
    cycleDelay: number;
    oldCycleTime: number;
    cycleCount: number;
    fps_rate: string;
    lastFrameTime: number;


    //map
    map: Map
    //player
    player: Player

    DOUBLE_PI: number
    constructor(canvas: HTMLCanvasElement, context:CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context

        // Main canvas

        // FPS settings
        this.FPS = 60;
        this.cycleDelay = Math.floor(1000 / this.FPS);
        this.oldCycleTime = Date.now();
        this.cycleCount = 0;
        this.fps_rate = '...';
        this.lastFrameTime = 0;

        //map

        this.map = new Map(this.context)
        this.player = new Player(
            this.map.MAP_SCALE + 20,
            this.map.MAP_SCALE + 20,
            Math.PI / 3,
            this.map.mapOffsetX,
            this.map.mapOffsetY,
            this.map.MAP_SPEED,
            this.context,
            this.map
        )

        //camera
        this.DOUBLE_PI = 2 * Math.PI
        // Initialize game loop
        this.gameLoop(0);
    }
    //game loop
    public gameLoop = (timestamp: number) => {

        if (timestamp < this.lastFrameTime + this.cycleDelay) {
            requestAnimationFrame(this.gameLoop);
            return;
        }
        this.lastFrameTime = timestamp;

        this.calcFPS()


        this.update_screen()
        this.map.draw()

        this.player.draw()
        this.player.drawLookVector()
        this.player.updatePosition()

        this.showFPS()
        requestAnimationFrame(this.gameLoop);
    }

    private update_screen(){
        if(!this.context) return
        this.context.fillStyle = 'Black';
        this.context.fillRect(this.canvas.width / 2 - this.HALF_WIDTH, this.canvas.height / 2 - this.HALF_HEIGHT, this.WIDTH, this.HEIGHT);
    }

    private showFPS(){
        this.context.fillStyle = 'White';
        this.context.font = '10px Monospace';
        this.context.fillText('FPS: ' + this.fps_rate, 0, 20);
    }

    private calcFPS (){
        this.cycleCount++;
        if (this.cycleCount >= 60) this.cycleCount = 0;
        let startTime = Date.now();
        let cycleTime = startTime - this.oldCycleTime;
        this.oldCycleTime = startTime;
        if (this.cycleCount % 60 === 0) {
            this.fps_rate = Math.floor(1000 / cycleTime).toString();
        }
    }
}