import React from "react";
import { User, ParamsUser } from './index';
import { Select, Input, Form } from 'antd';
interface SearchPannelProps {
    params: ParamsUser;
    user: User[];
    setParams: (params: SearchPannelProps['params']) => void;
}
const SearchPannel:React.FC<SearchPannelProps> = (props) => {
    const { params, setParams, user } = props;
    const info:any = undefined;
     return (
        <Form style={{marginBottom: '2rem'}} layout="inline">
            { info.name}
            <Form.Item>
                <Input type="text" value={params.name} onChange={e => setParams({
                    ...params,
                    name: e.target.value
                })}/>
            </Form.Item>
            <Form.Item>
                <Select value={params.personId} onChange={value => setParams({
                    ...params,
                    personId: value
                })}>
                    <Select.Option value="">负责人</Select.Option>
                    { user && user.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>) }
                </Select>
            </Form.Item>
        </Form>
    )
}
export default SearchPannel;