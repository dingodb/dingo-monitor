import React, { useEffect, useState, useRef } from 'react';
import G6 from '@antv/g6';
import { Drawer, Space, Tag, Table, Descriptions, Row, Col, Spin } from 'antd';
import styles from './index.less';
import { queryResponseList, getStoreProcessInfo, getIndexProcessInfo } from '@/services';
import { useImmer } from 'use-immer';
// import { DashboardChart } from 'zet-charts'
import { history } from 'umi'
import { Gauge } from '@ant-design/plots'
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
            "color": "l(0) 0:#16ABFF 1:#1677FF",
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
            "color": "l(0) 0:#A76DF8 1:#722ED1",
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
            "color": "l(0) 0:#54E1D0 1:#13C2C2",
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
            "color": "l(0) 0:#98DF25 1:#52C41A",
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
            "color": "l(0) 0:#FAC816 1:#FA8C16",
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
        nodes: [],
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
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const graph = useRef(null)

    const resourceGauge = [
        {
            "name": "cpuUsage",
            "title": "CPU Usage",
            color: 'l(0) 0:#165DFF 1:#E8F3FF',
        },
        {
            "name": "memUsage",
            "title": "Mem Usage",
            color: 'l(0) 0:#FA8C16 1:#E8F3FF',
        }
    ]

    useEffect(() => {
        initGraph()
        fetchData()
        let interval = setInterval(() => {
            fetchData()
        }, 30000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if (responseData.nodes.length > 0) {
            graph.current.data(responseData);
            graph.current.render();
        }
    }, [responseData])

    const initGraph = async () => {
        const container = document.getElementById('container');
        if (!container) {
            return;
        }
        // const width = 960;
        const width = document.getElementById('container').scrollWidth;
        const height = document.getElementById('container').scrollHeight || 960;
        const layoutCfg = {
            type: 'force2',
            linkDistance: (a, b, c) => {
                if (a.source === 'dingo') {
                    return 200;
                }
                return 130
            },
            preventOverlap: true,
        };
        // let graph.current;
        G6.registerNode(
            'bubble',
            {
                drawShape(cfg, group) {
                    const self = this;
                    const r = cfg.size / 2;
                    // a circle by path
                    const path = [
                        ['M', -r, 0],
                        ['C', -r, r / 2, -r / 2, r, 0, r],
                        ['C', r / 2, r, r, r / 2, r, 0],
                        ['C', r, -r / 2, r / 2, -r, 0, -r],
                        ['C', -r / 2, -r, -r, -r / 2, -r, 0],
                        ['Z'],
                    ];
                    const keyShape = group.addShape('path', {
                        attrs: {
                            x: 0,
                            y: 0,
                            path,
                            fill: cfg.style.fill || 'steelblue',
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: 'path-shape',
                    });

                    const mask = group.addShape('path', {
                        attrs: {
                            x: 0,
                            y: 0,
                            path,
                            opacity: 0.25,
                            fill: cfg.color || 'steelblue',
                            shadowColor: cfg.color.split(' ')[2].substr(2),
                            shadowBlur: 40,
                            shadowOffsetX: 0,
                            shadowOffsetY: 30,
                        },
                        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
                        name: 'mask-shape',
                    });

                    const spNum = 10; // split points number
                    const directions = [],
                        rs = [];
                    self.changeDirections(spNum, directions);
                    for (let i = 0; i < spNum; i++) {
                        const rr = r + directions[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
                        if (rs[i] < 0.97 * r) rs[i] = 0.97 * r;
                        else if (rs[i] > 1.03 * r) rs[i] = 1.03 * r;
                        rs.push(rr);
                    }
                    keyShape.animate(
                        () => {
                            const path = self.getBubblePath(r, spNum, directions, rs);
                            return { path };
                        },
                        {
                            repeat: true,
                            duration: 10000,
                        },
                    );

                    const directions2 = [],
                        rs2 = [];
                    self.changeDirections(spNum, directions2);
                    for (let i = 0; i < spNum; i++) {
                        const rr = r + directions2[i] * ((Math.random() * r) / 1000); // +-r/6, the sign according to the directions
                        if (rs2[i] < 0.97 * r) rs2[i] = 0.97 * r;
                        else if (rs2[i] > 1.03 * r) rs2[i] = 1.03 * r;
                        rs2.push(rr);
                    }
                    mask.animate(
                        () => {
                            const path = self.getBubblePath(r, spNum, directions2, rs2);
                            return { path };
                        },
                        {
                            repeat: true,
                            duration: 10000,
                        },
                    );
                    return keyShape;
                },
                changeDirections(num, directions) {
                    for (let i = 0; i < num; i++) {
                        if (!directions[i]) {
                            const rand = Math.random();
                            const dire = rand > 0.5 ? 1 : -1;
                            directions.push(dire);
                        } else {
                            directions[i] = -1 * directions[i];
                        }
                    }
                    return directions;
                },
                getBubblePath(r, spNum, directions, rs) {
                    const path = [];
                    const cpNum = spNum * 2; // control points number
                    const unitAngle = (Math.PI * 2) / spNum; // base angle for split points
                    let angleSum = 0;
                    const sps = [];
                    const cps = [];
                    for (let i = 0; i < spNum; i++) {
                        const speed = 0.001 * Math.random();
                        rs[i] = rs[i] + directions[i] * speed * r; // +-r/6, the sign according to the directions
                        if (rs[i] < 0.97 * r) {
                            rs[i] = 0.97 * r;
                            directions[i] = -1 * directions[i];
                        } else if (rs[i] > 1.03 * r) {
                            rs[i] = 1.03 * r;
                            directions[i] = -1 * directions[i];
                        }
                        const spX = rs[i] * Math.cos(angleSum);
                        const spY = rs[i] * Math.sin(angleSum);
                        sps.push({ x: spX, y: spY });
                        for (let j = 0; j < 2; j++) {
                            const cpAngleRand = unitAngle / 3;
                            const cpR = rs[i] / Math.cos(cpAngleRand);
                            const sign = j === 0 ? -1 : 1;
                            const x = cpR * Math.cos(angleSum + sign * cpAngleRand);
                            const y = cpR * Math.sin(angleSum + sign * cpAngleRand);
                            cps.push({ x, y });
                        }
                        angleSum += unitAngle;
                    }
                    path.push(['M', sps[0].x, sps[0].y]);
                    for (let i = 1; i < spNum; i++) {
                        path.push([
                            'C',
                            cps[2 * i - 1].x,
                            cps[2 * i - 1].y,
                            cps[2 * i].x,
                            cps[2 * i].y,
                            sps[i].x,
                            sps[i].y,
                        ]);
                    }
                    path.push(['C', cps[cpNum - 1].x, cps[cpNum - 1].y, cps[0].x, cps[0].y, sps[0].x, sps[0].y]);
                    path.push(['Z']);
                    return path;
                },
            },
            'single-node',
        );
        graph.current = new G6.Graph({
            container: 'container',
            fitView: true,
            fitViewPadding: [100, 100, 120, 120],
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
        graph.current.get('canvas').set('localRefresh', false);
        graph.current.on('node:click', async (evt) => {
            const { item } = evt;
            const modelData = item.getModel();
            console.log('evt-----', item.getModel());
            if (!['store', 'dingo', 'index', 'coordinator', 'executor'].includes(modelData.id)) {
                setLoading(true)
                setVisible(true)
                const { dataType } = modelData;
                let resData = {};//store index data
                if (['store', 'index'].includes(dataType)) {
                    const { id, host, port } = modelData;
                    let result = dataType === 'store' ? await getStoreProcessInfo({ storeId: id, host, port }) : await getIndexProcessInfo({ indexId: id, host, port });
                    resData = result.data;
                }
                setLoading(false)
                setModelItem({ ...item.getModel(), ...resData })
            }
            // graph.current.setItemState(item, 'selected', true);
        });
        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph.current || graph.current.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.current.changeSize(parseFloat(getComputedStyle(container)['width']), parseFloat(getComputedStyle(container)['height']));
                graph.current.render();
            };
        console.log('responseData----', responseData)
    }

    const fetchData = async () => {
        const res = await queryResponseList();
        const copyData = res.data;
        Object.keys(copyData).forEach((ite) => {
            const filterNodes = originResponseData.nodes.filter((it) => (it.id === ite))
            if (filterNodes.length > 0 && !filterNodes[0].isComputed) {
                filterNodes[0].label = `${filterNodes[0].label}(${copyData[ite].length})`;
                filterNodes[0].isComputed = true;
            }
            copyData[ite].forEach((item) => {
                originResponseData.nodes.push({
                    style: {
                        fill: "#fff",
                        lineWidth: 1,
                        stroke: item.exceedAlarm ? '#F82A0A' : '#fff',
                        active: {
                            stroke: 'red',
                            fill: "#fff",
                            lineWidth: 10,
                        },
                    },
                    labelCfg: {
                        position: "center",
                        style: {
                            fill: "#000",
                            fontStyle: 500,
                            fontSize: 12,
                            lineHeight: 20
                        }
                    },
                    "label": item.name + (item.port ? `(${item.port})` : ''),
                    "size": 88,
                    "type": "circle",
                    dataType: ite,
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
        setResponseData({ ...originResponseData })
    }
    const onClose = () => {
        setVisible(false)
    }
    const toRegionsDetail = () => {
        const { dataType, host, port } = modelItem;
        // history.push('/regionsList', { dataType, host, port })
        window.open(`/regionsList?dataType=${dataType}&host=${host}&port=${port}`)
    }
    const toLeaderRegionsDetail = () => {
        const { id } = modelItem;
        // history.push('/regionsList', { dataType, host, port })
        window.open(`/regionsList?id=${id}`)
    }
    return <div className={styles.coordinatorContainer}>
        {/* <div className={styles.convasBg}></div> */}
        <div id="container" className={styles.coordinatorCanvas} style={{ textAlign: 'center', }}>
        </div><Drawer
            title={modelItem.name}
            placement="right"
            closable={true}
            onClose={onClose}
            open={visible}
            width={500}
            extra={
                <Space>
                    {modelItem.leader && <Tag color="#E6F4FF" style={{ color: '#1677FF' }}>Leader</Tag>}
                </Space>
            }
        ><Spin spinning={loading}>
                <div className={styles.hostAddress}>
                    <span>Host Address: </span>
                    <span>{modelItem.host}</span>
                </div>
                <div className={styles.resourceContainer}>
                    <div className={styles.title}>
                        resource
                    </div>
                    <div className={styles.resourceContent}>
                        {
                            resourceGauge.map(item => (
                                <div className={styles.resourceItem} key={item.name}>
                                    <Gauge
                                        {
                                        ...{
                                            percent: modelItem.resource[item.name],
                                            range: {
                                                color: item.color,
                                            },
                                            startAngle: Math.PI,
                                            endAngle: 2 * Math.PI,
                                            indicator: null,
                                            statistic: {
                                                title: {
                                                    offsetY: -56,
                                                    style: {
                                                        fontSize: '48px',
                                                        color: '#4B535E',
                                                    },
                                                    formatter: () => parseInt(modelItem.resource[item.name] * 100) + '%',
                                                },
                                                content: {
                                                    style: {
                                                        fontSize: '36px',
                                                        lineHeight: '44px',
                                                        color: '#4B535E',
                                                    },
                                                    formatter: () => item.title,
                                                },
                                            },
                                        }
                                        }
                                    />
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className={styles.diskUsageContainer}>
                    <div className={styles.title}>DiskUsage</div>
                    <div className={styles.diskUsageContent}>
                        {
                            modelItem.resource?.diskUsage.length && modelItem.resource?.diskUsage.map((item) => (
                                <div className={styles.diskUsageItem} key={item.mountpoint}><div className={styles.diskUsageUrl}>{item.mountpoint}</div>
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
                    <Table columns={schemasColumns} rowKey={'id'} dataSource={modelItem.schemas} pagination={false} />
                </div>}
                <div className={styles.pgocessContainer}>
                    {modelItem.process &&
                        <Descriptions size="small" column={1} bordered title="ProcessInfo">
                            {
                                Object.keys(modelItem.process).map((item) => (
                                    <Descriptions.Item label={item} key={item}>{modelItem.process[item]}</Descriptions.Item>
                                ))
                            }
                        </Descriptions>}
                </div>
                {modelItem.regions && <div className={styles.resourceContainer}>
                    <div className={styles.title}>resource</div>
                    <Row>
                        <Col span={12}>
                            <div className={styles.regionSpan}>regionCount</div>
                            <div className={styles.regionContentActive} onClick={toRegionsDetail}>{modelItem.regions.regionCount}</div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.regionSpan}>leaderRegionsCount</div>
                            <div className={styles.regionContentActive} onClick={toLeaderRegionsDetail}>{modelItem.regions.leaderRegionsCount}</div>
                        </Col>
                    </Row>
                </div>}
            </Spin>
        </Drawer></div>
}
export default Coordinator;