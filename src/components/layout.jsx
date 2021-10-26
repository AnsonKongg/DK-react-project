import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from './header';
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Sider, Content } = Layout;

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const goToPage = (route) => {
    history.push(route);
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
        <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content className="content-container">
         {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
