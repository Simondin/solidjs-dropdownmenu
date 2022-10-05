import { Component, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import styles from './Dropdown.module.css'
import { useSelection } from "../../context/SelectionContext";
import { useTheme } from "../../context/ThemeContext";
import DropdownItem from "../DropdownItem";
import { DropdownItemType } from "../../types/DropdownItemType";
import Clear from "../Clear";
import Expand from "../Expand";
import { Sizes } from "../../types/SizeEnum";
import { PropAliases } from "solid-js/web";

interface IDropdownProps {
    block?: boolean,
    clearable?: boolean
    size?: string
    itemSize?: string
    placeholder?: string
    style?: object
}

function getComponentSize(size: Sizes | string | undefined, defaultSize: Sizes) {
    return size && (size in Sizes || Object.values(Sizes).includes(size as Sizes))
        ? size
        : defaultSize
}

const Dropdown: Component<IDropdownProps> = ({ block, clearable, placeholder, size, itemSize, style }) => {
    const [selectionState, { clearSelections }] = useSelection()
    const [ themeState ] = useTheme()
    const [opened, setOpened] = createSignal(false)


    const groupItemSize = getComponentSize(itemSize, Sizes.MEDIUM)
    const dropdownSize = getComponentSize(size, Sizes.MEDIUM)

    let parentRef: HTMLElement | undefined = undefined;
    let childRef: HTMLElement | undefined = undefined;
    let clearRef: HTMLElement | undefined = undefined;

    const handler = (event: Event) => {
        switch (true) {
            case event.target === clearRef:
                return
            case parentRef?.contains(event.target as HTMLElement):
                setOpened(!opened())
                break

            case opened() && !childRef?.contains(event.target as HTMLElement):
                setOpened(false);
                break
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
    })

    onCleanup(() => {
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
    })

    function isGroupSelected(payload: DropdownItemType) {
        const { all: selections } = selectionState
        const { level, parent } = payload

        if (level === 0) return true

        const parentLevel = level - 1
        const isParentLevelSelected = parentLevel in selections
        const isParentSelected = selections[parentLevel] === parent

        return isParentLevelSelected && isParentSelected
    }

    function isItemSelected(payload: DropdownItemType) {
        const { all: selections } = selectionState
        const { level, key } = payload

        return level in selections && selections[level] === key
    }

    const message = () => selectionState.current
        ? selectionState.current
        : placeholder ?? 'Select'

    return (
        <div class="std" app-theme={`${themeState.theme}`} style={style}>
            <div
                class={styles.Dropdown}
                ref={parentRef}
            >
                <div class={styles.DropdownHeader}>
                    <div
                        class={`${styles.DropdownBtn} ${styles['DropdownSize_' + dropdownSize]}`}
                        classList={{
                            [styles.Block]: block,
                        }}
                    >
                        <span
                            class={styles.DropdownBtnLabel}
                            classList={{
                                [styles.Selected]: Boolean(selectionState.current),
                            }}
                        >
                            {message}
                        </span>
                        <div class="flex-row align-center justify-between">
                            <Show when={clearable && selectionState.current}>
                                <Clear
                                    ref={clearRef}
                                    onClick={() => clearSelections()}
                                />
                            </Show>
                            <Expand size="m"/>
                        </div>
                    </div>
                </div>
            </div>
            <Show when={opened()}>
                <div
                    class={styles.DropdownBody}
                    ref={childRef}
                >
                    <For each={Object.values(selectionState.data)}>
                        {it => (
                            <div
                                class={`${styles.DropdownBodyGroup} ${styles['GroupSize_' + groupItemSize]}`}
                                group-size={groupItemSize}
                            >
                                <For each={Object.values(it)}>
                                    {item => (
                                        <Show when={isGroupSelected(item)}>
                                            <DropdownItem data={item} selected={isItemSelected(item)}/>
                                        </Show>
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default Dropdown;