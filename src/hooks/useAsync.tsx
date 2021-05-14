// 对请求的加载、报错等进行封装统一
import  { useState } from 'react';
import useUnmount from './useUnmount';
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
interface Configs {
   throwError?: boolean
}
//  设置配置
const defaultConfig:Configs = {
   throwError: false
}
export const useAsync = <D extends any>(initialState?: State<D>, initConfig?:Configs) => {
   const config = {
      ...defaultConfig,
      ...initConfig,
   }
   const [state, setState] = useState({
      ...defaultInitState,
      ...initialState, //用户传的值
   });
   // 编辑后自动更新函数 也就是再次调用run函数
   // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
   const [retry, setRetry] = useState(() => () => {});
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
   // 组件是否卸载；卸载就不再赋值
   const useUnmountRef = useUnmount();
   //用于触发异步请求
   const run = (promise:Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // b必须传入promise
      if(!promise || !promise.then) {
         throw new Error('请传入Promise 类型参数');
      }
      setRetry(() => () => {
         if (runConfig?.retry) {
           run(runConfig?.retry(), runConfig);
         }
      });
      // 请求加载时
      setState({...state, loading: 'loading'});
      // 请求返回
      return promise.then((res) => {
         if(!useUnmountRef.current) {
            setData(res);
         }
         return res;
      }).catch((error) => {
         if(!useUnmountRef.current) {
            setError(error);
         }
         if(config.throwError) {
            return Promise.reject(error)
         }
         return error
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
      // retry 被调用时重新跑一遍run，让state刷新一遍
      retry,
      ...state
   }
}