import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as eventAction from "../actions/eventAction";
import { Avatar, List, Space, Typography, Calendar } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
const { Text } = Typography;

const Home = (props) => {
  const { type, eventList, getEventList } = props;

  useEffect(() => {
    getEventList();
  }, [getEventList]);

  // Calculate the average of event_reviews rate
  const calculateRate = (event_reviews) => {
    const sum =
      event_reviews.reduce(
        (previousValue, currentValue) => previousValue + currentValue.rate,
        0
      ) / event_reviews.length;
    return Number(sum).toFixed(1);
  };
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      <Text>{text}</Text>
    </Space>
  );

  return (
    <div className="row-container">
      <div className="card">
        {eventList && eventList.length > 0 && (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              // onChange: (page) => {
              //   console.log(page);
              // },
              pageSize: 3,
            }}
            dataSource={eventList}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text={
                      item.event_reviews?.length
                        ? calculateRate(item.event_reviews)
                        : 0
                    }
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.event_reviews?.length ?? 0}
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.picture_url} />}
                  title={<b>{item.title}</b>}
                  description={`${item.category} | ${item.city} | ${item.date}`}
                />
                {item.description}
              </List.Item>
            )}
          />
        )}
      </div>
      <div className="home-calendar">
        <Calendar
          fullscreen={false}
          // onPanelChange={onPanelChange}
        />
      </div>
    </div>
  );
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.eventReducer.type,
  eventList: state.eventReducer.eventList,
});

// Dispatch actions
const mapDispatchToProps = {
  getEventList: eventAction.getEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
