import React from 'react';
import { useAuth } from 'context/auth-context';
import { Button, Form, Input } from 'antd';
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
                    <Button htmlType="submit" type="primary">注册</Button>
                </Form.Item>    
            </Form>    
        </div>
    )
}

export default Register;
