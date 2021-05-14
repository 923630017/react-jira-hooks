import React from "react";
import { ListItem, User } from './index';
import { Table, TableProps } from 'antd';
//引入culumns泛型
import { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import Pin from "components/pin";
import { useEditList } from "hooks/useList";
export interface ListProps extends TableProps<ListItem> {
    users: User[];
    retry: () => void;
}
const List:React.FC<ListProps> = (props) => {
    const { users, pagination, retry, ...restProps } = props;
    const { edit, ...resultProps } = useEditList();
    //编辑收藏
    const pinProject = (id: number, pin: boolean) => { edit({id, pin}).then(() => { retry() }) }
    const columns:ColumnsType<ListItem> = [
        {
          title: <Pin checked={true} disabled></Pin>,
          dataIndex: 'pin',
          key: 'pin',
          align: 'center',
          render: (value, row) => {
            return <Pin checked={row.pin} onCheckChange={(pin) => { pinProject(row.id, pin)} }></Pin>
          }
        },
        { title: '名称', 
          dataIndex: 'name',
          key: 'name',
          sorter:(a, b) => a.name.localeCompare(b.name),
          align: "center",
          render: (value, row) => {
            return <Link to={String(row.id)}>{row.name}</Link>
          }
        },
        { title: '部门', 
          dataIndex: 'organization',
          key: 'organization',
          align: "center"
        },
        { title: '负责人', 
          dataIndex: 'personId',
          key: 'personId',
          render: (value, row) => {
            return <span>
                { users.find(userItem => userItem.id === row.personId)?.name || '未知' }
            </span>
          },
          align: 'center'
        },
        { title: '创建日期', 
          dataIndex: 'created',
          key: 'created',
          render: (value, row) => {
            return <span>
                {row.created ? dayjs(row.created).format('YYYY-MM-DD') : '无' }
            </span>
          },
          align: 'center'
        },
    ]
    return (
        <Table
          rowKey="id"
          columns={columns}
          pagination={false}
          { ...restProps}
          >
        </Table>
    )
}
export default List;