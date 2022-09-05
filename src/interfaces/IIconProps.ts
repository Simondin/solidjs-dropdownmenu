import { Sizes } from "../types/SizeEnum";

export interface IIconProps {
    size?: Sizes | string
}

export function getIconSize(size: undefined | string | Sizes, defaultSize: Sizes) {
    return size && (size in Sizes || Object.values(Sizes).includes(size as Sizes))
        ? size
        : defaultSize
}

