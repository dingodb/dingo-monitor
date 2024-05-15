import React, { useEffect, useState } from 'react'
import './index.less'
import { getLogs } from '@/services'
import { Button, Table, Tag, Tooltip } from 'antd';
import hljs from 'highlight.js';
import { history } from 'umi';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

export default (props) => {
  const [logData, setLogData] = useState('')

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    getLogs().then(res => {
      setLogData(res || '')
    })
  }

  const download = () => {
    const a = document.createElement('a');
    a.href = 'data:attachment/csv,' + encodeURIComponent(logData);
    a.download = 'log.txt';
    a.click();
  }

  return (
    <div className='basePage log_page scrollBar'>
      <div className="baseTitle">日志(last 10,000 lines)
        <div className='gap8'>
          <Button type='primary' icon={<ReloadOutlined />} onClick={init}>刷新</Button>
          <Button type='primary' icon={<DownloadOutlined />} onClick={download}>下载</Button></div>
      </div>
      <div className="content">{logData}</div>
    </div>
  )
}