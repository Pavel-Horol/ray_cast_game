export default class GameWindow {
    width: number;
    height: number;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    // FPS
    FPS: number;
    cycleDelay: number;
    oldCycleTime: number;
    cycleCount: number;
    fps_rate: string;
    lastFrameTime: number;

    // Screen dimensions
    WIDTH: number;
    HALF_WIDTH: number;
    HEIGHT: number;
    HALF_HEIGHT: number;

    //map
    MAP_SIZE: number
    MAP_SCALE: number
    MAP_RANGE: number
    MAP_SPEED: number

    MAP: number[][]
    constructor(canvas: HTMLCanvasElement) {
        this.width = canvas.width;
        this.height = canvas.height

        // Main canvas
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        // FPS settings
        this.FPS = 60;
        this.cycleDelay = Math.floor(1000 / this.FPS);
        this.oldCycleTime = Date.now();
        this.cycleCount = 0;
        this.fps_rate = '...';
        this.lastFrameTime = 0;

        // Screen dimensions
        this.WIDTH = 800;
        this.HALF_WIDTH = this.WIDTH / 2;
        this.HEIGHT = 600;
        this.HALF_HEIGHT = this.HEIGHT / 2;

        //map
        this.MAP_SIZE = 16
        this.MAP_SCALE = 10
        this.MAP_RANGE = this.MAP_SCALE * this.MAP_SIZE
        this.MAP_SPEED = (this.MAP_SCALE / 2) / 10

        this.MAP = [
//           1  2  3  4  5  6  6  8  9  10 11 12 13 14 15 16
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 1
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 2
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 3
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 4
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 5
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 6
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 7
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 8
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 9
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1], // 10
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 11
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 12
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 13
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 14
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // 15
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 16
        ]
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

        // Calculate FPS
        this.cycleCount++;
        if (this.cycleCount >= 60) this.cycleCount = 0;
        let startTime = Date.now();
        let cycleTime = startTime - this.oldCycleTime;
        this.oldCycleTime = startTime;
        if (this.cycleCount % 60 === 0) {
            this.fps_rate = Math.floor(1000 / cycleTime).toString();
        }

        // Resize canvas
        this.canvas.width = this.width
        this.canvas.height = this.height

        if (this.context) {
            // Update screen
            this.context.fillStyle = 'Black';
            this.context.fillRect(this.canvas.width / 2 - this.HALF_WIDTH, this.canvas.height / 2 - this.HALF_HEIGHT, this.WIDTH, this.HEIGHT);

            // Render FPS to screen
            this.context.fillStyle = 'White';
            this.context.font = '10px Monospace';
            this.context.fillText('FPS: ' + this.fps_rate, 0, 20);

            //draw map
            this.draw_map()
        }
        

        // Infinite loop
        requestAnimationFrame(this.gameLoop);
    }
    private draw_map(){
        if(!this.context) return
        for (let row = 0; row < this.MAP.length; row++) {
            for (let column = 0; column < this.MAP[row].length; column++) {
                // let square = row *  this.MAP_SIZE + column
                if (this.MAP[row][column] !== 0) {
                    this.context.fillStyle = 'White';
                } else {
                    this.context.fillStyle = 'Black';
                }
                this.context.fillRect(
                    Math.floor(this.canvas.width / 2 - this.MAP_RANGE / 2) + column * this.MAP_SCALE,
                    Math.floor(this.canvas.height / 2 - this.MAP_RANGE / 2) + row * this.MAP_SCALE,
                    this.MAP_SCALE,
                    this.MAP_SCALE
                );
            }
        }
    }
}