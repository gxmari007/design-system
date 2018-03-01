// 把嵌套的数组转化为平级的一维数组
function getAllColumns(columns) {
  const result = [];

  columns.forEach((column) => {
    if (column.children) {
      result.push(column);
      result.push(...getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });

  return result;
}

// 根据列数组里面的结构设置相应的 colspan 和 rowspan
export function makeRows(originColumns) {
  let maxLevel = 1;
  const rows = [];
  const allColumns = getAllColumns(originColumns);

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

  originColumns.forEach((column) => {
    column.level = 1;
    traverse(column);
  });

  for (let i = 0; i < maxLevel; i += 1) {
    rows.push([]);
  }

  // 把相同 level 的 column 插入到相应的数组中
  allColumns.forEach((column) => {
    if (column.children) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = (maxLevel - column.level) + 1;
    }

    rows[column.level - 1].push(column);
  });

  return rows;
}

// 获取原始列中没有 children 的数据
export function makeFlattenColumns(columns) {
  const result = [];

  columns.forEach((column) => {
    if (column.children) {
      result.push(...makeFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });

  return result;
}

// 合并行操作
// 根据 columns 中设置了 mergeColumn 的列合并相同的值
export function mergeColumn(data, columns) {
  columns.forEach((column) => {
    // 合并相同单元格
    if (column.mergeColumn) {
      const prop = column.prop;
      let i = 0;

      while (i < data.length) {
        const firstRow = data[i];
        let k = 0;

        firstRow[`span-${prop}`] = 1;
        firstRow[`dis-${prop}`] = true;

        for (k = i + 1; k < data.length; k += 1) {
          const currentRow = data[k];

          if (firstRow.row[prop] === currentRow.row[prop]) {
            firstRow[`span-${prop}`] += 1;
            currentRow[`span-${prop}`] = 1;
            currentRow[`dis-${prop}`] = false;
          } else {
            break;
          }
        }

        i = k;
      }
    }
  });

  return data;
}

// 获取单元格 dom 元素
// 如果没有则返回 null
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

// 根据传入的 table 组件实例与单元格实例返回对应的列实例
export function getColumnByCell(table, cell) {
  const id = cell.getAttribute('data-id');
  let column = null;

  if (id) {
    table.columns.forEach((item) => {
      if (item.columnId === id) {
        column = item;
      }
    });
  }

  return column;
}
