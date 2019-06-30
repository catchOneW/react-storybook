import * as React from 'react';
import { getValueByPath } from "./utils";


function defaultRender(row, column) {
  return getValueByPath(row, column.property);
}

const defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    className: 'el-table-column--selection',
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
  }
};

const forced = {
  expand: {
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  },
  index: {
    sortable: false
  },
  selection: {
    sortable: false,
    resizable: false
  }
};

let columnIDSeed = 1;

export default function normalizeColumns(columns, tableIDSeed) {
  return columns.map((column) => {
    let _column;
    let { width, minWidth } = column;
    width = parseInt(width, 10);
    const id = `el-table_${tableIDSeed}_column_${columnIDSeed++}`;

    _column = Object.assign({
      id,
      sortable: false,
      resizable: true,
      showOverflowTooltip: false,
      align: 'left',
      filterMultiple: true
    }, column, {
        columnKey: column.columnKey || id,
        width,
        minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        render: column.render || defaultRender,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
        filterable: column.filters && column.filterMethod,
        filterOpened: false,
        filteredValue: column.filteredValue || null,
        filterPlacement: column.filterPlacement || 'bottom',
      }, defaults[column.type || 'default'], forced[column.type]);

    return _column;
  })
}