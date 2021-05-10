import React from 'react';
import { AuthProvider }   from './auth-context';
// 所有全局数据
export const AppProviders = ({children}: { children: React.ReactNode}) => {
    return (
       <AuthProvider>
           {children}
        </AuthProvider> 
    )
}