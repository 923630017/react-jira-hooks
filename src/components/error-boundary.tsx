// 错误边界 就是js内部的错误，例如某个字段不存在某个属性，写在react中了，会导致导致ui树不渲染
// 错误边界就是备份ui，必须用class组件
import React from 'react';
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
class ErrorBoundary extends React.Component<{children: React.ReactNode, fallbackRender: FallbackRender}, { error: Error | null }> {
    state= {
      error: null,
    };
    // 当子组件报错，这里会接收并且会抛出错误
    static getDerivedStateFromError(error: Error) {
      return {error};
    };
    render() {
        const { error } = this.state;
        const { fallbackRender, children } = this.props;
        if(error) {
            return(
                fallbackRender({error})
            )
        }
        return children;
    }
}
export default ErrorBoundary;
