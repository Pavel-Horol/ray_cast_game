import { useEffect, useRef, useState } from 'react';
import Game from "./Game";

export const GameWindow = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isContextAble, setIsContextAble] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                setIsContextAble(true);
                const gameWindow = new Game(canvas, context);
                const player = gameWindow.player;

                const handleKeyDown = (event: KeyboardEvent) => {
                    console.log(event.code)
                    switch (event.code) {
                        case 'KeyS':
                            player.moveBackward();
                            break;
                        case 'KeyW':
                            player.moveForward();
                            break;
                        case 'KeyA':
                            player.lookLeft();
                            break;
                        case 'KeyD':
                            player.lookRight();
                            break;
                        case 'KeyM':
                            gameWindow.map.toggleShowMap()
                            break;
                    }
                };
                const handleKeyUp   = (event: KeyboardEvent) => {
                    switch (event.code) {
                        case 'KeyS':
                        case 'KeyW':
                            player.resetMoveXY();
                            break;
                        case 'KeyD':
                        case 'KeyA':
                            player.resetMoveAngle();
                            break;
                    }
                };
                document.onkeydown = handleKeyDown
                document.onkeyup = handleKeyUp

                window.onload = () => {
                    gameWindow.gameLoop(0);
                };
/*
                return () => {
                    document.removeEventListener('keydown', handleKeyDown);
                    document.removeEventListener('keyup', handleKeyUp);
                };

 */
            } else {
                setIsContextAble(false);
            }
        } else {
            setIsContextAble(false);
        }
    }, []);

    return (
        isContextAble ? (
            <canvas ref={canvasRef} id="gameCanvas" width="800" height="600" />
        ) : (
            <div>Sorry something went wrong</div>
        )
    );
};
