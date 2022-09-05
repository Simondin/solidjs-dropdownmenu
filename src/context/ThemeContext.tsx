import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

export enum ThemeEnum {
    light = 'light',
    dark = 'dark'
}

export type ThemeContextState = {
    readonly theme?: ThemeEnum | string;
}

export type ThemeContextValue = [
    state: ThemeContextState,
    actions: {
        changeTheme: () => void;
    }
];

const defaultState : ThemeContextState = {
    theme: ThemeEnum.light
}

const ThemeContext = createContext<ThemeContextValue>([
    defaultState,
    {
        changeTheme: () => undefined,
    },
]);

export const ThemeProvider: ParentComponent<ThemeContextState> = (props) => {
    const { dark, light } = ThemeEnum
    const [state, setState] = createStore({ theme: props.theme ?? defaultState.theme })

    const changeTheme = () => setState(prev => ({ theme: prev.theme === light ? dark : light}))

    return (
        <ThemeContext.Provider value={[state, { changeTheme }]}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
