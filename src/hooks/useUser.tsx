// 请求用户
import { useEffect } from 'react'
import { message } from 'antd';
import { User } from "page/projectList";
import { clearObject, useHttp } from 'common/utils';
// 所有请求的状态等hooks
import { useAsync } from 'hooks/useAsync';
//列表请求高度封装 包括状态数据执行等
export const useUser = (params?: Partial<User>) => {
    const { run, ...result } = useAsync<User[]>();
    const requestHttp = useHttp();
    // 获取表格数据数据
    useEffect(() => {
        run(requestHttp('users', { data: clearObject(params || {})}))
        if(result.isError) {
           message.error(result.error?.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    return result
}