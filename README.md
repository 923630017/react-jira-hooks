
### `yarn start`


### `yarn test`


### `yarn build`



### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


auth-provider.ts:目的是将token存入本地;在真实环境中，firebase第三方auth服务，本文件不需要开发

authenticated-app.tsx //登录状态的页面
unauthenticated-app 未登录的页面


ts: 
// 将类型别名的所有属性转化为可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};
例如： 
type Person {
    name: string;
    age: number
}
Partial<Person>
转化为
{
    name?: string;
    age?: number   
}


/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid，一维布局是指只有某一方向的布局， 二位布局指既有竖直方向又有横向
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */
 import React from 'react';
import ProjectList from 'page/projectList/index';
import { useAuth } from './context/auth-context';
import styled from '@emotion/styled';
import { Row } from 'components/flexLib';
const AuthenticatedApp:React.FC = () => {
    const { logout } = useAuth();
    return(
        <Container>
           <Header>
               <HeaderLeft gap={true}>
                   <h3>LOGO</h3>
                   <h3>项目</h3>
                   <h3>用户</h3>
               </HeaderLeft>
               <HeaderRight>
                    <button onClick={logout}>退出</button>
               </HeaderRight>
            </Header>
           <Nav>nav</Nav>
           <Main>
                <ProjectList></ProjectList>  
           </Main>
           <Aside>aside</Aside>
           <Footer>footer</Footer>
        </Container>
    )
}
export default AuthenticatedApp;
// grid-area 给子元素起名
const Header = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const HeaderLeft = styled.div(Row)
const HeaderRight = styled.div`
`
const Main = styled.main`grid-area: main;`
const Nav = styled.nav`grid-area: nav;`
const Aside = styled.aside`grid-area: aside;`
const Footer = styled.footer`grid-area: footer;`
const Container = styled.div`
  display: grid;
  // 竖直方向 6rem 随意 6rem
  grid-template-rows: 6rem 1fr 6rem;
  // 水平方向
  grid-template-columns: 20rem 1fr 20rem;
  // 左右分布
  grid-template-areas: 
    "header header header"
    "nav main aside"
    "footer footer footer"
  ;
  height: 100vh;
`
