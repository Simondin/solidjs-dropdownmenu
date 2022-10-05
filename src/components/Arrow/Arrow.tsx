import type { Component } from "solid-js";
import { IIconProps, getIconSize } from "../../interfaces/IIconProps"
import { Sizes } from "../../types/SizeEnum";
import styles from './Arrow.module.css'

const Arrow : Component<IIconProps> = ({ size }) => {
    const iconSize = getIconSize(size, Sizes.SMALL)
    return (
        <svg
            height="24"
            width="24"
            class={styles.icon}
            style={{"scale": `var(--scale-${iconSize})`}}
        >
            <path d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6Z" />
        </svg>
    )
}

export default Arrow