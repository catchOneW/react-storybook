import React, { Component } from 'react'
import usePager from '../../util/usePager'

function pager() {
    let total=10
    let [{pageNum,pages}, setpageNum] = usePager(1,total)
    return (
        <div>
            <div>{pageNum}</div>
            <div>{total}</div>
            <button onClick={()=>setpageNum(pageNum - 1)}>-</button>
            <div>{JSON.stringify(pages)}</div>
            <button onClick={()=>setpageNum(pageNum + 1)}>+</button>
        </div>
    )
}
export default pager