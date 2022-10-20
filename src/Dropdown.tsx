import { Component, createSignal, Show } from 'solid-js';
import DropdownSelector from './components/DropdownSelector';
import DropdownMenu from './components/DropdownMenu';
import { SelectionProvider } from "./context/SelectionContext";
import { ThemeEnum } from './context/ThemeContext';

import './styles/globals.css'
import "./styles/theme.css"
import "./styles/classes.css"
import { DataType } from './types/DataType';

interface IDropdownProps {
    data: DataType[]
    theme?: ThemeEnum | string
    block?: boolean
    clearable?: boolean
    size?: string
    placeholder?: string
    itemSize?: string
    style?: object // TODO
}

const Dropdown: Component<IDropdownProps> = (props) => {
    const {
        data,
        block,
        clearable,
        placeholder,
        size,
        itemSize,
    } = props
    const [opened, setOpened] = createSignal(false)

    return (
        <SelectionProvider data={data ?? []}>
            <div class="drpdwn flex-column" app-theme={`${props.theme ?? ThemeEnum.light}`} >
                <DropdownSelector
                    block={block}
                    clearable={clearable}
                    placeholder={placeholder}
                    size={size}
                    setOpened={setOpened}
                    opened={opened}
                />
                <Show when={opened()}>
                    <DropdownMenu
                        itemSize= {itemSize}
                        setOpened={setOpened}
                        opened={opened}
                    />
                </Show>
            </div>
        </SelectionProvider>
    )
}

export default Dropdown;
