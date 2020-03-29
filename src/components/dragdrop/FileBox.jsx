import React, { Component, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import axios from "axios";
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

  const checkDownload = () => {
    axios
      .get(props.targetLink, {
        params: {
          csvId: props.fileId
        },
        headers: {
          Authorization: `Bearer ${props.loginToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        setDone(true);
        clearInterval(timer);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const doDownload = event => {
    event.preventDefault();
    axios
      .get(props.targetLink, {
        responseType: "blob",
        params: {
          csvId: props.fileId
        },
        headers: {
          Authorization: `Bearer ${props.loginToken}`,
          "Content-Type": "application/json",
          Accept: ".csv"
        }
      })
      .then(res => {
        const filename = props.fileName.replace(".csv", "-anonymized.csv");
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const timer = setInterval(checkDownload, 5000);

  return (
    <FileWrapper>
      <div>{props.fileName}</div>
      {done ? (
        <Icon src={CheckMark} />
      ) : (
        <Icon
          src={
            "http://cdn.lowgif.com/full/ba11c4d30b6f2054-loading-gif-transparent-background-to-setup-a-background-of-beach-just-run-it-is-best-do-this.gif"
          }
        />
      )}
      {done ? (
        <Button onClick={doDownload}>DOWNLOAD</Button>
      ) : (
        <Button disabled={true}>LOADING</Button>
      )}
    </FileWrapper>
  );
};

export default FileBox;
