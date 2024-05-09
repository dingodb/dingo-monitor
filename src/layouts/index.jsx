import { Link, Outlet } from 'umi';
import './index.less';
import { useEffect, useState } from 'react';
import RightContent from '@/components/RightContent'
import Routes from '../../config/route'
import { ReadOutlined, LaptopOutlined, AppstoreOutlined, ClusterOutlined, LineChartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CookieUse } from '@/utils';
const { getCookie, setCookie } = CookieUse();

export default function Layout() {
  let user_level = getCookie('dingo_login_level_cookie') || 2;
  console.log(user_level)
  const [selectedKeys, setSelectedKeys] = useState('');
  const hash = window.location.hash;

  const icons = {
    '/overview': <AppstoreOutlined />,
    '/topSql': <ClusterOutlined />,
    '/home': <LineChartOutlined />,
    '/sqlAnalysis': <ThunderboltOutlined />,
    '/log': <ReadOutlined />,
    '/event': <LaptopOutlined />,

  }

  useEffect(() => {
    console.log('-----------------hash:', hash, '/' + hash.split('?')[0].split('/')[1])
    setSelectedKeys('/' + hash.split('?')[0].split('/')[1]);
  }, [hash]);

  console.log('layout')
  return (
    <div className='kb-ui-container'>
      <div className="left_menu">
        <Link to='/' onClick={() => setSelectedKeys('/chat')} className='homeBtn'>
          <img src={require("@/favicon.png")} alt="" />
          DingoDB
        </Link>
        <div className="left_menu_list">
          {
            Routes.filter(route => route.showInMenu && user_level <= route.level).map((route) => {
              return (
                <Link to={route.path} key={route.path} onClick={() => setSelectedKeys(route.path)} className={`left_menu_item ${route.path === selectedKeys ? 'active' : ''}`} >
                  {icons[route.path]}
                  <span>{route.name}</span>
                </Link>
              )
            })
          }
        </div>
        <RightContent />


      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
