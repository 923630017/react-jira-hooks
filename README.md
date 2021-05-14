
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
// 不能将非基本类型的值和非状态定义的值放在依赖项，否在会循环执行
export function useMount(fn: () => void) {
    useEffect(() => {
        fn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //在这里会警告， 让你将fn填入到检测数据中，但这样会造成无限循环； 这与useMemo和useCallBack有关; 
}
****
// useMemo和useCallback应用场景： 在自定义hook中有函数返回或者不是useState定义的非基本类型变量，儿返回的函数或者变量需要作为useeffect的依赖项时，那么这个返回值必须必须要用useMemo或者useCallback包裹定义；
// useCallback 中函数有setState和state同时做依赖项时，如果函数中setState赋值时，必须使用函数类型赋值，不然会造成无线循环；
// react-router-dom
    当前路由为/data
    <Link to='/data1' />：会跳转到： baseurl + /data1
    <Link to='data1' />： 会跳转到： baseurl + data/data1

// useMemo/useEffect等有依赖项的hook，其依赖项为object类型且不是hook内部方法定义的依赖项数据时，可能导致useMemo/useEffect等有依赖项的hook无线循环；

type props = React.ComponentProps<typeof AA组件名称> //获取组件AA的属性


*** useState定义函数，函数会在页面初始化时不停的执行
  const [lazy, setLazy] = useState(() => { xxxx });
  默认认为传入函数为惰性初始 state；必须要有返回值， 不然无线执行，消耗性能
  // 定义函数为变量时，方法如下：
  *1： export default function App() {
        // 定义函数为state时 必须保证返回值为该函数 惰性初始 state规则;
        // 不然以useState(() =>{ alert('old function') })这种方式。会一直会循环执行
        const [lazy, setLazy] = useState(() => () =>{ alert('old function') })
        console.log(lazy); // () => { alert('old function') }
        return (
            <div className="App">
            <button 
                onClick={() => { setLazy(() => () => { alert('new function') }) }}
            >修改函数</button>
            <button
                onClick={() => { lazy() }}>执行函数</button>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
            </div>
        );
    }
    *2 export default function App() {
            //利用ref定义函数值时； 其ref的状态改变不会导致页面重新刷新
            const callbackRef = useRef(() => { alert('old function')})
            console.log(callbackRef.current); // () => { alert('old function') }
            const callback = callbackRef.current;
            return (
                <div className="App">
                <button 
                    // 修改ref current
                    onClick={() => { callbackRef.current= () => { alert('new function1') } }}
                >修改函数</button>
                <button
                    // callbackRef.current()会更新； 但是callback在页面第一次加载后就不会刷新， 因此上面会跟新
                    // 下班执行函数不会改变
                    // onClick={() => { callbackRef.current() }}>执行函数</button>
                    onClick={() => { callback() }}>执行函数</button>
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
                </div>
            );
        }