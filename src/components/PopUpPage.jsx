import React, { Component } from "react";
import styled from "styled-components";

const PopUpWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 0;
  bottom: 0;
  left: 20%;
  z-index: 1050;
  background-color: antiquewhite;
  width: 60%;
  height: 90%;
`;

class PopUpPage extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <PopUpWrapper>
        <div>
          <span className="close" onClick={this.handleClick}>
            &times;{" "}
          </span>
        </div>
      </PopUpWrapper>
    );
  }
}
export default PopUpPage;
