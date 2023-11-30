import axios from 'axios';
export async function queryTree() {
  const res = await axios.get('/fetchApi/monitor/api/navigation');
  return res;
}
export async function getTableInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/getTableInfo', {params});
  return res;
}
export async function getIndexInfo(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexInfo', {params});
  return res;
}
export async function getPartRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getPartRegion', {params});
  return res;
}
export async function getTableRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getTableRegion', {params});
  return res;
}
export async function getIndexRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexRegion', {params});
  return res;
}
export async function queryRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/queryRegion', {params});
  return res;
}
export async function queryResponseList() {
  const res = await axios.get('/fetchApi/monitor/api/clusterStatus', {});
  return res;
}
export async function getIndexPartRegion(params) {
  const res = await axios.get('/fetchApi/monitor/api/getIndexPartRegion', {params});
  return res;
}