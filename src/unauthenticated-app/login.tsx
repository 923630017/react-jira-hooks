import React from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd';
// 登录注册样式引入
import { LongButton  } from './index';
import { useAsync } from 'hooks/useAsync';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
export interface LoginParams {
    username: string;
    password: string;
}
interface LoginProps {
    onError: (error: Error) => void;
}
export const Login:React.FC<LoginProps> = ({ onError }) => {
    const { login } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwError: true });
    const handleSubmit = (value:LoginParams) => {
        run(login(value)).catch((err) => {
            onError(err);
        });
    };
    // useDocumentTitle('登录');
    return (
        <div className='login'>
            <Form onFinish={(values) => {
                handleSubmit(values)
            }}>
                <Form.Item name='username' rules={[{ required: true, message: '请输入用户名'}]}>
                    <Input placeholder="输入用户名"/>
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: '密码'}]}>
                    <Input type="password" placeholder="输入密码"/>
                </Form.Item>
                <Form.Item className="submit-btn">
                    <LongButton loading={isLoading} htmlType="submit" type="primary">登录</LongButton>
                </Form.Item>    
            </Form>    
        </div>
    )
}
export default Login
