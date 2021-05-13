import { useUser } from 'hooks/useUser';
import React from 'react';
import IdSelect, { IdSelectProps } from './id-select';
const UserSelect:React.FC<IdSelectProps> = (props) => {
    const { data: user } = useUser();
    return (
        <IdSelect options={ user || []} { ...props }></IdSelect>
    )
}
export default UserSelect;