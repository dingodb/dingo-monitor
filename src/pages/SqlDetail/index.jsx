import React, { useEffect, useState } from 'react'
import './index.less'
import { getSqlStmt } from '@/services'
import { Space, Table, Tag, Tabs, message } from 'antd';
import hljs from 'highlight.js';
import TreeTable from './table'
import Rect from './rect'

export default (props) => {
  const [sqlData, setSqlData] = useState([])
  const [selectData, setSelectData] = useState({})
  const search = new URLSearchParams(window.location.hash.split('?')[1])
  const id = search.get("id"); //history_id
  const renderList = ['schema', 'simpleUser',
    'execCount',
    'sumLatency',
    'avgLatency',
    'firstSeen',
    'lastSeen', ,
    'sumPlanLatency',
    'avgPlanLatency',
    'sumParseLatency',
    'avgParseLatency',
    'sumOptimizeLatency',
    'avgOptimizeLatency',
    'sumLockLatency',
    'avgLockLatency',
    'sumJobLatency',
    'avgJobLatency',
    'sumPrewriteLatency',
    'avgPrewriteLatency',
    'sumCommitLatency',
    'avgCommitLatency',
    'sumResultCount',
    'avgResultCount',
    'sumAffectedRows',
    'avgAffectedRows',
  ]

  useEffect(() => {
    if (id) {
      getSqlStmt().then(res => {
        setSqlData(res || [])
        console.log(res.find(item => item.id == id) || {})
        setSelectData(res.find(item => item.id == id) || {})
      })
    }
  }, [id])


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
    <div className='basePage SQLDetail_page'>
      <div className="baseTitle">SQL详情</div>
      <div className='sqlDetail'>
        <div className="copyInfo">
          <div className="btns">
            <div className="name">SQL id</div>
            <div className="btn" onClick={() => copy(selectData.id)}>复制</div>
          </div>
          <div className="data textEllipsis">{selectData.id}</div>
        </div>
        {
          selectData.sqlText && <div className="copyInfo">
            <div className="btns">
              <div className="name">SQL 模板</div>
              <div className="btn" onClick={() => copy(selectData.sqlText)}>复制</div>
            </div>
            <div className="data textEllipsis">{selectData.sqlText}</div>
          </div>}
      </div>
      <div className="baseTitle">执行详情</div>
      <Tabs defaultActiveKey="1" items={[
        {
          key: '1',
          label: '表格',
          children: <TreeTable string={selectData.plan} />,
        },
        {
          key: '2',
          label: '图形',
          children: selectData.binaryPlan ? <Rect data={selectData.binaryPlan} /> : '无可展示图形',
        },
      ]} />

      <div className="baseTitle"> 基本详情</div>
      <div className="baseInfo">
        {
          renderList.map(item => (
            <div className="info_item">
              <div className="name">{item}</div>
              <div className="value textEllipsis">{selectData[item]}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}