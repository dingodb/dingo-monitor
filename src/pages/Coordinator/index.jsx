import React, { useEffect, useState } from 'react';
import G6 from '@antv/g6';
import { Drawer, Space, Tag, Table, Descriptions, Row, Col } from 'antd';
import styles from './index.less';
import { queryResponseList } from '@/services';
import { useImmer } from 'use-immer';
import { DashboardChart } from 'zet-charts'
const schemasColumns = [
    {
        dataIndex: 'name',
        title: 'name'
    },
    {
        dataIndex: 'tableCount',
        title: 'Tables_count'
    },
]
const originResponseData = {
    "nodes": [
        {
            "id": "dingo",
            "name": "Dingo-Cluster",
            "style": {
                "fill": "l(0) 0:#16ABFF 1:#1677FF",
                "lineWidth": 0
            },
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#fff",
                    "fontStyle": "bold",
                    "fontSize": 14,
                    "lineHeight": 20
                }
            },
            "label": "Dingo-Cluster",
            "size": 180,
            "type": "bubble",
        },
        {
            "id": "store",
            "name": "Store",
            "style": {
                "fill": "l(0) 0:#A76DF8 1:#722ED1",
                "lineWidth": 0,
            },
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#fff",
                    "fontSize": 12,
                    "lineHeight": 20
                }
            },
            "label": "Store\n",
            "size": 120,
            "type": "bubble",
            // "x": 636,
            // "y": 303,
        },
        {
            "id": "executor",
            "name": "Executor",
            "style": {
                "fill": "l(0) 0:#54E1D0 1:#13C2C2",
                "lineWidth": 0
            },
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#fff",
                    "fontStyle": "bold",
                    "fontSize": 12,
                    "lineHeight": 20
                }
            },
            // "x": 280,
            // "y": 268,
            "label": "Executor\n",
            "size": 120,
            "type": "bubble",
        },
        {
            "id": "index",
            "name": "Index",
            "style": {
                "fill": "l(0) 0:#98DF25 1:#52C41A",
                "lineWidth": 0
            },
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#fff",
                    "fontStyle": "bold",
                    "fontSize": 12,
                    "lineHeight": 20
                }
            },
            // "x": 246,
            // "y": 676,
            "label": "Index\n",
            "size": 120,
            "type": "bubble"
        },
        {
            "id": "coordinator",
            "name": "Coordinator",
            "style": {
                "fill": "l(0) 0:#FAC816 1:#FA8C16",
                "lineWidth": 0
            },
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#fff",
                    "fontStyle": "bold",
                    "fontSize": 12,
                    "lineHeight": 20
                }
            },
            // "x": 696,
            // "y": 602,
            "label": "Coordinator\n",
            "size": 120,
            "type": "bubble",
        },
    ],
    "edges": [
        {
            "source": "dingo",
            "target": "store",
            "value": 1,
            "id": "dingo-store",
            "style": {
                "lineWidth": 2,
            }
        },
        {
            "source": "dingo",
            "target": "executor",
            "value": 1,
            "id": "dingo-executor",
            "style": {
                "lineWidth": 2,
            }
        },
        {
            "source": "dingo",
            "target": "index",
            "value": 1,
            "id": "dingo-index",
            "style": {
                "lineWidth": 2,
            }
        },
        {
            "source": "dingo",
            "target": "coordinator",
            "value": 1,
            "id": "dingo-coordinator",
            "style": {
                "lineWidth": 2,
            }
        },
    ]
}
const Coordinator = () => {
    const [responseData, setResponseData] = useState({
        nodes:[],
        edges: []
    })
    const [modelItem, setModelItem] = useImmer({
        name: '',
        host: '',
        resource: {
            "cpuUsage": 0,
            "memUsage": 0,
            "diskUsage": []
        },
        schemas: [],
        process: {},
        regions: {
            regionCount: 0,
            leaderRegionsCount: 0, 
        }
    });
    const [visible,setVisible] = useState(false);
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if(responseData.nodes.length > 0) {
            const container = document.getElementById('container');
            if(!container) {
                return;
            }
            const width = 960;
            const height = document.getElementById('container').scrollHeight || 960;
            const layoutCfg = {
                type: 'force2',
                linkDistance: (a,b,c) => {
                    if(a.source === 'dingo') {
                        return 200;
                    }
                    return 130
                },
                preventOverlap: true,
            };
            let graph;
            graph = new G6.Graph({
            container: 'container',
            fitView: true,
            fitViewPadding: [ 100, 100, 120, 120 ],
            width,
            height,
            layout: layoutCfg,
            modes: {
                default: ['drag-canvas'],
            },
            defaultNode: {
                type: 'bubble',
                size: 20,
                labelCfg: {
                position: 'center',
                style: {
                    fill: 'white',
                    fontStyle: 'bold',
                    fontSize: 50
                },
                },
            },
            defaultEdge: {
                type: 'animate-line',
                style: {
                    stroke: 'rgba(0,0,0,0.1)',
                },
            },
            });
            graph.get('canvas').set('localRefresh', false);
            graph.on('node:click', (evt) => {
                const { item } = evt;
                const modelData = item.getModel();
                console.log('evt-----', item.getModel());
                if(!['store', 'dingo', 'index', 'coordinator', 'executor'].includes(modelData.id)) {
                    setVisible(true)
                    setModelItem({...item.getModel()})
                }
                // graph.setItemState(item, 'selected', true);
            });
            graph.data(responseData);
            graph.render();
            if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(960, 960);
            };
            console.log('responseData----', responseData)
        }
    }, [responseData])
    const fetchData = async () => {
        const res = await queryResponseList();
        const copyData = res.data;
        Object.keys(copyData).forEach((ite) => {
            const filterNodes = originResponseData.nodes.filter((it) => (it.id === ite))
            if(filterNodes.length > 0 && !filterNodes[0].isComputed) {
                filterNodes[0].label = `${filterNodes[0].label}(${copyData[ite].length})`;
                filterNodes[0].isComputed = true;
            }
            copyData[ite].forEach((item) => {
                originResponseData.nodes.push({
                    style: {
                        fill: "#fff",
                        lineWidth: 1,
                        stroke: item.exceedAlarm ? '#F82A0A' : '#000'
                    },
                    labelCfg: {
                        position: "center",
                        style: {
                            fill: "#000",
                            fontStyle: "bold",
                            fontSize: 12,
                            lineHeight: 20
                        }
                    },
                    "label": item.name,
                    "size": 88,
                    "type": "bubble",
                    ...item,
                    id: item.name,
                })
                originResponseData.edges.push({
                    source: ite,
                    target: item.name,
                    value: 1,
                    style: {
                        "lineWidth": 2,
                    },
                    id: `${ite}-${item.name}`,
                })
            })
        })
        setResponseData({...originResponseData})
    }
    const onClose = () => {
        setVisible(false)
    }
    return <div className={styles.coordinatorContainer}>
    <div className={styles.convasBg}></div>
    <div id="container" className={styles.coordinatorCanvas} style={{textAlign: 'center'}}>  
    </div><Drawer
        title={modelItem.name}
        placement="right"
        closable={true}
        onClose={onClose}
        open={visible}
        mask={false}
        width={500}
        extra={
            <Space>
              {modelItem.leader && <Tag color="#E6F4FF" style={{color: '#1677FF'}}>Leader</Tag>}
            </Space>
          }
      >
        <div className={styles.hostAddress}>
            <span>Host Address: </span>
            <span>{modelItem.host}</span>
        </div>
        <div className={styles.resourceContainer}>
            <div className={styles.title}>
                resource
            </div>
            <div className={styles.resourceContent}>
                <div className={styles.resourceItem}>
                    <DashboardChart data={{
                        center: {
                            name: 'CPU Usage',
                            value: modelItem.resource.cpuUsage * 100
                          },
                          bars: [
                            {
                                    "name": " ",
                                    "value": modelItem.resource.cpuUsage * 100,
                                    "unit": "GB"
                            },
                            {
                                    "name": " ",
                                    "value": 100 - modelItem.resource.cpuUsage * 100,
                                    "unit": "GB"
                            }
                    ]
                    }} colors={['#165DFF', '#E8F3FF']} options={{
                        animate: { interval: 0 },
                        labelStyle: { show: false },
                        type: "normal"
                    }}/>
                </div>
                <div className={styles.resourceItem}>
                    <DashboardChart data={{
                        center: {
                            name: 'MemUsage',
                            value: modelItem.resource.memUsage * 100
                          },
                          bars: [
                            {
                                "name": " ",
                                "value": modelItem.resource.memUsage * 100,
                                "unit": "GB"
                            },
                            {
                                "name": " ",
                                "value": 100 - modelItem.resource.memUsage * 100,
                                "unit": "GB"
                            }
                          ]
                    }} colors={['#FA8C16', '#E8F3FF']}  options={{
                        animate: { interval: 0 },
                        labelStyle: { show: false },
                        type: "normal"
                    }}/>
                </div>
            </div>
        </div>
        <div className={styles.diskUsageContainer}>
            <div className={styles.title}>DiskUsage</div>
            <div className={styles.diskUsageContent}>
            {
                modelItem.resource?.diskUsage.length && modelItem.resource?.diskUsage.map((item) => (
                    <div className={styles.diskUsageItem}><div className={styles.diskUsageUrl}>{item.mountpoint}</div>
                        <div className={styles.diskUsageUsage}><span className={styles.usageLabel}>usage</span><span>{item.usage}</span><span>%</span></div>
                    </div>
                ))
            }
            </div>
        </div>
        {
            Object.keys(modelItem.resource).includes('heapUsage') && <div className={styles.heapUsageContainer}>
                <Row>
                    <Col span={12}>
                        <div className={styles.regionSpan}>heapUsage</div>
                        <div className={styles.regionContent}>{modelItem.resource.heapUsage}%</div>
                    </Col>
                    <Col span={12}>
                        <div className={styles.regionSpan}>nonHeapSize</div>
                        <div className={styles.regionContent}>{modelItem.resource.nonHeapSize}</div>
                    </Col>
                </Row>
            </div>
        }
        {modelItem.schemas && modelItem.schemas.length > 0 && <div className={styles.schemasContainer}>
            <div className={styles.title}>schemas</div>
            <Table columns={schemasColumns} dataSource={modelItem.schemas} pagination={false}/>
        </div>}
        <div className={styles.pgocessContainer}>
            {modelItem.process && 
            <Descriptions size="small" column={1} bordered title="ProcessInfo">
                {
                    Object.keys(modelItem.process).map((item) => (
                        <Descriptions.Item label={item}>{modelItem.process[item]}</Descriptions.Item>
                    ))
                }
            </Descriptions>}
        </div>
        {modelItem.regions && <div className={styles.resourceContainer}>
            <div className={styles.title}>resource</div>
            <Row>
                <Col span={12}>
                    <div className={styles.regionSpan}>regionCount</div>
                    <div className={styles.regionContent}>{modelItem.regions.regionCount}</div>
                </Col>
                <Col span={12}>
                    <div className={styles.regionSpan}>leaderRegionsCount</div>
                    <div className={styles.regionContent}>{modelItem.regions.leaderRegionsCount}</div>
                </Col>
            </Row>
        </div>}
        
      </Drawer></div>
}
export default Coordinator;