import React, { useState, useEffect } from "react";
import SearchPannel  from './searchPanel';
import List  from './list';
import { clearObject, useHttp } from 'common/utils';
import { useDebounce } from 'hooks/useDebounce';
import { useMount } from 'hooks/useMount';

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
    created: Date
}
const Project:React.FC = () => {
    // 兄弟传值，可以通过变量提升，也就是将变量提生到父组件
    const [params, setParams] = useState<ParamsUser>({
        name: '',
        personId: '',
    }); // 搜索参数
    // 筛选信息列表
    const [ user, setUser ] = useState<User[]>([]);
    // 请求出的列表数据
    const [ list, setList ] = useState<ListItem[]>([]);
    // 防抖含函数
    const newValue = useDebounce(params, 800);
    const requestHttp = useHttp();
    // 获取表格数据数据
    useEffect(() => {
        requestHttp('projects', { data: clearObject(newValue) }).then(res=> { setList(res) })
    }, [newValue]) //params改变才请求
    // 获取用户数据
    useMount(() => {
      requestHttp('users').then(res => { setUser(res) })
    });
    return (
        <div className='project-list'>
           <SearchPannel params={params} setParams={setParams} user={user}></SearchPannel>
           <List list={list} users={user}></List>
        </div>
    )
};
export default Project;