import React, { useRef, useEffect } from 'react';
import {Application, Assets, Sprite} from 'pixi.js';

const PixiComponent = () => {
    const pixiContainerRef = useRef(null);
    const appRef = useRef(null);

    async function bootstrap(){
        if(!appRef.current) {
                const app = new Application({
                    height: 600,
                    width: 800,
                });
                const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

                const bunny = new Sprite(texture)

                globalThis.__PIXI_APP__ = app;
                await app.init({ background: '#1099bb' });
                app.stage.addChild(bunny)
                bunny.anchor.set(0.5)
                bunny.x = app.screen.width / 2
                bunny.y = app.screen.height / 2
                if (pixiContainerRef.current && !appRef.current) {
                    pixiContainerRef.current.appendChild(app.canvas);
                    appRef.current = app;
                }
                app.ticker.add(time => {
                    bunny.rotation += 0.05
                })
                return () => {
                    app.destroy(true, { children: true });
                    appRef.current = null;
                };
        }
    }

    useEffect( () => {
        console.log("rendered");
        bootstrap()
    }, []);

    return <div ref={pixiContainerRef} />;
};

export default PixiComponent;
