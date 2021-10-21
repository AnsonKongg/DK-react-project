import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as peopleAction from "../actions/peopleAction";
import { Typography, List, Card, Divider, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
const { Title } = Typography;
const { Meta } = Card;

const People = (props) => {
  const { userList, getAllUsers } = props;
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const itemAmount = 12;

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  useEffect(() => {
    if (userList && userList?.length > 0) {
      loadMoreData();
    }
  }, [userList]);

  const loadMoreData = () => {
    if (userList && userList?.length > 0) {
      if (dataIndex + itemAmount > userList.length - 1) {
        setData([...data, ...userList.slice(dataIndex)]);
        setDataIndex(userList.length - 1);
      } else {
        setData([...data, ...userList.slice(dataIndex, dataIndex + itemAmount)]);
        setDataIndex(dataIndex + itemAmount);
      }
    }
  };

  if (!userList && userList?.length === 0) {
    return;
  } else {
    return (
      <div className="people-page-backgroup">
        <Title level={2}>All people</Title>
        <InfiniteScroll
          dataLength={data.length}
          next={()=> loadMoreData()}
          hasMore={data.length < userList.length}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  cover={
                    <img
                      alt="example"
                      src={
                        item.profile_picture_url
                          ? item.profile_picture_url
                          : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      }
                    />
                  }
                >
                  <Meta
                    title={`${item.first_name} ${item.last_name}`}
                    description={item.email}
                  />
                </Card>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    );
  }
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.peopleReducer.type,
  userList: state.peopleReducer.userList,
});

// Dispatch actions
const mapDispatchToProps = {
  getAllUsers: peopleAction.getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
