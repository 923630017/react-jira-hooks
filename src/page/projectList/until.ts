import { useMemo } from 'react';
import { useUrlQueryParam } from "hooks/useUrlQueryParam";

export const useSerachParams = () => {
    // 搜索参数 这里的params的personId是字符串，需要转化为数字
    const [params, setParams] = useUrlQueryParam(['name', 'personId']);
    // 将personId参数转化为数字
    const projectParams = useMemo(() => ({ ...params, personId: Number(params.personId) || undefined}), [params])
    return [projectParams, setParams] as const;
}