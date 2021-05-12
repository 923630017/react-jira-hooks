import React from 'react';
import ProjectList from 'page/projectList/index';
import ProjectScreen from 'page/projectScreen/index'; //项目看板
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
// 将svg作为组件引入
import { ReactComponent as SoftwareSvg } from 'common/img/software-logo.svg';
import { Row } from 'components/flexLib';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//引入路由
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
const AuthenticatedApp:React.FC = () => {
    return(
        <Container>
            <ContentHeader></ContentHeader>
            <Main>
                <Router>
                    <Routes>
                        {/* 路由中*指匹配匹配下面所有的路径 */}
                        <Route path={'/project-list'} element={<ProjectList></ProjectList>}></Route>
                        <Route path={'/project-list/:id/*'}  element={<ProjectScreen/>}></Route>
                        <Navigate to={'/project-list'}></Navigate>
                    </Routes>
                </Router>
            </Main>
        </Container>
    )
}
const ContentHeader = () => {
    const { logout, user } = useAuth();
    return (
    <Header between={true}>
        <HeaderLeft gap={true}>
            {/* svg */}
            <Button type='link' onClick={() => { window.location.href = window.location.origin }}>
                <SoftwareSvg width={'200px'} height={'30px'} color={'deeppink'}></SoftwareSvg>
            </Button>
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
                <NameButton type={'link'}  onClick={e => e.preventDefault()}>
                Hi, {user?.name} <DownOutlined />
                </NameButton>
            </Dropdown>
        </HeaderRight>
    </Header>)
}
export default AuthenticatedApp;
// grid-area 给子元素起名
const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const NameButton = styled(Button)`
    font-weight: 600;
`
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
