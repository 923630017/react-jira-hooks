import React from 'react';
import Register from './register';
import Login from './login';
import { Card } from 'antd';
const UnauthenticatedApp:React.FC = () => {
    const [ isRegister, setIsRegister] = React.useState(false);
    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            <Card bordered={false}>
                {
                    isRegister ? <Register/> : <Login/>
                }
                <button onClick={() => setIsRegister(!isRegister) }>切换到{isRegister ? '登录' : '注册'}</button>
            </Card>
        </div>
    )
}
export default UnauthenticatedApp;