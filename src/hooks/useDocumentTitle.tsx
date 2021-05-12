import { useEffect, useRef } from 'react';
// 是否保留上一个页面标题，默认不保留
export const useDocumentTitle = (title: string, isKeepOldTitle = true) => {
    // const oldTitle = document.title;
    // useRef可以整个生命周期保存某个值
    const oldTitle = useRef(document.title).current
    useEffect(() => {
        document.title = title;
    }, [title]);
    useEffect(() => {
        return () => {
           if(!isKeepOldTitle) {
            document.title = oldTitle;
           }
        }
    }, [oldTitle, isKeepOldTitle])
}