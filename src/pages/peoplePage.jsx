import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as peopleAction from "../actions/peopleAction";
import { Typography, List, Card, Divider, Skeleton, notification } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
const { Title } = Typography;
const { Meta } = Card;

const People = (props) => {
  const { userToken, userList, getAllUsers } = props;
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const itemAmount = 12;

  useEffect(() => {
    if (userToken) {
      getAllUsers(userToken);
    } else {
      notification["error"]({
        message: "Please Login",
        description:
          "Sorry. You don't have authorization to People Page. Please login or sign up.",
      });
      history.push("/");
    }
  }, [userToken, getAllUsers, history]);
  useEffect(() => {
    if (userList && userList?.length > 0) {
      loadMoreData();
    }
  }, [userList]);

  const loadMoreData = () => {
    if (userList && userList?.length > 0 && !loading) {
      setLoading(true);
      if (dataIndex + itemAmount > userList.length - 1) {
        setData([...data, ...userList.slice(dataIndex)]);
        setDataIndex(userList.length - 1);
      } else {
        setData([
          ...data,
          ...userList.slice(dataIndex, dataIndex + itemAmount),
        ]);
        setDataIndex(dataIndex + itemAmount);
      }
      setLoading(false)
    }
  };

  if (!userList && userList?.length === 0) {
    return;
  } else {
    return (
      <div className="people-page-backgroup">
        <Title level={2}>All people</Title>
        {!loading && (
          <InfiniteScroll
            dataLength={data.length}
            next={() => loadMoreData()}
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
                          item.profile_picture_url ||
                          "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
        )}
      </div>
    );
  }
};

// Selectors
const mapStateToProps = (state) => ({
  type: state.peopleReducer.type,
  userList: state.peopleReducer.userList,
  userToken: state.loginReducer.userToken,
});

// Dispatch actions
const mapDispatchToProps = {
  getAllUsers: peopleAction.getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
