import React from 'react'
import { Component, PropTypes } from '../../libs';
import MixinComponent from './MixinComponent';

export default class SubMenu extends MixinComponent {
    constructor(props) {
        super(props)
        this.instanceType = 'SubMenu';
        this.state = {
        }
    }
    getChildContext() {
        return {
            component: this
        };
    }
    render() {
        return (
            <li className="SubMenu">
                {this.props.title}
                <ul>
                    {this.props.children}
                </ul>
            </li>
        )
    }
}
SubMenu.PropTypes = {
    index: PropTypes.string,
    title: PropTypes.string,
}
SubMenu.childContextTypes = {
    component: PropTypes.any
};