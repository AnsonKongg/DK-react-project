import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as eventAction from "../actions/eventAction";
import * as eventHelper from "../utils/eventHelper";
import { Avatar, List, Space, Typography, Calendar } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
const { Text } = Typography;

const Home = (props) => {
  const { eventList, getEventList } = props;
  const history = useHistory();

  useEffect(() => {
    getEventList();
  }, [getEventList]);

  const goToDetail = event_id => {
    history.push(`/eventDetail/${event_id}`);
  } 
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      <Text>{text}</Text>
    </Space>
  );

  return (
    <div className="row-container">
      <div className="event-list">
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
                        ? eventHelper.calculateRate(item.event_reviews)
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
                onClick={() => goToDetail(item.id)}
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
