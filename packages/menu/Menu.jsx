import React from 'react'
import { Component, PropTypes } from '../../libs';

export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.instanceType = 'Menu';
        this.state = {
            activeIndex: props.defaultActive,
        }
    }
    getChildContext() {
        return {
            component: this
        };
    }
    render() {
        return (
            <ul className="menu">
                {this.props.children}
            </ul>
        )
    }
    handleSelect(index) {
        this.setState({ activeIndex: index }, () => {

        });
    }
}

Menu.PropTypes = {
    defaultActive: PropTypes.string
}
Menu.childContextTypes = {
    component: PropTypes.any
};