import React from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd';
// 登录注册样式引入
import { LongButton  } from './index';
export interface LoginParams {
    username: string;
    password: string;
}
export const Register:React.FC = (props) => {
    const { register } = useAuth();
    const handleSubmit = (value:LoginParams) => {
        register(value);
    };
    return (
        <div className='register'>
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
                    <LongButton htmlType="submit" type="primary">注册</LongButton>
                </Form.Item>    
            </Form>    
        </div>
    )
}

export default Register;
