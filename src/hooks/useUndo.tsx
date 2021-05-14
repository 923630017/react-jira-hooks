// reducer例子
// useUndo 可以设置变量 设置返回前面设置过的变量和将来变量，还有重置

import { useCallback, useState } from "react"

export const useUndo = <T extends any>(initValue: T) => {
    // 设置变量
    const [state, setState] = useState(initValue);
    // 存储前面的变量
    const [pastStates, setPastStates] = useState<T[]>([]);
    // 存储将来的变量
    const [futureStates, setFutureStates] = useState<T[]>([]);
    // 能否前置或者后置
    const canUndo = pastStates.length === 0; // true则不能 ，反之则能
    const canRedo = futureStates.length === 0;
    // 设置以前值
    const undo = () => {
        if(canUndo) {
            return;
        }
        // pastStates: [1,2,34,5, previousState]; 
        //上一个值
        const previousState = pastStates[pastStates.length -1];
        // 其他之前的变量otherPreviousState: [1,2,34,5]; 
        const otherPreviousState = pastStates.slice(0, pastStates.length-1);
        // 设置之前变量数组
        setPastStates(otherPreviousState);
        // 设置现在的值
        setState(previousState);
        // 设置将来的值
        setFutureStates([previousState, ...futureStates]);
    }
    // 设置将来值
    const redo = () => {
        if(canRedo) {
            return;
        }
        const nextFutureState = futureStates[0];
        const otherFutureStates = futureStates.slice(1);
        setPastStates([...pastStates, state]);
        setState(nextFutureState);
        setFutureStates(otherFutureStates);
    }
    // 设置新增
    const set = (newState: T) => {
        if(newState === state) {
            return;
        }
        setPastStates([...pastStates, state]);
        setState(newState);
        // 将来值清空
        setFutureStates([]);
    }
    //重置
    const reset = (resetState: T) => {
        setPastStates([]);
        setState(resetState);
        setFutureStates([]);
    }
    return [
        { pastStates, futureStates, state },
        { set, redo, reset, undo, canRedo, canUndo }
    ]
}
// 为避免函数作为依赖项导致重复渲染，使用callback
export const useUndo1 = <T extends any>(initValue: T) => {
    // 设置变量
    const [state, setState] = useState<{
        pastArr: T[];
        currentValue: T;
        futureArr: T[]
    }>({
        pastArr: [],
        currentValue: initValue,
        futureArr: [],
    })
    // 能否前置或者后置
    const canUndo = state.pastArr.length === 0; // true则不能 ，反之则能
    const canRedo = state.futureArr.length === 0;
    // 设置以前值
    const undo = useCallback(() => {
        setState((preState) => {
            const { pastArr, futureArr } = preState;
            if(pastArr.length === 0) {
                return preState;
            }
            // pastStates: [1,2,34,5, previousState]; 
            //上一个值
            const previousState = pastArr[pastArr.length -1];
            // 其他之前的变量otherPreviousState: [1,2,34,5]; 
            const otherPreviousState = pastArr.slice(0, pastArr.length-1);
            return {
                pastArr: otherPreviousState,
                currentValue: previousState,
                futureArr: [previousState, ...futureArr],
            }
        })
    }, [])
    //设置将来值
    const redo = useCallback(() => {
        setState((preState) => {
            const { pastArr, currentValue, futureArr } = preState;
            if(futureArr.length === 0) {
                return preState;
            }
            const nextFutureState = futureArr[0];
            const otherFutureStates = futureArr.slice(1);
            return {
                currentValue: nextFutureState,
                pastArr: [...pastArr, currentValue],
                futureArr: otherFutureStates,
            }
        })
    }, [])
    // 设置新增
    const set = useCallback((newState: T) => {
        setState((preState) => {
            const { pastArr, currentValue, futureArr } = preState;
            if(newState === currentValue) {
                return preState;
            }
            // 将来值清空
            return {
                currentValue: newState,
                pastArr: [...pastArr, currentValue],
                futureArr: [],
            }
        })
    }, [])
    //重置
    const reset = useCallback((resetState: T) => {
        setState(() => ({
           currentValue: resetState,
           pastArr: [],
           futureArr: [], 
        }))
    }, [])
    return [
        state,
        { set, redo, reset, undo, canRedo, canUndo }
    ]
}