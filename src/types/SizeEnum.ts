export enum Sizes {
    XXSMALL = 'xxs',
    XSMALL  = 'xs',
    SMALL   = 's',
    MEDIUM  = 'm',
    LARGE   = 'l',
    XLARGE  = 'xl',
    XXLARGE = 'xxl',
    XXXLARGE= 'xxxl',
}

export function getComponentSize(size: Sizes | string | undefined, defaultSize: Sizes) {
    return size && (size in Sizes || Object.values(Sizes).includes(size as Sizes))
        ? size
        : defaultSize
}