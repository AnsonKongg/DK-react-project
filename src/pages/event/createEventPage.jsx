import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as eventHelper from "../../utils/eventHelper";
import * as eventAction from "../../actions/eventAction";
import * as types from "../../config/ActionTypes";
import { Input, Button, Typography, Row, Col, Select } from "antd";
import { DatePicker } from '../../components';
import { format } from "date-fns";
import { useFormik, Formik } from "formik";
const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HostEvent = (props) => {
  const { type, userToken } = props;
  const history = useHistory();

  useEffect(() => {
    if (!userToken) {
      history.push("/login");
    }
  }, [userToken, history]);

  return (
    <div className="row-container">
      <div className="card">
        <Title level={3}>Create a new event</Title>
        <Formik
          initialValues={{ startDate: new Date() }}
          validate={(props, a) => console.log("a", props, a)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <form>
              <Text htmlFor="title">Title</Text>
              <Input
                id="title"
                name="title"
                onChange={(e) => setFieldValue("title", e.target.value)}
                value={values.title}
              />

              <Text htmlFor="description">Description</Text>
              <TextArea
                id="description"
                name="description"
                rows={5}
                onChange={(e) => setFieldValue("description", e.target.value)}
                value={values.description}
              />
              <Row justify="space-between">
                <Col span={12}>
                  <Text htmlFor="date">Date</Text>
                </Col>
                <Col span={11} offset={1}>
                  <Text htmlFor="category">Category</Text>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={12}>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Select a date"
                    onChange={(date,string) => {
                      console.log(date)
                      // console.log(string)
                      setFieldValue("date", date)
                    }
                    }
                  />
                </Col>
                <Col span={11} offset={1}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Search a category"
                    onChange={(selectionValue) =>
                      setFieldValue("category", selectionValue)
                    }
                  >
                    <Option value="Art">Art</Option>
                    <Option value="Business">Business</Option>
                    <Option value="Learning">Learning</Option>
                    <Option value="Music">Music</Option>
                    <Option value="Social">Social</Option>
                    <Option value="Sports">Sports</Option>
                    <Option value="Tech">Tech</Option>
                  </Select>
                </Col>
              </Row>

              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
      <div className="card-small">
        <Button
          className="card-button"
          type="primary"
          size="large"
          //   onClick={() => attendEvent(eventId, userToken)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.eventReducer.type,
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {
  getEventDetail: eventAction.getEventDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(HostEvent);
