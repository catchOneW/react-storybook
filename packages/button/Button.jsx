import React from 'react'
import { Component, PropTypes } from '../../libs';

export default class Button extends Component {
    render() {
        return (
            <button style={this.style()}
                className={
                    this.className(
                        'Button',
                        {
                            'is-disable': this.props.disabled,
                        }
                    )
                }
                disabled={this.props.disabled}>{
                    this.props.children
                }</button>
        )
    }
}