import type { Component } from "solid-js";
import styles from './Arrow.module.css'

const Arrow : Component = () => {
    return (
        <svg
            class={styles.svg}
            viewBox="0 0 11 32"
        >
            <path
                d="M10.625 17.143a.612.612 0 01-.179.411l-8.321 8.321c-.107.107-.268.179-.411.179s-.304-.071-.411-.179l-.893-.893a.582.582 0
                01-.179-.411c0-.143.071-.304.179-.411l7.018-7.018L.41
                10.124c-.107-.107-.179-.268-.179-.411s.071-.304.179-.411l.893-.893c.107-.107.268-.179.411-.179s.304.071.411.179l8.321
                8.321a.617.617 0 01.179.411z"
            />
        </svg>
    )
}

export default Arrow