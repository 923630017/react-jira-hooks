// 对请求的加载、报错等进行封装统一
interface State<T> {
   loading: 'start' | 'loading' | 'success' | 'error';
   data: T | null;
   error: null | Error;
}
// 初始
export const useAsync = () => {

};