import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
import CheckMark from "./../../img/check-mark.png";
import DetailMark from "./../../img/detail-mark.png";
import LoadingMark from "./../../img/loading-mark.gif";

const FileWrapper = styled.li`
  background-color: #fff0ed;
  height: auto;
  width: 22%;
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

class FileBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      error: "",
      detailDone: false,
    };
    this.csvId = "";

    const form = new FormData();
    form.append("target_csv", props.file);
    form.append("target_col", "Hello");
    axios
      .post(props.upload_url, form, {
        headers: {
          Authorization: `Bearer ${props.loginToken}`,
          "Content-Type": "multipart",
        },
      })
      .then((response) => {
        this.csvId = response.data.csvId;
        this.state.error = "";
      })
      .catch((error) => {
        this.state.error = error.message;
        console.log(this.state.error);
      });
    this.timer = setInterval(this.checkDownload.bind(this), 5000);
  }

  checkDownload() {
    console.log("checkDownload", this.csvId);
    axios
      .get(this.props.download_url, {
        params: {
          csvId: this.csvId,
        },
        headers: {
          Authorization: `Bearer ${this.props.loginToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.setState({ done: true });
        clearInterval(this.timer);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  doDownload(event) {
    event.preventDefault();
    axios
      .get(this.props.download_url, {
        responseType: "blob",
        params: {
          csvId: this.csvId,
        },
        headers: {
          Authorization: `Bearer ${this.props.loginToken}`,
          "Content-Type": "application/json",
          Accept: ".csv",
        },
      })
      .then((res) => {
        const filename = this.props.file.name.replace(
          ".csv",
          "-anonymized.csv"
        );
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <FileWrapper
        style={{ display: this.props.hidden ? "inline-block" : "none" }}
      >
        <div>{this.props.file.name}</div>
        {this.state.done ? (
          this.state.detailDone ? (
            <Fragment>
              <Icon src={CheckMark} />
              <Button onClick={this.doDownload.bind(this)}>DOWNLOAD</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Icon src={DetailMark} />
              <Button onClick={this.doDownload.bind(this)}>DETAIL</Button>
            </Fragment>
          )
        ) : (
          <Fragment>
            <Icon src={LoadingMark} />
            <Button disabled={true}>LOADING</Button>
          </Fragment>
        )}
      </FileWrapper>
    );
  }
}

export default FileBox;
