import {
    Component,
} from "solid-js";
import styles from './DropdownItem.module.css';
import { useSelection } from "../../context/SelectionContext"
import { DropdownItemType } from "../../types/DropdownItemType";
import Arrow from "../Arrow/Arrow";

interface IDropdownItemProps {
    data: DropdownItemType,
    selected?: boolean
}

const DropdownItem: Component<IDropdownItemProps> = ({ data, selected }) => {
    const { level, key, item } = data
    const [ selectionState, { updateSelection }] = useSelection();

    const isSelected = () => selectionState.all?.[level] === key

    return (
        <div
            class={`flex-row align-center justify-between ${styles.DropdownItem}`}
            classList={{
                [styles.Selected]: isSelected(),
                [styles.Disabled]: item.disabled,
            }}
            onClick={() => {
                if (item.disabled) return
                updateSelection(level, key)
            }}
        >
            <span
                class={`text-ellipses ${styles.DropdownItemLabel}`}
                title={item.label}
            >
                {item.label}
            </span>
            {item.children && <Arrow /> }
        </div>
    )
}

export default DropdownItem