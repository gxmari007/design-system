// 把嵌套的列转化为平级的一维列
function getAllColumns(columns) {
  const results = [];

  columns.forEach((column) => {
    if (column.children) {
      results.push(column);
      results.push(...getAllColumns(column.children));
    } else {
      results.push(column);
    }
  });

  return results;
}

// 递归地获取子组件
export function getColumns(columns) {
  const results = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    if (column.$options.name === 'co-table-column') {
      if (column.$children.length > 0) {
        column.children = getColumns(column.$children);
      }

      results.push(column);
    }
  }

  return results;
}

// 获取最底层的列组件
export function getFlattenColumns(columns) {
  const results = [];

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    if (column.children) {
      results.push(...getFlattenColumns(column.children));
    } else {
      results.push(column);
    }
  }

  return results;
}

// 获取表头数据结构
export function getHeaderRows(columns) {
  const rows = [];
  const allColumns = getAllColumns(columns);
  let maxLevel = 1;

  function traverse(column, parent) {
    // 为设置 rowspan 确定层级
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children) {
      let colSpan = 0;

      column.children.forEach((subColumn) => {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });

      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  for (let i = 0; i < maxLevel; i += 1) {
    rows.push([]);
  }

  allColumns.forEach((column) => {
    if (column.children) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }

    rows[column.level - 1].push(column);
  });

  return rows;
}

// 排序方法，支持自定义
export function orderBy(array = [], sortKey, reverse, sortMethod) {
  const order = reverse === 'asc' ? 1 : -1;

  if (!sortKey && !sortMethod) {
    return array;
  }

  return array.slice().sort((a, b) => {
    if (sortMethod) {
      return sortMethod(a[sortKey], b[sortKey], reverse);
    }

    return a[sortKey] > b[sortKey] ? order : -order;
  });
}

// 获取表格单元格 dom 元素，没有则返回 null
export function getCellDom(event) {
  let dom = event.target;

  while (dom && dom.tagName.toUpperCase() !== 'HTML') {
    if (dom.tagName.toUpperCase() === 'TD') {
      return dom;
    }

    dom = dom.parentNode;
  }

  return null;
}

export function getColumnByCell(columns, cell) {
  const matches = (cell.className || '').match(/co-table_column_[^\s]+/gm);
  let column = null;

  if (matches) {
    columns.forEach((item) => {
      if (item.columnId === matches[0]) {
        column = item;
      }
    });
  }

  return column;
}
