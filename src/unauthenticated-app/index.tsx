import React, { useEffect, useState } from 'react';
import Register from './register';
import Login from './login';
import { Card, Divider, Button, message } from 'antd';
import styled from '@emotion/styled';
import logo from 'common/img/logo.svg';
import leftPic from 'common/img/left.svg';
import rightPic from 'common/img/right.svg';
import { useAuth } from 'context/auth-context';
const UnauthenticatedApp:React.FC = () => {
    const [ isRegister, setIsRegister] = React.useState(false);
    //获取token时报错，退出到登录页面报错提示
    const { error:logoutError } = useAuth();
    useEffect(() => {
      if(logoutError && !isRegister) {
        message.error(logoutError.message)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // 定义error情形
    const [error, setError] = useState<Error | null>(null);
    React.useEffect(() => {
      if(error?.message) {
        message.error(error?.message)
      };
    }, [error]);
    return(
        <Container>
            <Header></Header>
            <BackGround></BackGround>
            <LoginCard bordered={false}>
                <Title>{!isRegister ? '登录' : '注册'}</Title>
                {
                    isRegister ? <Register onError={setError}/> : <Login onError={setError}/>
                }
                <Divider></Divider>
                <Button type='link'  onClick={() => setIsRegister(!isRegister) }>切换到{isRegister ? '已有账号？请登录' : '没有账号？请先注册'}</Button>
            </LoginCard>
        </Container>
    )
}
export default UnauthenticatedApp;

// 相当于封装的组件
const Container = styled.div`
  display:flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;
export const LongButton = styled(Button)`
  width: 100%;
`
const Title = styled.h2`
  margin-bottom: 2rem;
`
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  width: 100%;
  padding: 5rem 0;
`
const BackGround = styled.div`
  width: 100%;
  height:100%;
  position:absolute;
  background-repeat: no-repeat;
  // 当页面滚动时，背景图是否随着滚动
  // scroll 默认值；会滚动； fixed不会滚动
  background-attachment: fixed;
  //背景图定位
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${leftPic}), url(${rightPic});
`
const LoginCard = styled(Card)`
   width: 40rem;
   min-height: 56rem;
   text-align:center;
   padding: 3.2rem 4rem;
   box-sizing: border-box;
   box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
   border-radius: 0.3rem
`;