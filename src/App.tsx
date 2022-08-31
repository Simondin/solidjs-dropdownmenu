import type { Component } from 'solid-js';
import styles from './App.module.css'
import Dropdown from './components/Dropdown';
import { SelectionProvider } from "./context/SelectionContext";
import { ThemeProvider } from "./context/ThemeContext";
import data from './data/Data';

const App: Component = () => {
    return (
        <ThemeProvider color="#335d92" title="Context Example">
            <SelectionProvider data={data}>
                {/* <Select /> */}
                <Dropdown />
            </SelectionProvider>
        </ThemeProvider>
    );
};

export default App;
