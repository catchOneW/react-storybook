import React, { useCallback, useState,useEffect } from 'react'

const useToggle = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(
        (nextValue) => {
            if (typeof nextValue === 'boolean') {
                setValue(nextValue);
            } else {
                setValue(currentValue => !currentValue);
            }
        },
        [setValue]
    );
    return [value, toggle];
};

function Switch({onChange}) {
    const [on, toggle] = useToggle(true);
    useEffect(()=>{
        onChange(on);
    })
    return (
        <div onClick={toggle}>
            <div>{on ? 'ON' : 'OFF'}</div>
        </div>
    )
}
export default Switch
