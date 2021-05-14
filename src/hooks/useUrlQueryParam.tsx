import { clearObject } from 'common/utils';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// 目的是获取和设置页面地址中的参数；方便直接复制地址，页面可以直接使用地址中的数据 url?name=hqb&age=12 
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // searchParams: 数据
  // setSearchParams 设置地址和页面中的数据
  return [
      // useMemo:保证每次渲染返回对象不变，避免useDebounce useEffect重复渲染;返回地址数据
       useMemo(
        () => keys.reduce((pre, key) => { return {
            ...pre,
            [key]: searchParams.get(key) || '',
        }}, {} as {[key in T]: string }),
        [searchParams]),
        // 设置数据
       (params: Partial<{[key in T]: any}>) => {
           const newValue = clearObject({...Object.fromEntries(searchParams), ...params});
           return setSearchParams(newValue);
       }
  ] as const
}