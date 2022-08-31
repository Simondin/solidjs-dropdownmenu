import { Component, createSignal, For, onCleanup, onMount, Show } from "solid-js";
import styles from './Dropdown.module.css'
import { useSelection } from "../../context/SelectionContext";
import DropdownItem from "../DropdownItem";
import { DropdownItemType } from "../../types/DropdownItemType";

const Dropdown: Component = () => {
    const [selectionState, { updateSelection }] = useSelection()
    const [opened, setOpened] = createSignal(false)

    let ref: HTMLUListElement | undefined = undefined;

    const handler = (event: Event) => {
        if (opened() && !ref?.contains(event.target as HTMLElement)) {
            setOpened(false);
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

    function isItemSelected(payload: DropdownItemType) {
        const { all: selections } = selectionState
        const { level, parent } = payload

        if (level === 0) return true

        const parentLevel = level - 1
        const isParentLevelSelected = parentLevel in selections
        const isParentSelected = selections[parentLevel] === parent

        return isParentLevelSelected && isParentSelected
    }

    const message = () => selectionState.current
        ? selectionState.current
        : 'Select'

    return (
        <div class={styles.Dropdown} ref={ref}>
            <button onClick={() => setOpened(! opened())}>{message}</button>
            <div class={styles.DropdownBody}>
                <Show when={opened()}>
                    <For each={Object.values(selectionState.data)}>
                        {it => (
                            <div style={{ float: "left" }}>
                                <For each={Object.values(it)}>
                                    {item => (
                                        <Show when={isItemSelected(item)}>
                                            <DropdownItem data={item} />
                                        </Show>
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                </Show>
            </div>
        </div>

    );
};

export default Dropdown;