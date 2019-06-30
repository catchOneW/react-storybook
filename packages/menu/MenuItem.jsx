import React from 'react'
import { Component, PropTypes } from '../../libs';
import MixinComponent from './MixinComponent';

export default class MenuItem extends MixinComponent {
    constructor(props) {
        super(props)
        this.instanceType = 'MenuItem';
        this.state = {
        }
    }
    render() {
        return (
            <li style={this.style()}
                className={
                    this.className(
                        'MenuItem',
                        {
                            'is-active': this.active(),
                        }
                    )
                } onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </li>
        )
    }
    active(){
        return this.props.index === this.rootMenu().state.activeIndex;
    }
    handleClick() {
        this.rootMenu().handleSelect(
            this.props.index,
        );
    }
}

MenuItem.PropTypes = {
    index: PropTypes.string,
}