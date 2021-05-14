import React from 'react';
import { Popover, Typography, List, Divider, Button } from 'antd';
import { useList } from 'hooks/useList';
import styled from '@emotion/styled';
// 项目
const ProjectPopover = (props: {compositionButton: JSX.Element }) => {
    const { data, isLoading } = useList();
    const pinnedProjects = data?.filter((item) => item.pin);
    const content = <ProjectHeaderContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                { pinnedProjects?.map(item => <List.Item key={item.id}>
                    <List.Item.Meta title={item.name}></List.Item.Meta>
                </List.Item>) }
            </List>
            <PreojectDivider/>
            {props.compositionButton}
    </ProjectHeaderContainer>
    return(
        <Popover placement="bottom" content={content} >
            <span>项目</span>
        </Popover>
    )
}
const ProjectHeaderContainer = styled.div`
  width: 20rem;
`
const PreojectDivider = styled(Divider)`
  margin: 1rem 0;
`
export default ProjectPopover