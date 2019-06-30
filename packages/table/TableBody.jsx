// @flow
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getRowIdentity, getValueByPath } from "./utils";
// import {toDate} from "../date-picker/utils/index";

import Checkbox from '../checkbox';


export default class TableBody extends Component {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
  };

  constructor(props) {
    super(props);
    ['handleMouseLeave'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  handleMouseEnter(index) {
    this.context.store.setHoverRow(index);
  }

  handleMouseLeave() {
    this.context.store.setHoverRow(null);
  }

  handleCellMouseEnter(row, column, event) {
    this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event)
  }

  handleCellMouseLeave(row, column, event) {
    this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event)
  }

  handleCellClick(row, column, event) {
    this.dispatchEvent('onCellClick', row, column, event.currentTarget, event)
    this.dispatchEvent('onRowClick', row, event, column);
  }

  handleCellDbClick(row, column, event) {
    this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event)
    this.dispatchEvent('onRowDbClick', row, column)
  }

  handleRowContextMenu(row, event) {
    this.dispatchEvent('onRowContextMenu', row, event)
  }

  dispatchEvent(name, ...args) {
    const fn = this.props[name];
    fn && fn(...args);
  }

  isColumnHidden(index) {
    const { store, layout, ...props } = this.props;
    if (props.fixed === true || props.fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (props.fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return (index < this.leftFixedCount) || (index >= this.columnsCount - this.rightFixedCount);
    }
  }

  getRowStyle(row, index) {
    const { rowStyle } = this.props;
    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  }

  getKeyOfRow(row, index)  {
    const { rowKey } = this.props;
    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }

    return index;
  }



  get columnsCount() {
    return this.props.store.columns.length;
  }

  get leftFixedCount() {
    return 0;
  }

  get rightFixedCount() {
    return 0;
  }

  handleExpandClick(row, rowKey ) {
    this.context.store.toggleRowExpanded(row, rowKey);
  }

  handleClick(row) {
    this.context.store.setCurrentRow(row);
  }

  renderCell(row, column, index, rowKey ){
    const { type, selectable } = column;
    if (type === 'expand') {
      return (
        <div
          className={this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': this.context.store.isRowExpanding(row, rowKey)
          })}
          onClick={this.handleExpandClick.bind(this, row, rowKey)}
        >
          <i className="el-icon el-icon-arrow-right" />
        </div>
      )
    }

    if (type === 'index') {
      return <div>{index + 1}</div>;
    }

    if (type === 'selection') {
      const isSelected = this.context.store.isRowSelected(row, rowKey);
      return (
        <Checkbox
          checked={isSelected}
          disabled={selectable && !selectable(row, index)}
          onChange={() => { this.context.store.toggleRowSelection(row, !isSelected); }}
        />
      )
    }

    return column.render(row, column, index);
  }

  render() {
    const { store, layout, ...props } = this.props;
    const columnsHidden = store.columns.map((column, index) => this.isColumnHidden(index));
    return (
      <table
        className="el-table__body"
        cellPadding={0}
        cellSpacing={0}
        style={this.style({
          borderSpacing: 0,
          border: 0
        })}
      >
        <colgroup>
          {store.columns.map((column, index) => (
            <col width={column.realWidth} style={{ width: column.realWidth }} key={index} />
          ))}
        </colgroup>
        <tbody>
          {store.data.map((row, rowIndex) => {
            const rowKey = this.getKeyOfRow(row, rowIndex);
            return [(
              <tr
                key={rowKey}
                style={this.getRowStyle(row, rowIndex)}
                className={this.className('el-table__row', {
                  'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
                  'hover-row': store.hoverRow === rowIndex,
                  'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || store.currentRow === row)
                }, typeof props.rowClassName === 'string'
                  ? props.rowClassName
                  : typeof props.rowClassName === 'function'
                  && props.rowClassName(row, rowIndex))}
                onMouseEnter={this.handleMouseEnter.bind(this, rowIndex)}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick.bind(this, row)}
                onContextMenu={this.handleRowContextMenu.bind(this, row)}
              >
                {store.columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={this.classNames(column.className, column.align, column.columnKey, {
                      'is-hidden': columnsHidden[cellIndex]
                    })}
                    onMouseEnter={this.handleCellMouseEnter.bind(this, row, column)}
                    onMouseLeave={this.handleCellMouseLeave.bind(this, row, column)}
                    onClick={this.handleCellClick.bind(this, row, column)}
                    onDoubleClick={this.handleCellDbClick.bind(this, row, column)}
                  >
                    <div className="cell">{this.renderCell(row, column, rowIndex, rowKey)}</div>
                  </td>
                ))}
                {!props.fixed && layout.scrollY && !!layout.gutterWidth && (
                  <td className="gutter" />
                )}
              </tr>
            )];
          })}
        </tbody>
      </table>
    );
  }
}
