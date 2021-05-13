// 收藏组件
import { Rate } from 'antd';
import React from 'react';

export interface PinProps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckChange?:(check: boolean) =>void
};
const Pin:React.FC<PinProps> = (props) => {
    const { checked, onCheckChange, ...restProps } = props;
    return(
        <Rate
          count={1}
          value={ checked ? 1 : 0 }
          onChange={(value: number) => onCheckChange?.(!!value)}
          {...restProps}></Rate>
    )
}
export default Pin;