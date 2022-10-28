import type { Component } from 'solid-js';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import Dropdown from '../src/Dropdown';

import styles from './App.module.css'
import '../src/styles/globals.css'
import '../src/styles/theme.css'
import '../src/styles/classes.css'

import data from '../src/data/Data';

const App: Component = () => {
    return (
        <ThemeProvider theme='light'>
            <NestedComponent />
        </ThemeProvider>
    );
};

const NestedComponent: Component = () => {
    const [themeState, { changeTheme }] = useTheme()

    return (
        <div
            class={`${styles.main} drpdwn padding-m flex-row justify-between`}
            app-theme={`${themeState.theme}`}
        >
            <Dropdown
                data={data}
                clearable
                // block
                size='xs'
                itemSize='m'
                theme={`${themeState.theme}`}
            />
            <label class={styles.switch}>
                <input
                    type='checkbox'
                    onClick={() => changeTheme()}
                />
                <span class={`${styles.slider} ${styles.round}`} />
            </label>
        </div>
    );
};

export default App;
