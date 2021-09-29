import React, {  } from "react";
import { Avatar, List, Space, Typography, Calendar } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
const { Text } = Typography;

const Home = (props) => {
  const listData = [];
  for (let i = 0; i < 6; i++) {
    listData.push({
      title: `Event Name Text`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes.",
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      <Text>{text}</Text>
    </Space>
  );

  return (
    <div className="row-container">
      <div className="card">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            // onChange: (page) => {
            //   console.log(page);
            // },
            pageSize: 3,
          }}
          dataSource={listData}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="4.5"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="123"
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img
                  width={250}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<b>{item.title}</b>}
                description={<Text>{item.content}</Text>}
              />
            </List.Item>
          )}
        />
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

export default Home;
