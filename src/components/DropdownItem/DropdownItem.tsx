import {
    Component,
} from "solid-js";
import styles from './DropdownItem.module.css';
import { useSelection } from "../../context/SelectionContext"
import { DropdownItemType } from "../../types/DropdownItemType";
import Arrow from "../Arrow/Arrow";

interface IDropdownItemProps {
    data: DropdownItemType
}

const DropdownItem: Component<IDropdownItemProps> = ({ data }) => {
    const { level, key, item } = data
    const [ selectionState, { updateSelection }] = useSelection();

    return (
        <div class={styles.DropdownItem}>
            <button onClick={() => updateSelection(level, key)}>
                <span>{item.label}</span>
                {item.children ? <Arrow /> : <span />}
            </button>
        </div>
    )
}

export default DropdownItem