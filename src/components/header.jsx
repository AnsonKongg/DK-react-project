import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout, Button, Typography } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { Text } = Typography;

const PageHeader = (props) => {
  const { userToken, collapsed, setCollapsed } = props;
  const history = useHistory();

  const goToLogin = (page) => {
    history.push(page);
  };
  const sideBarToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
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
          {userToken ? (
            <>
              <span style={{ paddingRight: 15 }}>
                <Button
                  type="primary"
                  ghost
                  onClick={() => goToLogin("/createEvent")}
                >
                  Host an event
                </Button>
              </span>
              <Text>Hello</Text>
            </>
          ) : (
            <>
              <span style={{ paddingRight: 15 }}>
                <Button
                  type="primary"
                  ghost
                  onClick={() => goToLogin("/login")}
                >
                  Login
                </Button>
              </span>
              <Button type="primary" onClick={() => goToLogin("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </Header>
  );
};

// Selectors
const mapStateToProps = (state) => ({
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
