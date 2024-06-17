import { useEffect, useRef, useState } from 'react';
import Game from "./Game";

export const GameWindow = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isContextAble, setIsContextAble] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current! as HTMLCanvasElement;
        const context = canvas.getContext('2d')! as CanvasRenderingContext2D;
        setIsContextAble(true);
        const gameWindow = new Game(canvas, context);
        const player = gameWindow.player;

        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event.code);
            switch (event.code) {
                case 'KeyS':
                    player.moveBackward();
                    break;
                case 'KeyW':
                    player.moveForward();
                    break;
                case 'KeyD':
                    player.moveRight();
                    break;
                case 'KeyA':
                    player.moveLeft();
                    break;
                case 'ArrowLeft':
                    player.lookLeft();
                    break;
                case 'ArrowRight':
                    player.lookRight();
                    break;
                case 'KeyM':
                    gameWindow.map.toggleShowMap();
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'KeyS':
                case 'KeyW':
                    player.resetMoveY();
                    break;
                case 'ArrowRight':
                case 'ArrowLeft':
                    player.resetMoveAngle();
                    break;
                case 'KeyD':
                case 'KeyA':
                    player.resetMoveX();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Запуск игровой петли
        gameWindow.gameLoop(0);

        // Очистка обработчиков событий при размонтировании компонента
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        isContextAble ? (
            <>
                <canvas ref={canvasRef} id="gameCanvas" width="800" height="600"/>
                <p>W,A,S,D - move, Left, Right arrows to look around</p>
            </>
        ) : (
            <div>Sorry, something went wrong</div>
        )
    );
};
