import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as eventHelper from "../utils/eventHelper";
import * as eventAction from "../actions/eventAction";
import * as types from "../config/ActionTypes";
import {
  Avatar,
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Rate,
  List,
  Modal,
} from "antd";
import { StarOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const { Text, Title } = Typography;

const EventDetail = (props) => {
  const { type, eventDetail, userToken, getEventDetail, attendEvent, withdrawEvent } = props;
  const { eventId } = useParams();
  const history = useHistory();
  const rating = useMemo(
    () => eventHelper.calculateRate(eventDetail.reviews),
    [eventDetail.reviews]
  );
  const userAttended = useMemo(
    () => eventHelper.checkUserAttend(eventDetail.attendees, 35),
    [eventDetail.attendees]
  );

  useEffect(() => {
    if (userToken) {
      getEventDetail(eventId, userToken);
    } else {
      history.push("/login");
    }
  }, [userToken, eventId, getEventDetail, history]);
  useEffect(() => {
    if (type === types.ATTEND_EVENT_SUCCESS) {
      Modal.success({
        content: 'You have successfully registered this event.',
      });
      getEventDetail(eventId)
    }
    else if (type === types.WITHDRAW_EVENT_SUCCESS) {
      Modal.success({
        content: 'You have successfully removed the registeration of this event.',
      });
      getEventDetail(eventId)
    }
  }, [type, eventId, getEventDetail]);

  const _attendClicked = () => {
    attendEvent(eventId);
  };
  const _withdrawAttendClicked = () => {
    withdrawEvent(eventId);
  };

  if (!eventDetail) {
    return;
  } else {
    return (
      <div className="row-container">
        <div className="card">
          <Title level={3}>{eventDetail.title}</Title>
          <Row justify="space-between">
            <Col>
              <Text>Category</Text>
            </Col>
            <Col>
              <StarOutlined />
              <Text style={{ paddingLeft: 5 }}>{rating}</Text>
            </Col>
          </Row>
          <Row className="card-padding" justify="center">
            <img
              className="card-image"
              alt="cardImage"
              src={eventDetail.picture_url}
            />
          </Row>
          <Row className="card-padding" justify="center">
            <Text>{eventDetail.description}</Text>
          </Row>
          <Divider />
          <Row className="card-host-container" align="middle">
            <Avatar size="large" src={eventDetail?.host?.profile_picture_url} />
            <Text style={{ paddingLeft: 10 }}>
              Host Name: {eventDetail?.host?.first_name}{" "}
              {eventDetail?.host?.last_name}
            </Text>
          </Row>
          <div className="card-icons-container">
            <Text style={{ paddingBottom: "5px" }}>Who's coming?</Text>
            <div>
              {eventDetail.attendees?.length > 0 &&
                eventDetail.attendees.map((attendee) =>
                  attendee.profile_picture_url ? (
                    <Avatar
                      key={attendee.id}
                      style={{ marginRight: "20px" }}
                      src={attendee.profile_picture_url}
                    />
                  ) : (
                    <Avatar
                      key={attendee.id}
                      style={{ marginRight: "20px" }}
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  )
                )}
            </div>
          </div>
          <Divider />
          <div className="card-host-container">
            <Text strong>What other people think about this event?</Text>
          </div>
          {eventDetail.reviews?.length > 0 && (
            <List
              itemLayout="vertical"
              pagination={{
                pageSize: 5,
              }}
              dataSource={eventDetail.reviews}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <div className="row-container">
                    <Rate value={item.rate} />
                    <Text type="secondary">
                      posted at:{" "}
                      {format(new Date(item.created_at), "MM/dd - h:mm")}
                    </Text>
                  </div>
                  <Text>Review - {item.review}</Text>
                </List.Item>
              )}
            />
          )}
        </div>
        <div className="card-small">
          <Row justify="space-between">
            <Col>
              <Text>Date & Time</Text>
            </Col>
            <Col>
              <Text>
                {eventDetail.date &&
                  format(new Date(eventDetail.date), "MM/dd - h:mm")}
              </Text>
            </Col>
          </Row>
          <Row className="card-padding" justify="space-between">
            <Col>
              <Text>City</Text>
            </Col>
            <Col>
              <Text>{eventDetail.city}</Text>
            </Col>
          </Row>
          <Row className="card-padding" justify="center">
            <div
              style={{
                width: "27vw",
                height: "30vh",
                position: "relative",
              }}
            >
              <Map
                style={{
                  width: "27vw",
                  height: "30vh",
                  position: "relative",
                }}
                initialCenter={{
                  lat: eventDetail.lat ? Number(eventDetail.lat) : 0,
                  lng: eventDetail.long ? Number(eventDetail.long) : 0,
                }}
                center={{
                  lat: eventDetail.lat ? Number(eventDetail.lat) : 0,
                  lng: eventDetail.long ? Number(eventDetail.long) : 0,
                }}
                zoom={15}
                google={props.google}
              >
                <Marker
                  name={"User Location"}
                  key={"userLocation"}
                  position={{
                    lat: Number(eventDetail.lat),
                    lng: Number(eventDetail.long),
                  }}
                />
              </Map>
            </div>
          </Row>
          <Divider />
          {userAttended ? (
            <div className="card-small-text-container ">
              <Text className="card-small-text " strong>
                You are attending this event
              </Text>
              <Button
                className="card-button"
                size="large"
                onClick={() => _withdrawAttendClicked()}
              >
                Withdraw Attendence
              </Button>
            </div>
          ) : (
            <Button
              className="card-button"
              type="primary"
              size="large"
              onClick={() => _attendClicked()}
            >
              Attend
            </Button>
          )}
        </div>
      </div>
    );
  }
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.eventReducer.type,
  eventDetail: state.eventReducer.eventDetail,
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {
  getEventDetail: eventAction.getEventDetail,
  attendEvent: eventAction.attendEvent,
  withdrawEvent: eventAction.withdrawEvent,
};

const EventDetailMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API,
  libraries: ["visualization"],
})(EventDetail);
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailMap);
