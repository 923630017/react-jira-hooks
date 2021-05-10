import React from 'react';
import ProjectList from 'page/projectList/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
// 将svg作为组件引入
import { ReactComponent as SoftwareSvg } from 'common/img/software-logo.svg';
import { Row } from 'components/flexLib';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const AuthenticatedApp:React.FC = () => {
    const { logout, user } = useAuth();
    return(
        <Container>
           <Header between={true}>
               <HeaderLeft gap={true}>
                   {/* svg */}
                   <SoftwareSvg width={'200px'} color={'deeppink'}></SoftwareSvg>
                   <h3>项目</h3>
                   <h3>用户</h3>
               </HeaderLeft>
               <HeaderRight>
                   <Dropdown overlay={
                       <Menu>
                          <Menu.Item key="logout">
                            <Button type={'link'} onClick={logout}>退出</Button>
                          </Menu.Item>
                       </Menu>
                   }>
                       <Button type={'link'}  onClick={e => e.preventDefault()}>
                        Hi, {user?.name} <DownOutlined />
                       </Button>
                   </Dropdown>
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
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
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
