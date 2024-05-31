import {useEffect, useRef} from 'react';
import GameWindow from "./gameWindow";

const handleKey = (event: KeyboardEvent) => {

}


export const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if(canvasRef.current){
            const gameWindow = new GameWindow(canvasRef.current)
            const player = gameWindow.player

            document.onkeydown = (event) => {
                console.log(event)
                switch (event.code) {
                    case "KeyS":
                        console.log("back")
                        player.moveBackward()
                        break
                    case "KeyW":
                        player.moveForward()
                        break
                    case "KeyA":
                        player.lookLeft()
                        break
                    case "KeyD":
                        player.lookRight()
                        break
                }
            }

            document.onkeyup = (event) => {
                switch (event.code) {
                    case "KeyS":
                    case "KeyW":
                        player.resetMoveXY()
                        break
                    case "KeyA":
                    case "KeyD":
                        player.resetMoveAngle()
                        break
                }
            }

            window.onload = () => {gameWindow.gameLoop(0)}
        }
    }, [canvasRef]);


    return <canvas ref={canvasRef} id="gameCanvas" width="800" height="600"  >

    </canvas>;
};

