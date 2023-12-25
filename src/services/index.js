import axios from 'axios';
export async function queryTree() {
  const res = await axios.get('/fetchApi/monitor/api/navigation');
  return res;
}
export async function getTableInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/getTableInfo', { params });
  return res;
}
export async function getIndexInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexInfo', { params });
  return res;
}
export async function getPartRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getPartRegion', { params });
  return res;
}
export async function getTableRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getTableRegion', { params });
  return res;
}
export async function getIndexRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexRegion', { params });
  return res;
}
export async function queryRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryRegion', { params });
  return res;
}
export async function queryResponseList() {
  const res = await axios.get('/fetchApi/monitor/api/clusterStatus', {});
  return res;
}
export async function getIndexPartRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexPartRegion', { params });
  return res;
}
//store的信息
export async function getStoreProcessInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryStoreProcessInfo', { params });
  return res;
}
//index的信息
export async function getIndexProcessInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryIndexProcessInfo', { params });
  return res;
}
//store的regions列表
export async function getStoreProcessRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryStoreProcessRegion', { params });
  return res;
}
//index的regions列表
export async function getIndexProcessRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryIndexProcessRegion', { params });
  return res;
}
//index/store的leader-regions列表
export async function queryProcessLeaderRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryProcessLeaderRegion', { params });
  return res;
}