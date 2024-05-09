import React, { useEffect, useContext } from 'react'
import './index.less'
import { history } from 'umi'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { CookieUse } from '@/utils';
const { setCookie } = CookieUse();
import { login } from '@/services'
import Lottie from 'lottie-web'

export default (props) => {

  useEffect(() => {
    const dom = document.querySelector(".lottie");
    Lottie.loadAnimation({
      container: dom, //dom元素的容器
      // renderer: 'svg',
      loop: true, //循环播放
      autoplay: true, //自动播放
      path: "/assets/dingo_login.json", // AE 导出JSON文件
    })
  }, [])

  const onLogin = (data) => {
    setCookie('login_token_cookie', '');
    // console.log(data)
    const { username, password } = data;
    login(username, password).then(res => {
      console.log(res)
      if (res.code == 1) {
        setCookie('dingo_login_token_cookie', username);
        setCookie('dingo_login_level_cookie', res.level || 2);
        message.success('登录成功');
        history.push('/');
        location.reload();
      } else {
        message.error('登录失败');
      }
    })
  }

  return (
    <div className='loginPage'>
      <div className="column column1">
        <div className="loginCard">
          <div className="title">
            <img src={require('@/assets/DingoDB_logo.png')} alt="" />
            <div className="name">DingoDB</div>
          </div>
          <div className="desc">Welcome back</div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onLogin}
          >
            {/* <div className="label">用户名</div> */}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input
                size='large'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            {/* <div className="label">密码</div> */}
            <Form.Item
              name="password"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                // type="password"
                placeholder="请输入密码"
                size='large'
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" size='large' htmlType="submit" className="login-form-button modernButton">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
      <div className="column column2">
        <div className="lottie"></div>
        {/* <div className="tip">洞察尽在掌握，实时监控系统健康</div> */}
      </div>
    </div>
  )
}