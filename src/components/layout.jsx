import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const goToPage = (route) => {
    history.push(route);
  };
  const sideBarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="App">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["events"]}>
          <Menu.Item
            key="events"
            icon={<UserOutlined />}
            onClick={() => goToPage("/")}
          >
            Events
          </Menu.Item>
          <Menu.Item
            key="people"
            icon={<VideoCameraOutlined />}
            onClick={() => goToPage("/people")}
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
                  onClick={() => sideBarToggle()}
                />
              ) : (
                <MenuUnfoldOutlined
                  className="header-icon"
                  onClick={() => sideBarToggle()}
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
         {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
