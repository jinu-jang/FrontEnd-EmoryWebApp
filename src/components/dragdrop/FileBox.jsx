import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import something from "./../../img/left-arrow.png";
import CheckMark from "./../../img/check-mark.png";

const FileWrapper = styled.div`
  background-color: #fff0ed;
  height: auto;
  width: 20%;
  margin: 0 auto;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: normal;
  border-radius: 4px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border: 1px solid #ccc;
  color: #333;
  display: block;
  text-align: -webkit-match-parent;
`;

const ButtonWrapper = styled.button`
  display: block;
  cursor: pointer !important;
  border: inherit;
  border-radius: 3px 3px 3px 3px;
  margin-top: 5px;
  overflow: hidden;
  width: auto;
  background-color: #ffdb84;
  line-height: 18px;
  color: #333333;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
  padding: 0;
  outline: 0;
  font-style: inherit;
  font-family: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
`;

const Icon = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  padding-left: 15px;
  padding-right: 15px;
`;

const FileBox = props => {
  const [done, setDone] = useState(false);
  return (
    <FileWrapper>
      <div>{props.FileId}</div>
      {done ? (
        <Icon src={CheckMark} />
      ) : (
        <Icon
          src={
            "http://cdn.lowgif.com/full/ba11c4d30b6f2054-loading-gif-transparent-background-to-setup-a-background-of-beach-just-run-it-is-best-do-this.gif"
          }
        />
      )}
      <ButtonWrapper>
        {done ? (
          <Button onClick={e => setDone(true)}>DOWNLOAD</Button>
        ) : (
          <Button disabled={true}>LOADING</Button>
        )}
      </ButtonWrapper>
    </FileWrapper>
  );
};

export default FileBox;
