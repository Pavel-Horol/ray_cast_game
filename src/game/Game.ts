import GameMap from "./Map";
import {map} from "./assets";
import {Player} from "./Player";

export default class GameWindow {
    private readonly FPS: number = 60;
    private readonly WIDTH: number = 800;
    private readonly HEIGHT: number = 600;
    private readonly HALF_WIDTH: number = this.WIDTH / 2;
    private readonly HALF_HEIGHT: number = this.HEIGHT / 2;



    //camera
    private readonly FOV = Math.PI / 3;
    private readonly HALF_FOV = this.FOV / 2;
    private readonly STEP_ANGLE = this.FOV / 2;
    private readonly DOUBLE_PI: number = 2 * Math.PI;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    cycleDelay: number = 1000 / this.FPS;
    oldCycleTime: number = Date.now();
    cycleCount: number = 0;
    fps_rate: string = "...";
    lastFrameTime: number = 0;

    map: GameMap
    player: Player
    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.context = context;
        this.canvas.height = this.HEIGHT;
        this.canvas.width = this.WIDTH;

        this.map = new GameMap(this.context)
        this.player = new Player(this.context, this.map.MAP_SPEED, this.map.MAP_SCALE, this.map.MAP_SIZE)

        this.gameLoop(0);
    }

    public gameLoop = (timestamp: number) => {
        const elapsedTime = timestamp - this.lastFrameTime;
        if (elapsedTime > this.cycleDelay) {
            this.lastFrameTime = timestamp - (elapsedTime % this.cycleDelay);

            this.calcFPS();
            this.updateScreen();
            this.showDebug()

            this.map.draw(this.WIDTH, this.HEIGHT)
            this.player.draw(this.map.mapOffsetX, this.map.mapOffsetY)
            this.player.updatePosition()

            this.showFPS();
        }
        requestAnimationFrame(this.gameLoop);
    }


// ---------- game methods -------------

    private updateScreen() {
        this.context.fillStyle = 'Black';
        this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
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
