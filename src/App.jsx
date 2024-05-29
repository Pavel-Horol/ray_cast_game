import './App.css';
import { useMemo } from 'react';

import { BlurFilter, TextStyle } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';

export const App = () => {
    const blurFilter = useMemo(() => new BlurFilter(2), []);
    const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
    return (
        <Stage x={800} y={600} options={{ background: 0x1099bb }}>
            <Sprite image={bunnyUrl} x={300} y={150} />
            <Sprite image={bunnyUrl} x={500} y={150} />
            <Sprite image={bunnyUrl} x={400} y={200} />

            <Container x={200} y={200}>
            </Container>
        </Stage>
    );
};