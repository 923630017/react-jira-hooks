import  { useEffect, useState } from 'react';
export function useDebounce<T>(value: T, delay?: number) {
    const [defalutValue, setDefalutValue] = useState(value)
    useEffect(() => {
       const timeId = setTimeout(() => {
           setDefalutValue(value)
       }, delay);
       return () => clearTimeout(timeId);
    }, [value, delay]);
    return defalutValue;
} 