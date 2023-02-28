import React from 'react'

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 240 }} spin />;
const Loading: React.FC = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Loading


