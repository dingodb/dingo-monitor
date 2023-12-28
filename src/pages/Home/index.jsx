import { useModel } from '@umijs/max';
import styles from './index.less';
import { useImmer } from 'use-immer';
import { Descriptions, Tabs, Table, Button, Drawer, Row, Col } from 'antd';
import indexBg from '@/assets/index-normal.png';
import vectorBg from '@/assets/index-vector.png';
import tableBg from '@/assets/table.png';
import UserManageTree from '@/components/UserManageTree'
import Coordinator from '../Coordinator'
import { fileSize } from '@/utils'
import { getPartRegion, getTableRegion, queryRegion, getIndexRegion, getIndexPartRegion } from '@/services';
import { useEffect } from 'react';
const tabItems = [
  {
    label: 'Partitions',
    key: 'partion'
  },
  {
    label: 'Regions',
    key: 'Regions'
  },
]
const HomePage = () => {
  const { name } = useModel('global');
  const [detail, setDetail] = useImmer({
    activeType: 'table',
    infoColumns: [],
    infoPartions: [],
    activeKey: 'partion',
    drawerOpen: false,
    partionsTable: [],
    regionsTable: [],
    isHome: true,
    regionsTableDetail: {
      regionType: '',
      createTime: '',
      deleteTime: '',
      followers: []
    }
  });
  const partionColumns = [
    {
      dataIndex: 'id',
      width: 200,
      title: 'partionID'
    },
    // {
    //   dataIndex: 'name',
    //   width: 200,
    //   title: 'name'
    // },
    {
      dataIndex: 'type',
      width: 200,
      title: 'type'
    },
    {
      dataIndex: 'partCols',
      width: 200,
      title: 'partCols'
    },
    {
      key: 'operation',
      width: 200,
      title: '操作',
      render: (text, record) => {
        return (
          <Button type='link' onClick={goDetail.bind(null, record, 'partion')}>查看详情</Button>
        );
      },
    },
  ]
  const goFollowerLink = (link) => {
    window.open(`http://${link}`);
  }
  const regionsColumns = [
    {
      dataIndex: 'regionId',
      width: 200,
      title: 'RegionID'
    },
    {
      dataIndex: 'range',
      width: 230,
      title: 'Range'
    },
    {
      dataIndex: 'leader',
      width: 200,
      title: 'Leader',
      render(text, record) {
        return [text].map((ite) => (
          <Button type="link" onClick={goFollowerLink.bind(null, ite)}>{ite}</Button>
        ))
      }
    },
    {
      dataIndex: 'follower',
      width: 200,
      title: 'follower',
      render(text, record) {
        let copyText = text.slice(1, text.length - 1);
        return copyText.split(',').map((ite) => (
          <Button type="link" onClick={goFollowerLink.bind(null, ite.trim())}>{ite.trim()}</Button>
        ))
      }
    },
    {
      key: 'operation',
      width: 200,
      title: '操作',
      render: (text, record) => {
        return (
          <Button type='link' onClick={goDetail.bind(null, record, 'regions')}>查看详情</Button>
        );
      },
    },
  ]
  useEffect(() => {
    if (detail.activeKey === 'Regions') {
      getRegionsDetailList();
    }
  }, [detail.activeKey])
  useEffect(() => {
    setDetail((prev) => {
      prev.activeKey = 'partion'
    })
  }, [detail.tableID])
  const getRegionsDetailList = async () => {
    console.log('detail-------', detail);
    const { schema, table, activeType } = detail;
    if (activeType === 'table') {
      const res = await getTableRegion({ schema, table });
      setDetail((prev) => {
        prev.regionsTable = res.data;
      });
    } else {
      const res = await getIndexRegion({ schema, table, indexId: detail.tableID });
      setDetail((prev) => {
        prev.regionsTable = res.data;
      });
    }
  }
  const goDetail = async (record, key) => {
    console.log('goDetail-----', key)
    if (key === 'regions') {
      const { regionId } = record;
      const res = await queryRegion({ regionId });
      setDetail((prev) => {
        prev.regionsTableDetail = res.data;
      });
    } else {
      const { schema, table, activeType, tableID } = detail;
      const { id } = record;
      if (activeType === 'index') {
        const indexRes = await getIndexPartRegion({ schema, table, partId: id, indexId: tableID })
        setDetail((prev) => {
          prev.partionsTable = indexRes.data;
        })
      } else {
        const tableRes = await getPartRegion({ schema, table, partId: id });
        setDetail((prev) => {
          prev.partionsTable = tableRes.data;
        })
      }
    }
    setDetail((prev) => {
      prev.drawerOpen = true;
    });
  }
  const handleTreeData = (data) => {
    console.log('handleTreeData-----', data);
    if (data === 'isHome') {
      setDetail((prev) => {
        prev.isHome = true;
      });
    } else {
      setDetail({ ...data, isHome: false })
    }
  }
  const onClose = () => {
    setDetail((prev) => {
      prev.drawerOpen = false;
    })
  }
  const changeActiveKey = (activeKey) => {
    setDetail((prev) => {
      prev.activeKey = activeKey;
    })
  }
  const handleIPItem = (item) => {
    const linkPath = `http://${item}`;
    window.open(linkPath);
  }
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <div className={styles.treeMenu}>
          <UserManageTree handleTreeData={handleTreeData} />
        </div>
        <div className={styles.tableDetail}>
          {detail.isHome ? <Coordinator /> : <>
            <div className={styles.tableInfo}>
              <div className={styles.tableInfoDetail}>
                <img className={styles.infoImg} src={detail.activeType === 'table' ? tableBg : (detail.indexType === 'vector' ? vectorBg : indexBg)} />
                <div className={styles.infoContent}>
                  <div className={styles.infoTitle}>{detail?.name}</div>
                  <div className={styles.infoID}>{detail.activeType === 'table' ? 'TableID' : 'IndexID'}: {detail?.tableID}</div>
                </div>
                <div className={styles.partionRegions}>
                  {detail.activeType === 'index' && <div className={styles.memory}>
                    <div className={styles.title}>MemoryBytes</div>
                    <div className={styles.num}>{fileSize(detail?.memoryBytes)}</div>
                  </div>}
                  <div className={styles.partion}>
                    <div className={styles.title}>Partitions</div>
                    <div className={styles.num}>{detail?.partitionsCount}</div>
                  </div>
                  <div className={styles.regions}>
                    <div className={styles.title}>Regions</div>
                    <div className={styles.num}>{detail?.regionsCount}</div>
                  </div>
                </div>
              </div>
              <Descriptions title={false}>
                {
                  detail.infoColumns.length > 0 && detail.infoColumns.map((item) => <Descriptions.Item label={item.name}>{item.type}</Descriptions.Item>)
                }
              </Descriptions>
            </div>
            <div className={styles.tableContent}>
              <Tabs items={tabItems} activeKey={detail.activeKey} onChange={changeActiveKey} defaultActiveKey="partion" />
              {detail.activeKey === 'Regions' ? <Table columns={regionsColumns} dataSource={detail.regionsTable} /> : <Table columns={partionColumns} dataSource={detail.infoPartions} />}
            </div>
          </>}
        </div>
      </div>
      <Drawer
        title="查看详情"
        placement="right"
        width={700}
        onClose={onClose}
        open={detail.drawerOpen}
      >
        {detail.activeKey === 'Regions' ? <><Row className={styles.drawerContainer}>
          <Col span={12}>
            <span className={styles.regionKey}>regionType:</span><span className={styles.regionValue}>{detail?.regionsTableDetail?.regionType}</span>
          </Col>
          <Col span={12}>
            <span className={styles.regionKey}>createTime:</span><span className={styles.regionValue}>{detail?.regionsTableDetail?.createTime}</span>
          </Col>
          <Col span={12}>
            <span className={styles.regionKey}>deleteTime:</span><span className={styles.regionValue}>{detail?.regionsTableDetail?.deleteTime}</span>
          </Col>
          <Col span={12}>
            <span className={styles.regionKey}>regionState:</span><span className={styles.regionValue}>{detail?.regionsTableDetail?.regionState}</span>
          </Col>
        </Row>
          <div>
            <div className={styles.flollowersTitle}>Leader</div>
            <div className={styles.regionsFollowerContainer}>
              <div className={styles.followerItem}><Button type="link" onClick={handleIPItem.bind(null, detail?.regionsTableDetail?.leader)}>{detail?.regionsTableDetail?.leader}</Button></div>
            </div>
          </div>
          <div>
            <div className={styles.flollowersTitle}>Follower({detail?.regionsTableDetail?.followers.length})</div>
            <div className={styles.regionsFollowerContainer}>
              {
                detail?.regionsTableDetail?.followers && detail?.regionsTableDetail?.followers.length > 0 && detail.regionsTableDetail.followers.map((item) => {
                  return <div className={styles.followerItem}><Button type="link" onClick={handleIPItem.bind(null, item)}>{item}</Button></div>
                })
              }
            </div>
          </div>
        </> : <Table columns={regionsColumns.slice(0, regionsColumns.length - 1)} dataSource={detail.partionsTable} />}
      </Drawer>
    </div>
  );
};

export default HomePage;
