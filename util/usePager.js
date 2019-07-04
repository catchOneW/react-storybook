import { useState, useCallback } from 'react'
function calculatePagerPages(current, total) {
    const arr = getUniqueArray(getOriginArray(current, total)).sort(
        (a, b) => a - b
    );
    const pages = arr.reduce((prev, item) => {
        prev.push(item);
        const length = prev.length;
        const temp = prev[length - 2];
        if (temp && item - temp > 1) {
            prev.splice(prev.length - 1, 0, "...");
        }
        return prev;
    }, []);
    return pages.filter(n => (n >= 1 && n <= total) || n === "...");
}
/**
 * 
 * @param {*} current 
 * @param {*} total 
 * length 13 or 7
 */
function getOriginArray(current, total) {
    if (current <= 4) {
        return [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            current - 1,
            current - 2,
            current,
            current + 1,
            current + 2,
            total
        ];
    }
    if (current >= total - 3) {
        return [
            1,
            current - 1,
            current - 2,
            current,
            current + 1,
            current + 2,
            total - 6,
            total - 5,
            total - 4,
            total - 3,
            total - 2,
            total - 1,
            total
        ];
    }
    return [
        1,
        current - 1,
        current - 2,
        current,
        current + 1,
        current + 2,
        total
    ];
}

function getUniqueArray(arr) {
    const map = {};
    const results = [];
    arr.forEach(item => {
        if (!map[item]) {
            results.push(item);
            map[item] = true;
        }
    });
    return results;
}

export default function usePager(current) {
    const [pageNum, setValue] = useState(current)
    const change = useCallback(
        (nextValue) => {
            setValue(nextValue);
        },
        [setValue]
    );
    //const [pages, setPages] = useState([])
    // useEffect(() => {
    //     setPages(calculatePagerPages(pageNum, total))
    //     return () => {

    //     };
    // }, [pageNum])
    return [pageNum, change]
}