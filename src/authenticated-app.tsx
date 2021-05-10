import React from 'react';
import ProjectList from 'page/projectList/index';
import { useAuth } from './context/auth-context';
const AuthenticatedApp:React.FC = () => {
    const { logout } = useAuth();
    return(
        <div>
           <button onClick={logout}>退出</button>
           <ProjectList></ProjectList>
        </div>
    )
}
export default AuthenticatedApp;