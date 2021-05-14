import styled from '@emotion/styled';
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';
import React from 'react';
// 样式组件
export const Row = styled.div<{
    gap?: number | boolean;
    marginBottom?: number;
    between?: boolean;
}>`
    display:flex;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    align-items: center;
    margin-bottom: ${ props => props.marginBottom + 'rem' };
    > * {
      margin-top: 0!important;
      margin-bottom: 0!important;
      margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined}
    }
`
// 全屏页面
const FullPage = styled.div`
 height:100vh;
 display: flex;
 justify-content: center;
 align-items: center;
`;
interface ErrorPageProps {
  error: Error | null;
}
const ErrorBox = ({ error }: { error: any }) => {
  if (error) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
export const ErrorPage = ({error}: {error: Error | null}) => {
  return(
    <FullPage>
      <DevTools/>
      { <ErrorBox error={error}></ErrorBox>}
    </FullPage>
  )
}

//全屏加载页面
const FullPageLoading:React.FC = () => {
  return(
    <FullPage>
       <Spin size={'large'}></Spin>
    </FullPage>
  )
}
export const NoPaddingButton = styled(Button)`
  padding: 0;
`
export default FullPageLoading;