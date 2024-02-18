import React, { useState, useEffect } from 'react';
import { Tree, Tooltip, Input } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
const { Search } = Input;
import { queryTree, getTableInfo, getIndexInfo } from '@/services/index';
import tableBg from '@/assets/table.png';
import indexBg from '@/assets/index-normal.png';
import vectorBg from '@/assets/index-vector.png';
import styles from './index.less';

const UserManageTree = (props) => {
    const { handleTreeData } = props;
    const [filterTrees, setFilterTrees] = useState([]); // 处理过的树的数据
    const [searchTreeValue, setSearchTreeValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(false); // 节点是否展开
    const [expandedKeys, setExpandedKeys] = useState([]); // 展开节点的key
    const [isSearched, setIsSearched] = useState(false); // 是否搜索过
    const [isChinese, setIsChinese] = useState(false); // 是否是中文输入，中文输入状态不发送请求
    const [treeData, setTreeData] = useState([]); // 节点树数据

    useEffect(() => {
        fetchTree();
        handleTreeData('isHome');
    }, []);
    useEffect(() => {
        console.log('searchTreeValue-----')
        searchTreeValue && !isSearched && setIsSearched(true);
        if (!isChinese) {
            setFilterTrees(filterTreeNode(recursionLoop(treeData), searchTreeValue));
        }
    }, [searchTreeValue]);
    const fetchTree = async () => {
        const res = await queryTree();
        console.log('fetch-----', res);
        setTreeData(res.data)
        setFilterTrees(recursionLoop(res.data))
    }

    const filterTreeNode = (treeDataArr, text) => {
        let newArr = [...treeDataArr].map((item) => {
            let children = [...item.children || []].filter((child) => {
                const strTitle = child.title;
                const index = strTitle.indexOf(text);
                return index > -1;
            });
            return children.length > 0 ? {
                ...item,
                children,
            } : null;
        });
        console.log('newArr-----', newArr)

        return text ? newArr.filter(Boolean) : treeDataArr;
    };


    // dfs获取tree的keys和data
    const recursionLoop = (loopData) => {
        const keys = [];
        const loop = (data) => {
            if (!data || !data.length) {
                return [];
            }
            return data.map((item) => {
                const strTitle = item.name; // 部门或者用户名称
                const index = strTitle.indexOf(searchTreeValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchTreeValue.length);
                let title = <span>{strTitle}</span>;
                // 搜索高亮
                if (index > -1 && searchTreeValue) {
                    keys.push(item.id || item.name);
                    title = <span>
                        {beforeStr}
                        <span style={{ color: '#1677FF' }}>{searchTreeValue}</span>
                        {afterStr}
                    </span>
                }
                const resObj = {
                    children: item.children && item.children.length > 0 && loop(item.children),
                    name: title,
                    title: strTitle,
                    type: item.type || '',
                    schema: item.schema || '',
                    id: item.id || '',
                    key: item.id || item.name,
                }
                if (item.type === 'table') {
                    resObj.icon = <img src={tableBg} />
                } else if (item.type === 'index') {
                    if (item.indexType === 'vector') {
                        resObj.icon = <img src={vectorBg} />
                    } else {
                        resObj.icon = <img src={indexBg} />
                    }
                }
                item.indexType && (resObj.indexType = item.indexType);
                item.table && (resObj.table = item.table);
                return resObj;
            });
        }
        const res = loop(loopData);
        setExpandedKeys([...keys]);
        return res;
    }
    // 搜索树
    const onTreeSearch = (e) => {
        console.log('value-----', e.target.value)
        setSearchTreeValue(e.target.value);
        setAutoExpandParent(true);
    };
    // 树展开调用
    const expandTree = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    }

    const chineseSearchStart = () => {
        setIsChinese(true);
    }
    const chineseSearchEnd = () => {
        setIsChinese(false);
    }
    const handleTreeClick = async (treeNode) => {
        if (treeNode.type === 'table') {
            const res = await getTableInfo({ schema: treeNode.schema, table: treeNode.title })
            const { columns, partitionsCount, regionsCount, partitions } = res.data;
            handleTreeData({
                name: treeNode.title,
                tableID: treeNode.id,
                infoColumns: columns || [],
                partitionsCount,
                regionsCount,
                infoPartions: partitions,
                schema: treeNode.schema,
                table: treeNode.title,
                activeType: treeNode.type
            })
        } else if (treeNode.type === 'index') {
            const res = await getIndexInfo({ schema: treeNode.schema, table: treeNode.table, indexId: treeNode.id })
            const { columns, partitionsCount, regionsCount, partitions, memoryBytes } = res.data;
            handleTreeData({
                name: treeNode.title,
                tableID: treeNode.id,
                infoColumns: columns || [],
                partitionsCount,
                regionsCount,
                infoPartions: partitions,
                schema: treeNode.schema,
                table: treeNode.table,
                activeType: treeNode.type,
                memoryBytes,
                indexType: treeNode.indexType
            })
        }
    }

    // 渲染树节点
    const renderUserTree = (treeNode) => {
        const treeTitle = treeNode.name;
        return (
            <>
                <div
                    className={styles.nodeContentWrapper}
                    onClick={handleTreeClick.bind(null, treeNode)}
                >
                    <Tooltip title={treeTitle}>
                        <div className={styles.nodeName}>
                            {treeTitle}
                        </div>
                    </Tooltip>
                </div>
            </>
        )
    }
    const goHome = () => {
        handleTreeData('isHome');
    }
    return (
        <div className={styles.organationContain}>
            <div className={styles.title} onClick={goHome}>
                <HomeOutlined /><span style={{ marginLeft: 15 }}>首页</span>
            </div>
            <div className={styles.searchContain}>
                <div className={styles.search} >
                    <Search
                        placeholder='搜索'
                        onInput={onTreeSearch}
                        onCompositionStart={chineseSearchStart}
                        onCompositionEnd={chineseSearchEnd}
                        value={searchTreeValue}
                        debounceTime={100} />
                </div>
                <Tree treeData={filterTrees}
                    showIcon
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onExpand={expandTree}
                    titleRender={renderUserTree}
                    className={styles.searchTree}
                />
            </div>
        </div>
    )
};

export default UserManageTree;