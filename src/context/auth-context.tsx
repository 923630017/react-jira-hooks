import React,{ createContext } from 'react';
import { LoginParams } from 'unauthenticated-app/login';
import * as auth from '../auth-provider';
import { User } from 'page/projectList';
import { $http } from 'common/utils';
import { useMount } from 'hooks/useMount';
import { useAsync } from 'hooks/useAsync';
import FullPageLoading from 'components/flexLib';
const AuthContext = createContext<undefined | {
    user: User | null,
    login: (params:LoginParams) => Promise<void>,
    logout: () => Promise<void>,
    register: (params:LoginParams) => Promise<void>,
    error: Error | null
}> (undefined);
AuthContext.displayName = "AuthContext";

// 初始化user
const initUser = async () => {
   let user = null;
   const token = auth.getToken();
   if(token) {
     const data = await $http('me', { token });
     user = data.user;
   }
   return user;
}
export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    // const [ user, setUser ] = React.useState<User | null>(null);
    const { data: user, isLoading, isStart, setData: setUser, error, run } = useAsync<User | null>()
    const login = (from:LoginParams) => auth.login(from).then(res => { setUser(res) });
    const register = ( from: LoginParams ) => auth.register(from).then((res) => {setUser(res)});
    const logout = () => auth.logout().then(() => {setUser(null)});
    useMount(() => {
        run(initUser())
    });
    if(isStart || isLoading) {
        return (
            <FullPageLoading/>
        )
    }
    return <AuthContext.Provider children={children} value={{ user, login, register, logout, error }}></AuthContext.Provider>
}
// 使用context的hooks
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth 必须在AuthPrvider中使用');
    }
    return context
}