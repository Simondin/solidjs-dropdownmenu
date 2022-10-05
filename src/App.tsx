import type { Component } from 'solid-js';
import Dropdown from './components/Dropdown';
import { useTheme } from "./context/ThemeContext";
import styles from './App.module.css'

import './styles/globals.css'
import "./styles/theme.css"
import "./styles/classes.css"

const App: Component = () => {
    const [themeState, {changeTheme}] = useTheme()
    return (
        <div
            class={`${styles.main} std padding-m flex-row justify-between`}
            app-theme={`${themeState.theme}`}
        >
            <Dropdown
                clearable
                // block
                size="xs"
                itemSize="s"
            />
            <label class={styles.switch}>
                <input
                    type="checkbox"
                    onClick={() => changeTheme()}
                />
                <span class={`${styles.slider} ${styles.round}`} />
            </label>
        </div>
    );
};

export default App;
