//用于判断组件是否卸载 目的是为了解决退出退出登录状态时，还在请求赋值引起报错
import { useEffect, useRef } from "react"
const useUnmount = () => {
    const UnmountRef = useRef(false);
    useEffect(() => {
        UnmountRef.current = false;
        return () => {
            UnmountRef.current = true;
        }
    });
    return UnmountRef;
}
export default useUnmount;