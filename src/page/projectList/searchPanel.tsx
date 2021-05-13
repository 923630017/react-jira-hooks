import React from "react";
import { User, ParamsUser } from './index';
import { Input, Form } from 'antd';
import UserSelect from 'components/userSelect';
interface SearchPannelProps {
    params: ParamsUser;
    user: User[];
    setParams: (params: SearchPannelProps['params']) => void;
}
const SearchPannel:React.FC<SearchPannelProps> = (props) => {
    const { params, setParams } = props;
     return (
        <Form style={{marginBottom: '2rem'}} layout="inline">
            <Form.Item>
                <Input type="text" value={params.name} onChange={e => setParams({
                    ...params,
                    name: e.target.value
                })}/>
            </Form.Item>
            <Form.Item>
                <UserSelect defaultName={"负责人"} value={params.personId} onChange={(value => { setParams({
                    ...params,
                    personId: value
                })})}>
                </UserSelect>
            </Form.Item>
        </Form>
    )
}
export default SearchPannel;