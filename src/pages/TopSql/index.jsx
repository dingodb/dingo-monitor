import React, { useEffect, useState } from 'react'
import './index.less'
import { getTopSql } from '@/services'
import { Button, Space, Table, Tag, Tooltip, message } from 'antd';
import hljs from 'highlight.js';
import { ReloadOutlined } from '@ant-design/icons';

export default (props) => {
  const [sqlData, setSqlData] = useState([])
  const [selectData, setSelectData] = useState({})

  useEffect(() => {
    init();
  }, [])

  const init = () => {
    getTopSql().then(res => {
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
      title: '累计 CPU 耗时',
      dataIndex: 'sumLatency',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
      sorter: (a, b) => a.sumLatency - b.sumLatency,
    },
    {
      title: 'SQL语句',
      dataIndex: 'sqlText',
      render: (text) => <a>{text}ms</a>,
      ellipsis: true,
      width: '80%',
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
  ];


  const columns2 = [
    {
      title: '总耗时',
      dataIndex: 'sumLatency',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
    },
    {
      title: '执行计划',
      dataIndex: 'plan',
      width: '40%',
      ellipsis: true,
    },
    {
      title: '平均耗时',
      dataIndex: 'avgLatency',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
    },
    {
      title: '执行次数',
      dataIndex: 'execCount',
      width: '10%',
    },
    {
      title: '第一次执行时间',
      dataIndex: 'firstSeen',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
    },
    {
      title: '最后一次执行时间',
      dataIndex: 'lastSeen',
      width: '10%',
      render: (text) => <a>{text}ms</a>,
    },

  ]

  const onClick = (record) => {
    console.log(record)
    setSelectData(record)
  }

  const copy = (text) => {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select(); // 选中文本
    document.execCommand("copy"); // 执行浏览器复制命令
    document.body.removeChild(input);
    message.success('复制成功');
  }

  return (
    <div className='basePage topSQL_page'>
      <div className="baseTitle">Top SQL  <Button type='primary' icon={<ReloadOutlined />} onClick={init}>刷新</Button></div>
      <Table
        rowKey={'sqlText'}
        columns={columns}
        dataSource={sqlData}
        pagination={false}
        onRow={(record) => ({
          onClick: e => onClick(record)
        })}
      />

      {
        selectData.sqlText && <><div className="baseTitle">SQL详情</div>
          <div className='sqlDetail'>

            <Table
              rowKey={'sqlText'}
              columns={columns2}
              dataSource={[selectData]}
              pagination={false}
            />
            <div className="copyInfo">
              <div className="btns">
                <div className="name">SQL id</div>
                <div className="btn" onClick={() => copy(selectData.id)}>复制</div>
              </div>
              <div className="data textEllipsis">{selectData.id}</div>
            </div>
            <div className="copyInfo">
              <div className="btns">
                <div className="name">SQL 模板</div>
                <div className="btn" onClick={() => copy(selectData.sqlText)}>复制</div>
              </div>
              <div className="data textEllipsis">{selectData.sqlText}</div>
            </div>
            <div className="copyInfo">
              <div className="btns">
                <div className="name">执行计划</div>
                <div className="btn" onClick={() => copy(selectData.plan)}>复制</div>
              </div>
              <div className="data">{selectData.plan}</div>
            </div>
          </div></>
      }
    </div>
  )
}