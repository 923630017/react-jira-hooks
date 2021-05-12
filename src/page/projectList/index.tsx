import React, { useEffect, useState } from "react";
import SearchPannel  from './searchPanel';
import List  from './list';
import { useDebounce } from 'hooks/useDebounce';
import styled from '@emotion/styled';
import { useList } from 'hooks/useList';
import { useUser } from 'hooks/useUser';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useUrlQueryParam } from "hooks/useUrlQueryParam";
export interface User {
    id: number;
    name: string;
    token: string
}
export interface ParamsUser {
    name: string,
    personId: string;
}
export interface ListItem {
    id: number,
    name: string,
    personId: number,
    organization: string,
    created: number
}
const Project:React.FC = () => {
    // 搜索参数
    const [params, setParams] = useUrlQueryParam(['name', 'personId'])
    // 防抖含函数
    const newValue = useDebounce(params, 800);
    // 列表hooks
    const {isLoading, data} =  useList(newValue);
    // 获取用户数据
    const { data: user } = useUser();
    // 设置页面标题
    useDocumentTitle('项目列表', false);
    return (
        <Container>
           <SearchPannel params={params} setParams={setParams} user={user || []}></SearchPannel>
           <List loading={isLoading} dataSource={ data || [] } users={user || []}></List>
        </Container>
    )
};
export default Project;
const Container = styled.div`
    padding: 3.2rem;
`