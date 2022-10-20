import styles from './DropdownSelector.module.css'
import { Accessor, Component, onCleanup, onMount, Show } from "solid-js";
import { useSelection } from "../../context/SelectionContext";
import Clear from "../Clear";
import Expand from "../Expand";
import { getComponentSize, Sizes } from "../../types/SizeEnum";

interface IDropdownSelectorProps {
    block?: boolean
    clearable?: boolean
    size?: string
    placeholder?: string
    opened: Accessor<boolean>
    setOpened: Function
}

const DropdownSelector: Component<IDropdownSelectorProps> = ({
    block,
    clearable,
    placeholder,
    size,
    opened,
    setOpened,
}) => {
    const [selectionState, { clearSelections }] = useSelection()

    const dropdownSize = getComponentSize(size, Sizes.MEDIUM)
    const message = () => selectionState.current
        ? selectionState.current
        : placeholder ?? 'Select'

    let selectorRef: HTMLDivElement | undefined = undefined;
    let clearRef: SVGSVGElement | undefined = undefined;

    const handler = (event: Event) => {
        switch (true) {
            case event.target === clearRef:
                return
            case selectorRef?.contains(event.target as HTMLElement):
                setOpened(!opened())
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

    return (
        <div
            class={`${styles.DropdownSelector} ${styles['DropdownSize_' + dropdownSize]}`}
            classList={{
                [styles.Block]: block,
            }}
            ref={selectorRef!}
        >
            <span
                class={`text_ellipses ${styles.DropdownSelectorLabel}`}
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
                        onClick={() => clearSelections()} />
                </Show>
                <Expand size="m" />
            </div>
        </div>
    )
}

export default DropdownSelector;
