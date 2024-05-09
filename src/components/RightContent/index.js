import {
  ModalForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Dropdown, message, Popover, Modal, Tooltip, Input, Upload, Image } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined, PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';
import { useState, useContext } from 'react';
import { useModel, history } from 'umi'
import { CookieUse } from '@/utils';
import { logout } from '@/services/user';

const { getCookie, setCookie } = CookieUse();

// const { editPassword } = services.User;

export default (props) => {
  let username = getCookie('dingo_login_token_cookie');


  const Logout = () => {

    Modal.confirm({
      title: '你确定要退出登录吗?',
      onOk() {
        console.log('OK');
        setCookie('dingo_login_token_cookie', '');
        history.push('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
      okText: '确定',
      cancelText: '取消'
    });
  };

  return (
    <div className="loginContent">

      {/* <Dropdown
        menu={{
          items: [
            {
              key: '2',
              label: <div onClick={Logout}>退出登录</div>,
            },
          ],
        }}
      > */}
      <span>欢迎你: {username}</span>
      <Button onClick={Logout}>登出</Button>
      {/* </Dropdown> */}

    </div>
  );
};
