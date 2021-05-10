import React from 'react';
import ProjectList from 'page/projectList/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/flexLib';
const AuthenticatedApp:React.FC = () => {
    const { logout } = useAuth();
    return(
        <Container>
           <Header between={true}>
               <HeaderLeft gap={true}>
                   <h3>LOGO</h3>
                   <h3>项目</h3>
                   <h3>用户</h3>
               </HeaderLeft>
               <HeaderRight>
                    <button onClick={logout}>退出</button>
               </HeaderRight>
            </Header>
           <Main>
                <ProjectList></ProjectList>  
           </Main>
        </Container>
    )
}
export default AuthenticatedApp;
// grid-area 给子元素起名
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div`
`
const Main = styled.main``
const Container = styled.div`
  display: grid;
  // 竖直方向 6rem 随意 6rem
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
