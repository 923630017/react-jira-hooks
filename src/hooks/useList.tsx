import { useEffect } from 'react'
import { message } from 'antd';
import { ParamsUser, ListItem } from "page/projectList";
import { clearObject, useHttp } from 'common/utils';
// 所有请求的状态等hooks
import { useAsync } from 'hooks/useAsync';
//列表请求高度封装 包括状态数据执行等
export const useList = (params?: Partial<ParamsUser>) => {
    const { run, ...result } = useAsync<ListItem[]>();
    const requestHttp = useHttp();
    // 获取表格数据数据
    useEffect(() => {
        run(requestHttp('projects', { data: clearObject(params || {})}))
        if(result.isError) {
           message.error(result.error?.message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    return result
}
//编辑列表
export const useEditList = () => {
    const requestHttp = useHttp();
    const {run, ...restProps} = useAsync();
    const edit = (params: Partial<ListItem>) => {
        return run(requestHttp(`projects/${params.id}`,{
            data: params,
            method: 'PATCH',
        }))
    }
    return {
        edit,
        ...restProps
    }
}; 