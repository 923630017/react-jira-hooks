import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
interface ProjectModal {
    onClose: () => void;
    visible: boolean;
}
const ProjectModal:React.FC<ProjectModal> = (props) => {
    const { visible, onClose } = props;
    return (
        <Drawer
        width={'100%'}
        title="Basic Drawer"
        placement="right"
        closable
        onClose={onClose}
        visible={visible}
      >
        <Button onClick={() => {onClose()}}>关闭</Button>
      </Drawer>
    )
}
export default ProjectModal;