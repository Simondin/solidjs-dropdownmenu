import { Accessor, Component, For, onCleanup, onMount, Show } from 'solid-js';
import styles from './DropdownMenu.module.css'
import { useSelection } from '../../context/SelectionContext';
import DropdownItem from '../DropdownItem';
import { DropdownItemType } from '../../types/DropdownItemType';
import { getComponentSize, Sizes } from '../../types/SizeEnum';

interface IDropdownMenuProps {
    itemSize?: string
    style?: object
    opened: Accessor<boolean>
    setOpened: Function
}

const DropdownMenu: Component<IDropdownMenuProps> = ({
        itemSize,
        opened,
        setOpened,
    }) => {

    let menuRef: HTMLDivElement | undefined = undefined;
    const [selectionState] = useSelection()
    const groupItemSize = getComponentSize(itemSize, Sizes.MEDIUM)

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

    const handler = (event: Event) => {
        if (!opened() || menuRef?.contains(event.target as HTMLElement)) {
            return
        }
        setOpened(false);
    };

    onMount(() => {
        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
    })

    onCleanup(() => {
        document.removeEventListener('mousedown', handler);
        document.removeEventListener('touchstart', handler);
    })


    return (
        <div
            class={styles.DropdownMenu}
            ref={menuRef!}
            data-testid='dropdown-menu'
        >
            <For each={Object.values(selectionState.data)}>
                {it => (
                    <div
                        class={`${styles.DropdownMenuGroup} ${styles['GroupSize_' + groupItemSize]}`}
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
    )
}

export default DropdownMenu;