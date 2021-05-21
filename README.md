# WindiCSS Sorter

## Installation

```bash
npm i -D windicss-sorter
# or
yarn add -D windicss-sorter
```

## Example

```ts
import WindiSorter from 'windicss-sorter'

const windiSorter = new WindiSorter.init()

const target = 'bg-white sm:hover:(font-medium bg-gray-100) font-light'

const sorted = windiSorter.sortClassNames(target)

console.log(sorted)
// bg-white font-light sm:hover:(bg-gray-100 font-medium)
```

## Options

| Option                    | Type             | Default |
| :------------------------ | :--------------- | :------ |
| priorityOrderList         | Array<string>    | []      |
| sortOrder                 | 'asc' \| 'desc'  | 'asc'   |
| sortUnknowns              | boolean          | true    |
| unknownClassNamesPosition | 'start' \| 'end' | 'end'   |
| removeDuplicateClassNames | boolean          | true    |
| useVariantGroup           | boolean          | true    |

---
