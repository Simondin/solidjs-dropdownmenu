export type DropdownItemType = {
    item: {
        label: string
        children: boolean
        disabled: boolean
    },
    level: number,
    key: string,
    parent: string,
}