import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
export default class Table extends Component {
  static contextTypes = {
    store: PropTypes.any,
    layout: PropTypes.any,
  };
  static childContextTypes = {
    table: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {};
    ['syncScroll'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }
  get bodyWrapperHeight() {
    const { layout, height, maxHeight } = this.props;
    const style = {};

    if (height) {
      style.height = layout.bodyHeight || '';
    } else if (maxHeight) {
      if (layout.headerHeight !== null) { // 非首次渲染
        style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight
      }
    }

    return style;
  }

  get bodyWidth() {
    const { layout } = this.props;
    const { bodyWidth, scrollY, gutterWidth } = layout;
    return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
  }

  get fixedHeight() {
    const { layout } = this.props;
    return {
      bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
    };
  }

  get fixedBodyHeight() {
    const { layout, ...props } = this.props;
    const style = {};

    if (props.height) {
      style.height = layout.fixedBodyHeight || '';
    } else if (props.maxHeight) {
      if (layout.headerHeight !== null) {
        style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
      }
    }

    return style;
  }

  getChildContext() {
    return {
      table: this
    }
  }

  syncScroll() {
    const { headerWrapper, footerWrapper, bodyWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this;
    if (headerWrapper) {
      headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }
    if (footerWrapper) {
      footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }

    if (fixedBodyWrapper) {
      fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
    if (rightFixedBodyWrapper) {
      rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
  }

  bindRef(key) {
    return (node) => { this[key] = node; }
  }

  render() {
    const { store, layout, ...props } = this.props;
    const { isHidden } = this.state;

    return (
      <div
        style={this.style({
          height: props.height,
          maxHeight: props.maxHeight,
        })}
        className={this.className('el-table', {
          'el-table--fit': props.fit,
          'el-table--striped': props.stripe,
          'el-table--border': props.border,
          'el-table--hidden': isHidden,
          'el-table--fluid-height': props.maxHeight,
          'el-table--enable-row-hover': !store.isComplex,
          'el-table--enable-row-transition': (store.data || []).length && (store.data || []).length < 100
        })}
        ref={this.bindRef('el')}
      >

        <div className="el-table__header-wrapper" ref={this.bindRef('headerWrapper')}>
          <TableHeader
            {...this.props}
            style={{ width: this.bodyWidth || '' }}
          />
        </div>

        <div
          style={this.bodyWrapperHeight}
          className="el-table__body-wrapper"
          ref={this.bindRef('bodyWrapper')}
          onScroll={this.syncScroll}
        >
          <TableBody
            {...this.props}
            style={{ width: this.bodyWidth }}
          />
        </div>

        <div className="el-table__column-resize-proxy" ref={this.bindRef('resizeProxy')} style={{ visibility: 'hidden' }} />
      </div>
    )
  }
}
