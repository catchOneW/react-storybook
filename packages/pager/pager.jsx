import React, { Component } from 'react'
import usePager from '../../util/usePager'

function pager() {
    let [pageNum, change] = usePager(1)
    return (
        <div>
            <button onClick={change(pageNum + 1)}>+</button>
            <button onClick={change(pageNum - 1)}>-</button>
            <div>{pageNum}</div>
        </div>
    )
}
export default pager