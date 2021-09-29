import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import HomePage from './pages/homePage';
import PeoplePage from './pages/peoplePage';
import Profile from './pages/profilePage';
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

const routes = [
  {
    path: '/people',
    component: PeoplePage,
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/',
    component: HomePage,
  },
];

function App({ component: Component, ...rest }, props) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    history.push("/");
  }, []);

  const goToPage = (route) => {
    history.push(route);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="App" >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["events"]}>
          <Menu.Item
            key="events"
            icon={<UserOutlined />}
            onClick={() => goToPage('/')}
          >
            Events
          </Menu.Item>
          <Menu.Item
            key="people"
            icon={<VideoCameraOutlined />}
            onClick={() => goToPage('/people')}
          >
            People
          </Menu.Item>
          <Menu.Item
            key="profile"
            icon={<UploadOutlined />}
            onClick={() => goToPage("/profile")}
          >
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <div className="row-container">
            <div>
              {collapsed ? (
                <MenuFoldOutlined
                  className="header-icon"
                  onClick={() => toggle()}
                />
              ) : (
                <MenuUnfoldOutlined
                  className="header-icon"
                  onClick={() => toggle()}
                />
              )}
            </div>
            <div>
              <span style={{ paddingRight: 10 }}>
                <Button type="primary" ghost>
                  Login
                </Button>
              </span>
              <Button type="primary">Sign Up</Button>
            </div>
          </div>
        </Header>
        <Content className="content-container">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout >
  );
}

export default App;
