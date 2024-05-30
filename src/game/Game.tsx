import React, {useEffect, useRef} from 'react';
import GameWindow from "./gameWindow";

export const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if(canvasRef.current){
            const gameWindow = new GameWindow(canvasRef.current)
            window.onload = () => {gameWindow.gameLoop(0)}
        }
    }, []);


    return <canvas ref={canvasRef} id="gameCanvas" width="800" height="600"  >

    </canvas>;
};

