import React, { useState } from 'react';
export function useArray<T>(value:T[]){
    const [state, setstate] = useState(value);
    return {
        value: state,
        add: (item:T) => { setstate([...value, item])},
        removeIndex: (index: number) => { 
           const copy = [...state];
           copy.splice(index, 1)
           setstate(copy);
        },
        clear: () => {
           setstate([]);  
        }

    }
}