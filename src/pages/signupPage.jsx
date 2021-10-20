import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as types from "../config/ActionTypes";
import * as loginAction from "../actions/loginAction";
import { Link } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
const { Text, Title } = Typography;

const SignUp = (props) => {
  const { type, userToken, onSignUp } = props;
  const history = useHistory();

  useEffect(() => {
    if (type === types.SIGNUP_SUCCESS && userToken) {
      history.goBack();
    }
  }, [type, userToken, history]);

  const onFinish = (values) => {
    onSignUp(values);
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
        Sign up
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
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
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
            Create an account
          </Button>
        </Form.Item>
      </Form>
      <Text className="login-text">
        Already have an account?&nbsp;
        <Link to="/login">Login</Link>
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
  onSignUp: loginAction.signup,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
