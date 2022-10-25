import type { Component } from 'solid-js';
import { SelectionProvider } from './context/SelectionContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Dropdown from './Dropdown';

import styles from './App.module.css'
import './styles/globals.css'
import './styles/theme.css'
import './styles/classes.css'

import data from './data/Data';

const App: Component = () => {
    return (
        <ThemeProvider theme='light'>
            <SelectionProvider data={data ?? []}>
                <NestedComponent />
            </SelectionProvider>
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
