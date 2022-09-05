import { createContext, useContext, ParentComponent } from "solid-js"
import { createStore } from "solid-js/store"
import { DataType } from "../types/DataType"
import { DropdownItemType } from "../types/DropdownItemType"

const START_LEVEL = 0

type ItemsByGroupType = {
    [name: string]: {
        [name: string]: DropdownItemType
    }
}

type SelectionContextProps = {
    data: DataType[]
}

type SelectionContextState = {
    readonly data: ItemsByGroupType
    readonly current: string
    readonly all: { [name: string]: string }
}

type SelectionContextValue = [
    state: SelectionContextState,
    actions: {
        updateSelection: (parent: number, key: string) => void;
        clearSelections: () => void;
    }
]

const defaultState : SelectionContextState = {
    data: {},
    current: '',
    all: {}
}

const SelectionContext = createContext<SelectionContextValue>([
    defaultState,
    {
        updateSelection: () => undefined,
        clearSelections: () => undefined,
    }
])

function exploreItems(node: DataType, idx: number, parent: string, level: number, items: ItemsByGroupType): void {
    const { children } = node
    const key = `${parent}${idx}`
    const currentLevel = level + 1

    if (!(level in items)) {
        items[level] = {}
    }

    items[level][key] = {
        item: node,
        level,
        key,
        parent,
    }

    if (!children) {
        return
    }

    children.forEach((it, idx) => exploreItems(it, idx, key, currentLevel, items))
}

export const SelectionProvider: ParentComponent<SelectionContextProps> = (props) => {
    const itemsByGroup : ItemsByGroupType = {}

    props.data.forEach((it, idx) => exploreItems(it, idx, '', START_LEVEL, itemsByGroup))

    const [ state, setState ] = createStore({
        ...defaultState,
        data: itemsByGroup,
    })

    const updateSelection = (level: number, key: string) => {
        setState(prev => {
            const all: { [name: string]: string } = {}

            for (let i=START_LEVEL; i<level; ++i) {
                all[i] = prev.all[i]
            }

            if (! (level in prev.all) || prev.all[level] !== key) {
                all[level] = key
            }

            const selectedItems = []
            for (const [key, value] of Object.entries(all)) {
                const { item } = prev.data[key][value]

                selectedItems.push(item.label)
            }

            return {
                ...prev,
                all,
                current: selectedItems.join(' / '),
            }
        })
    }

    const clearSelections = () => setState(prev => ({
        ...defaultState,
        data: prev.data
    }))


    return (
        <SelectionContext.Provider value={[
            state,
            {
                updateSelection,
                clearSelections
            }
        ]} >
            {props.children}
        </SelectionContext.Provider>
    )
}

export const useSelection = () => useContext(SelectionContext)
