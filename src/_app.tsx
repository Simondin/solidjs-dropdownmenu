import type { Component } from 'solid-js';
import { SelectionProvider } from "./context/SelectionContext";
import { ThemeProvider } from "./context/ThemeContext";
import App from './App'

import './styles/globals.css'
import "./styles/theme.css"
import "./styles/classes.css"

import data from './data/Data';

const _App: Component = () => {
    return (
        <ThemeProvider theme='light'>
            <SelectionProvider data={data}>
                <App />
            </SelectionProvider>
        </ThemeProvider>
    );
};

export default _App;
