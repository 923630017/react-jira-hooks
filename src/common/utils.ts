import { useCallback } from 'react';
import { useAuth } from 'context/auth-context';
import qs from 'qs';
import * as auth from 'auth-provider';
const isHasValue = (value:unknown) => value === 0 ? false : !value
//将没有赋值的属性去除
interface Obj {
    [name:string]: any
}
// 请求配置接口
interface RequestConfigs extends RequestInit {
  data?: object;
  token?: string;
}
export const clearObject = (obj:Obj) => {
   const result = { ...obj };
   Object.keys(result).forEach(key => {
       if(isHasValue(result[key])) {
         delete result[key]      
       }
   });
   return result;
}
// 请求地址
const baseUrl = process.env.REACT_APP_API_URL;
// http请求 
export const $http = async (url: string, { data, token, headers, ...configs }: RequestConfigs) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...configs
  };
  if(config.method.toUpperCase() === 'GET') {
    url+=`?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${baseUrl}/${url}`, config)
    .then(async response => {
      if(response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({message: '请登录'})
      }
      const data = await response.json();
      if(response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
};
export const useHttp = () => {
  const { user } = useAuth();
  return useCallback((url:string, config:RequestConfigs ={}) => $http(url, { ...config, token: user?.token }), [user?.token])
}