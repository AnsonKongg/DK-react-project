import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as eventAction from "../../actions/eventAction";
import * as eventHelper from "../../utils/eventHelper";
import { Avatar, List, Space, Typography } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Calendar } from '../../components';
import { format } from 'date-fns'
const { Text } = Typography;

const Home = (props) => {
  const { eventList, userToken, getEventList } = props;
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date()); 

  useEffect(() => {
    getEventList();
  }, [getEventList]);

  const goToDetail = event_id => {
    if (userToken) {
      history.push(`/eventDetail/${event_id}`);
    } else {
      history.push('/login');
    }
  }
  // When calender date changed, refresh event list filtered by date
  const calenderDateChange = new_date => {
    const date = format(new_date,'yyyy-MM-dd')
    setSelectedDate(new_date)
    getEventList(date)
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
                  description={`${item.category} | ${item.city} | ${format(new Date(item.date), 'yyyy-MM-dd')}`}
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
          value={selectedDate}
          onChange={date => calenderDateChange(date)}
        />
      </div>
    </div>
  );
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.eventReducer.type,
  eventList: state.eventReducer.eventList,
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {
  getEventList: eventAction.getEventList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);