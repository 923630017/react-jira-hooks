// 对请求的加载、报错等进行封装统一
import  { useState } from 'react';
interface State<T> {
   loading: 'start' | 'loading' | 'success' | 'error';
   data: T | null;
   error: null | Error;
}
// 设置初始值
const defaultInitState:State<null> = {
   loading: 'start',
   data: null,
   error: null
};
export const useAsync = <D extends {}>(initialState?: State<D>) => {
   const [state, setState] = useState({
      ...defaultInitState,
      ...initialState, //用户传的值
   });
   // 设置值 成功时
   const setData = (data: D) => { 
      setState({
         loading: 'success',
         data,
         error: null,
      });   
   }
   const setError =(error:Error) => {
      setState({
         data: null,
         loading: 'error',
         error,
      })
   };
   //用于触发异步请求
   const run = (promise:Promise<D>) => {
      // b必须传入promise
      if(!promise || !promise.then) {
         throw new Error('请传入Promise 类型参数');
      }
      // 请求加载时
      setState({...state, loading: 'loading'});
      // 请求返回
      return promise.then((res) => {
         setData(res);
         return res;
      }).catch((error) => {
         setError(error);
      })
   }
   return {
      isStart: state.loading === 'start',
      isLoading: state.loading === 'loading',
      isSuccess: state.loading === 'success',
      isError: state.loading === 'error',
      run,
      setData,
      setError,
      ...state
   }
}