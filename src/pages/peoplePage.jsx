import React from "react";
import { connect } from "react-redux";
import * as peopleAction from "../actions/peopleAction";

const People = (props) => {

  return (
    <div className="row-container">
        People Page
    </div>
  );
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
