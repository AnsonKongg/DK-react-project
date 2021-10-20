import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as eventHelper from "../utils/eventHelper";
import * as eventAction from "../actions/eventAction";
import { Avatar, Typography, Row, Col, Divider, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { format } from 'date-fns'
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const { Text, Title } = Typography;

const EventDetail = (props) => {
  const { userToken, eventDetail, getEventDetail } = props;
  const { eventId } = useParams();
  const history = useHistory();
  const rating = useMemo(() => eventHelper.calculateRate(eventDetail.reviews),[eventDetail.reviews]);

  useEffect(() => {
    if (userToken) {
      getEventDetail(eventId, userToken);
    } else {
      history.push('/login');
    }
  }, [userToken, eventId, getEventDetail, history]);

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
              <Text style={{ paddingLeft: 5 }}>
                {rating}
              </Text>
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
        </div>
        <div className="card-small">
          <Row justify="space-between">
            <Col>
              <Text>Date & Time</Text>
            </Col>
            <Col>
              <Text>{eventDetail.date && format(new Date(eventDetail.date), "MM/dd - h:mm")}</Text>
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
                  lat: Number(eventDetail.lat),
                  lng: Number(eventDetail.long),
                }}
                center={{
                  lat: Number(eventDetail.lat),
                  lng: Number(eventDetail.long),
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
          <Button className="card-button" type="primary" size="large">
            Attend
          </Button>
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
};

const EventDetailMap = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API,
  libraries: ["visualization"],
})(EventDetail);
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailMap);
