import React from "react";
import SearchPannel  from './searchPanel';
import List  from './list';
import { useDebounce } from 'hooks/useDebounce';
import styled from '@emotion/styled';
import { useList } from 'hooks/useList';
import { useUser } from 'hooks/useUser';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useSerachParams } from './until';
export interface User {
    id: number;
    name: string;
    token: string
}
export type ParamsUser = Partial<Pick<ListItem, 'name' | 'personId'>>
export interface ListItem {
    id: number;
    name: string;
    personId: number;
    organization: string;
    created: number;
    pin: boolean;
}
const Project:React.FC = () => {
    const [params, setParams] = useSerachParams();
    // 防抖含函数
    const newValue = useDebounce(params, 800);
    // 列表hooks
    const {isLoading, data, retry} =  useList(newValue);
    // 获取用户数据
    const { data: user } = useUser();
    // 设置页面标题
    useDocumentTitle('项目列表', false);
    return (
        <Container>
           <SearchPannel params={params}  setParams={setParams} user={user || []}></SearchPannel>
           <List loading={isLoading} retry={retry} dataSource={ data || [] } users={user || []}></List>
        </Container>
    )
};
export default Project;
const Container = styled.div`
    padding: 3.2rem;
`