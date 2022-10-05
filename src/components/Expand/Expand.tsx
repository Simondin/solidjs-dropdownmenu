import type { Component } from "solid-js"
import { IIconProps, getIconSize } from "../../interfaces/IIconProps"
import { Sizes } from "../../types/SizeEnum"

import styles from './Expand.module.css'

const Expand : Component<IIconProps> = ({ size }) => {
    const iconSize = getIconSize(size, Sizes.MEDIUM)

    return (
        <svg
            height="24"
            width="24"
            class={styles.icon}
            style={{ "scale": `var(--scale-${iconSize})` }}
        >
            <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
        </svg>
    )
}

export default Expand