import React from "react";
import { ListItem, User } from './index';
import { Table, TableProps } from 'antd';
//引入culumns泛型
import { ColumnsType } from 'antd/es/table';
import dayjs from "dayjs";
export interface ListProps extends TableProps<ListItem> {
    users: User[];
}
const List:React.FC<ListProps> = (props) => {
    const { users, pagination, ...restProps } = props;
    const columns:ColumnsType<ListItem> = [
        { title: '名称', 
          dataIndex: 'name',
          key: 'name',
          sorter:(a, b) => a.name.localeCompare(b.name),
          align: "center"
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