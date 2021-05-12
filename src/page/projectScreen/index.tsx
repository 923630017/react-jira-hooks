import KanBanScreen from 'page/kanban';
import TaskGroup from 'page/task';
import React from 'react'
//引入路由
import { Route, Routes, Navigate } from 'react-router';
import { Link } from 'react-router-dom';
const ProjectScreen:React.FC = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to='kanban'>看板</Link>
            <Link to='task-group'>任务组</Link>
            <Routes>
                <Route path={'/kanban'} element={<KanBanScreen></KanBanScreen>}/>
                <Route path={'/task-group'} element={<TaskGroup></TaskGroup>}/>
                {/* 默认跳转页面 */}
                <Navigate to='kanban'></Navigate>
            </Routes>
        </div>
    )
}
export default ProjectScreen;