import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as types from "../config/ActionTypes";
import * as loginAction from "../actions/loginAction";
import { Link } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
const { Text, Title } = Typography;

const Login = (props) => {
  const { type, userToken, onLogin } = props;
  const history = useHistory();

  useEffect(() => {
    if (type === types.LOGIN_SUCCESS && userToken) {
      history.goBack();
    }
  }, [type, userToken, history]);

  const onFinish = (values) => {
    onLogin(values)
  };
  // Form validation messages
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <div className="whole-page-container">
      <Title className="login-text" level={3}>
        Login
      </Title>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Text className="login-text">
        Don't have a accout?&nbsp;
        <Link to="/signup">Sign up</Link>
      </Text>
    </div>
  );
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.loginReducer.type,
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {
  onLogin: loginAction.login,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);