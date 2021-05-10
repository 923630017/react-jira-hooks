import React from 'react';
import { AuthProvider }   from './auth-context';
import {QueryClient, QueryClientProvider} from 'react-query'
// 所有全局数据
export const AppProviders = ({children}: { children: React.ReactNode}) => {
    return (
       <QueryClientProvider client={new QueryClient()}>
           <AuthProvider>
                {children}
            </AuthProvider> 
       </QueryClientProvider>
    )
}