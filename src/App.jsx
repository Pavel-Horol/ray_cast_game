import './App.css';
import { useMemo } from 'react';
import { BlurFilter, TextStyle } from 'pixi.js';
import {Stage, Container, Sprite, Text, render, PixiComponent} from '@pixi/react';
import Pixi from "./Pixi.jsx";

export const App = () => {
    return (
        <div>
            <h1>My Portfolio</h1>
            <Pixi/>
        </div>
    );
};

