import React from 'react';
import { useAuth } from 'context/auth-context';
import { Form, Input } from 'antd';
// 登录注册样式引入
import { LongButton  } from './index';
import { useAsync } from 'hooks/useAsync';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
export interface RegisterParams {
    username: string;
    password: string;
    cpassword: string;
}
interface RegisterProps {
    onError: (error: Error) => void;
}
export const Register:React.FC<RegisterProps> = ({onError}) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync();
    const handleSubmit = (value:RegisterParams) => {
        const params = {
            username: value.username,
            password: value.password,
        }
        run(register(params)).catch((err) => {
            onError(err);
        });
    };
    useDocumentTitle('注册');
    return (
        <div className='register'>
            <Form onFinish={(values) => {
                handleSubmit(values)
            }}>
                <Form.Item name='username' rules={[{ required: true, message: '请输入用户名'}]}>
                    <Input placeholder="输入用户名"/>
                </Form.Item>
                <Form.Item
                    name='password'
                    hasFeedback
                    rules={[{ required: true, message: '请输入密码'}]}>
                    <Input type="password" placeholder="输入密码"/>
                </Form.Item>
                <Form.Item
                    name='cpassword'
                    hasFeedback
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请确认密码'},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('密码不一致，请确认密码!'));
                            },
                        }),
                    ]}>
                    <Input type="password" placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item className="submit-btn">
                    <LongButton loading={isLoading} htmlType="submit" type="primary">注册</LongButton>
                </Form.Item>    
            </Form>    
        </div>
    )
}

export default Register;
