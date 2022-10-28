import { Component } from 'solid-js';
import { IIconProps, getIconSize } from '../../interfaces/IIconProps';
import { Sizes } from '../../types/SizeEnum';
import styles from './Clear.module.css'

interface IClearIconProps extends IIconProps {
    onClick?: () => void,
    ref?: SVGSVGElement,
}

const Clear: Component<IClearIconProps> = ({ onClick, ref, size }) => {
    const iconSize = getIconSize(size, Sizes.SMALL)

    return (
        <svg
            height='24'
            width='24'
            class={styles.icon}
            style={{ 'scale': `var(--scale-${iconSize})` }}
            onClick={() => { onClick && onClick()}}
            ref={ref!}
            data-testid='clear-button'
        >
            <path d='M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z' />
        </svg>
    )
}

export default Clear