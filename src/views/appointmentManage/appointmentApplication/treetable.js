import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, resolveComponent as _resolveComponent, openBlock as _openBlock, createBlock as _createBlock } from "vue"

import { computed, ref } from 'vue'
import { TableV2FixedDir } from 'element-plus'




const __sfc__ = /*#__PURE__*/_defineComponent({
  __name: 'App',
  setup(__props) {

const generateColumns = (length = 10, prefix = 'column-', props) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(10).map((column, columnIndex) => {
  let fixed
  if (columnIndex < 2) fixed = TableV2FixedDir.LEFT
  if (columnIndex > 8) fixed = TableV2FixedDir.RIGHT
  return { ...column, fixed }
})

const data = generateData(columns, 200)

const expandColumnKey = 'column-0'

// add some sub items
for (let i = 0; i < 50; i++) {
  data.push(
    {
      ...data[0],
      id: `${data[0].id}-sub-${i}`,
      parentId: data[0].id,
      [expandColumnKey]: `Sub ${i}`,
    },
    {
      ...data[2],
      id: `${data[2].id}-sub-${i}`,
      parentId: data[2].id,
      [expandColumnKey]: `Sub ${i}`,
    },
    {
      ...data[2],
      id: `${data[2].id}-sub-sub-${i}`,
      parentId: `${data[2].id}-sub-${i}`,
      [expandColumnKey]: `Sub-Sub ${i}`,
    }
  )
}

function unflatten(
  data,
  rootId = null,
  dataKey = 'id',
  parentKey = 'parentId'
) {
  const tree = []
  const childrenMap = {}

  for (const datum of data) {
    const item = { ...datum }
    const id = item[dataKey]
    const parentId = item[parentKey]

    if (Array.isArray(item.children)) {
      childrenMap[id] = item.children.concat(childrenMap[id] || [])
    } else if (!childrenMap[id]) {
      childrenMap[id] = []
    }
    item.children = childrenMap[id]

    if (parentId !== undefined && parentId !== rootId) {
      if (!childrenMap[parentId]) childrenMap[parentId] = []
      childrenMap[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

const treeData = computed(() => unflatten(data))

const expandedRowKeys = ref([])

const onRowExpanded = ({ expanded }) => {
  console.log('Expanded:', expanded)
}

const onExpandedRowsChange = (
  expandedKeys
) => {
  console.log(expandedKeys)
}

return (_ctx,_cache) => {
  const _component_el_table_v2 = _resolveComponent("el-table-v2")

  return (_openBlock(), _createBlock(_component_el_table_v2, {
    "expanded-row-keys": expandedRowKeys.value,
    "onUpdate:expanded-row-keys": _cache[0] || (_cache[0] = ($event) => ((expandedRowKeys).value = $event)),
    columns: _unref(columns),
    data: _unref(treeData),
    width: 700,
    "expand-column-key": expandColumnKey,
    height: 400,
    fixed: "",
    onRowExpand: onRowExpanded,
    onExpandedRowsChange: onExpandedRowsChange
  }, null, 8 /* PROPS */, ["expanded-row-keys", "columns", "data"]))
}
}

})
__sfc__.__file = "App.vue"
export default __sfc__