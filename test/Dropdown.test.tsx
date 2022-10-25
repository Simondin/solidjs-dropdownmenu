import '@testing-library/jest-dom' // Not needed but if you not import the sintax highlightings gives you an error

import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, fireEvent, prettyDOM } from 'solid-testing-library';
import Dropdown from '../src/Dropdown';
import data from '../src/data/Data';
import { ItemsByGroupType } from '../src/context/SelectionContext';
import { exploreItems, START_LEVEL } from '../src/utilities/readData';
import { DropdownItemType } from '../src/types/DropdownItemType';

describe('Dropdown component', () => {

    const menuItems: ItemsByGroupType = {}

    const getNextLevelItem = (level: number, parent: string, items: ItemsByGroupType): DropdownItemType | undefined => {
        const children = items[level + 1]
        if (! children) return

        for (const it of Object.values(children)) {
            if (it.parent !== parent) continue

            return it
        }
    }

    beforeAll(() => {
        data.forEach((it, idx) => exploreItems(it, idx, menuItems))
    })

    it('should show default 'Select' placeholder', () => {
        render(() => <Dropdown data={data} />)

        const selectElm = screen.getByText('Select')
        expect(selectElm).toBeInTheDocument()
    })

    it('should show custom placeholder', () => {
        const placeholder = 'test'
        render(() => <Dropdown data={data} placeholder={placeholder}/>)

        const selectElm = screen.getByText(placeholder)
        expect(selectElm).toBeInTheDocument()
    })

    it(`should show level ${START_LEVEL} menu`, async () => {
        render(() => <Dropdown data={data} />)

        const selector = screen.getByTestId('dropdown-selector')
        fireEvent.mouseDown(selector)

        for (const it of Object.values(menuItems[START_LEVEL])) {
            expect(screen.getByTestId(it.item.label)).toBeInTheDocument()
        }
    })

    it(`should update selection on level ${START_LEVEL} menu click`, async () => {
        render(() => <Dropdown data={data} />)

        const selector = screen.getByTestId('dropdown-selector')
        const selection = screen.getByTestId('dropdown-selection')
        fireEvent.mouseDown(selector)

        for (const it of Object.values(menuItems[START_LEVEL])) {
            const menuItem = screen.getByText(it.item.label) as HTMLSpanElement
            fireEvent.click(menuItem)
            expect(selection.textContent).toEqual(menuItem.textContent)
        }
    })

    it('should follow all the tree for a menu item', async () => {
        render(() => <Dropdown data={data} />)

        const selector = screen.getByTestId('dropdown-selector')

        fireEvent.mouseDown(selector)

        let level = START_LEVEL
        let lastLeaf = undefined

        const maxLevel = Object.keys(menuItems).length
        while(level < maxLevel) {
            for (const it of Object.values(menuItems[`${level}`])) {
                if (! it.item.children && ! lastLeaf) {
                    continue
                }

                const menuItem = screen.getByTestId(it.item.label)
                fireEvent.click(menuItem)
                lastLeaf = getNextLevelItem(level, it.key, menuItems)

                break
            }
            ++level
        }
    })

    it('should follow all the tree for a menu item and correctly update the selection label', async () => {
        render(() => <Dropdown data={data} />)

        const selector = screen.getByTestId('dropdown-selector')
        const selection = screen.getByTestId('dropdown-selection')

        fireEvent.mouseDown(selector)

        let level = START_LEVEL
        let lastLeaf = undefined
        const labels = []

        const maxLevel = Object.keys(menuItems).length
        while(level < maxLevel) {
            for (const it of Object.values(menuItems[`${level}`])) {
                if (! it.item.children && ! lastLeaf) {
                    continue
                }

                const menuItem = screen.getByTestId(it.item.label)
                fireEvent.click(menuItem)
                labels.push(it.item.label)
                lastLeaf = getNextLevelItem(level, it.key, menuItems)

                break
            }
            ++level
        }
        expect(selection.textContent).toEqual(labels.join(' / '))
    })
})