// 对组件中select value是数字时；
import { Select } from 'antd';
import React from 'react';
type NewSelectProps = React.ComponentProps<typeof Select>;
export interface IdSelectProps extends Omit<NewSelectProps, 'options' | 'onChange' | 'value'>{
    value: string | number | undefined | null; 
    defaultName?: string; //默认项的显示值
    onChange: (value: number | undefined) => void;
    options?: { name: string, id: number }[];
};
/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
const toNumber = (value:any) => isNaN(Number(value)) ? 0 : Number(value);  
const IdSelect:React.FC<IdSelectProps> = (props) => {
    const { value, defaultName, onChange, options, ...restProps } = props;
    return (
        <Select
            value={ options?.length ? toNumber(value) : 0}
            onChange={value => onChange(toNumber(value) || undefined)}
            { ...restProps }
        >
            {
               defaultName?<Select.Option value={0}>{defaultName}</Select.Option>:null
            }
            { 
               options?.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
            }
        </Select> 
    )
}
export default IdSelect;