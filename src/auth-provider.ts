import { User } from './page/projectList/index';
// 将token存储到本地
const localStorageKey = '__auth_token__';
// 请求地址
const baseUrl = process.env.REACT_APP_API_URL;
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 处理token存储到本地
const handleToken = (user:{ user: User }) => {
  localStorage.setItem(localStorageKey, user.user.token || '');
  return user.user;
}
/// 登录
export const login = (data: { username: string, password: string }) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async response => {
        if(response.ok) {
           return handleToken(await response.json())
        } else {
           return Promise.reject(await response.json())
        }
    });
}
// 注册
export const register = (data: { username: string, password: string }) => {
    return fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async response => {
        if(response.ok) {
            return handleToken(await response.json())
         } else {
            return Promise.reject(await response.json())
         }
    });
}
// 推出登录
export const logout = async () => localStorage.removeItem(localStorageKey)  