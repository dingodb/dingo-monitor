import React, { useEffect, useState } from 'react'
import './index.less'
import { getSqlStmt } from '@/services'
import { Button, Table, Tag, Tooltip } from 'antd';
import hljs from 'highlight.js';
import { history } from 'umi';
import { ReloadOutlined } from '@ant-design/icons';

export default (props) => {
  const [sqlData, setSqlData] = useState([])

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    getSqlStmt().then(res => {
      if (res.length) {
        res.map((item, index) => {
          item.indexNo = index + 1
        })
      }
      setSqlData(res || [])
    })
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'indexNo',
      width: '10%',
    },
    {
      title: 'SQL语句',
      dataIndex: 'sqlText',
      render: (text) => <a>{text}ms</a>,
      ellipsis: true,
      width: '50%',
      render: (text) => {
        const contentText = hljs.highlightAuto(text).value
        return <Tooltip overlayInnerStyle={{
          minWidth: '600px',
          maxHeight: '500px',
          overflowY: 'scroll',
        }} placement='bottom' title={
          <pre className='code_tooltip'>
            <code dangerouslySetInnerHTML={{ __html: contentText }}></code>
          </pre>
        }>
          <pre className='code_tooltip textEllipsisCode'>
            <code dangerouslySetInnerHTML={{ __html: contentText }}></code>
          </pre>
        </Tooltip>
      }
    },
    {
      title: 'lastSeen',
      dataIndex: 'lastSeen',
      width: '10%',
    },
    {
      title: '总耗时',
      dataIndex: 'sumLatency',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
      sorter: (a, b) => a.sumLatency - b.sumLatency,
    },
    {
      title: '平均耗时',
      dataIndex: 'avgLatency',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
      sorter: (a, b) => a.avgLatency - b.avgLatency,
    },
    {
      title: '执行次数',
      dataIndex: 'execCount',
      width: '10%',
      sorter: (a, b) => a.execCount - b.execCount,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '10%',
    },
  ];


  const onClick = (record) => {
    console.log('record:', record)
    if (record.id) {
      history.push(`/sqlAnalysis/sqlDetail?id=${record.id}`)
    }
  }

  return (
    <div className='basePage SQLList_page'>
      <div className="baseTitle">SQL 语句分析  <Button type='primary' icon={<ReloadOutlined />} onClick={init}>刷新</Button></div>
      <Table
        rowKey={'indexNo'}
        onRow={(record) => ({
          onClick: e => onClick(record)
        })} columns={columns} dataSource={sqlData} pagination={{
          showSizeChanger: false,
          onChange: (page, pageSize) => {
            console.log('page:', page, pageSize)
          }
        }} />
    </div>
  )
}