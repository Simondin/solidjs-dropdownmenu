import { ItemsByGroupType } from '../context/SelectionContext'
import { DataType } from '../types/DataType'

const START_LEVEL = 0

function exploreItems(node: DataType, idx: number, items: ItemsByGroupType): void {
    _exploreItems(node, idx, '', START_LEVEL, items)
}

function _exploreItems(node: DataType, idx: number, parent: string, level: number, items: ItemsByGroupType): void {
    const { children } = node
    const key = `${parent}${idx}`
    const currentLevel = level + 1

    if (!(level in items)) {
        items[level] = {}
    }

    items[level][key] = {
        item: {
            label: node.label,
            children: Boolean(node.children?.length),
            disabled: Boolean(node.disabled),
        },
        level,
        key,
        parent,
    }

    if (!children) {
        return
    }

    children.forEach((it, idx) => _exploreItems(it, idx, key, currentLevel, items))
}

export {
    START_LEVEL,
    exploreItems
}