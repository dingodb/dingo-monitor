import { useModel } from '@umijs/max';
import styles from './index.less';
import { Descriptions, Tabs, Table, Button, Drawer, Row, Col } from 'antd';
import { getStoreProcessRegion, getIndexProcessRegion, queryRegion, queryProcessLeaderRegion } from '@/services';
import { useEffect, useState } from 'react';
import { useLocation, history } from '@umijs/max';

const HomePage = () => {
  const search = new URLSearchParams(useLocation().search);
  const dataType = new URLSearchParams(search).get('dataType');
  const id = new URLSearchParams(search).get('id');
  // const { dataType, host, port } = useLocation().state;
  const [dataSource, setDataSource] = useState([])
  const [regionData, setRegionData] = useState({})
  const [showDrawer, setShowDrawer] = useState(false)

  const drawerFields = ['regionType', 'createTime', 'deleteTime', 'regionState']

  useEffect(() => {
    if (dataType) init()
    if (id) leaderInit()
  }, [dataType, id])

  const init = async () => {
    const host = new URLSearchParams(search).get('host');
    const port = new URLSearchParams(search).get('port');
    let res = dataType === 'store' ? await getStoreProcessRegion({ host, port }) : await getIndexProcessRegion({ host, port })
    setDataSource(res.data || [])
  }
  const leaderInit = async () => {
    let res = await queryProcessLeaderRegion({ id })
    setDataSource(res.data || [])
  }

  const handleItemDetail = (data) => {
    console.log('查看详情')
    queryRegion({ regionId: data.regionId }).then(res => {
      console.log(res)
      setRegionData(res.data)
      setShowDrawer(true)
    })

  }

  const columns = [
    {
      title: 'RegionId',
      dataIndex: 'regionId',
      key: 'regionId',
    },
    {
      title: 'Range',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      width: '25%',
      render: (text, record, _, action) => {
        return <a onClick={() => handleItemDetail(record)}>查看详情</a>
      }
    },
  ]

  const toDetail = (url) => {
    console.log('点击')
    window.open(`http://${url}`)
  }


  return (
    <div className={styles.regionListWrapper}>
      <div className={styles.title}>Regions 列表</div>

      <Table dataSource={dataSource} columns={columns} rowKey={'regionId'} />

      <Drawer
        title="查看详情"
        placement="right"
        width={700}
        onClose={() => setShowDrawer(false)}
        open={showDrawer}
      >
        <Descriptions title="" column={2}>
          {
            drawerFields.map(item => (
              <Descriptions.Item key={item} label={item}>{regionData[item]}</Descriptions.Item>
            ))
          }
        </Descriptions>
        <div className={styles.modalTitle}>Leader</div>
        <div className={styles.typeBox}>
          <div className={styles.link} onClick={() => toDetail(regionData.leader)}>{regionData.leader}</div>
        </div>
        <div className={styles.modalTitle}>followers</div>
        <div className={styles.typeBox}>
          {
            regionData.followers?.map(item => (
              <div className={styles.link} key={item} onClick={() => toDetail(item)}>
                {item}
              </div>

            ))
          }
        </div>
      </Drawer>
    </div>
  );
};

export default HomePage;
