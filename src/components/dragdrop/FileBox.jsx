import React, { Component, useState } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import axios from "axios";
import FormData from "form-data";
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

class FileBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done : false,
      csvId : "",
      error: "",
    }
    const form = new FormData();
    form.append("target_csv", props.file);
    form.append("target_col", "Hello");
    axios
    .post(props.upload_url, form, {
      headers: {
        Authorization: `Bearer ${props.loginToken}`,
        "Content-Type": "multipart"
      }
    })
    .then(response => {
      this.state.csvId = response.data.csvId
      this.state.error = "";
    })
    .catch(error => {
      this.state.error = error.message;
      console.log(this.state.erro);
    });
    this.state.timer = setInterval(this.checkDownload.bind(this), 5000);
  }

  checkDownload() {
    console.log('checkDownload', this.state.csvId);
    axios
      .get(this.props.download_url, {
        params: {
          csvId: this.state.csvId
        },
        headers: {
          Authorization: `Bearer ${this.props.loginToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.state.done = true;
        clearInterval(this.state.timer);
      })
      .catch(err => {
        console.log(err);
      });
  }

  doDownload(event) {
    event.preventDefault();
    axios
      .get(this.props.download_url, {
        responseType: "blob",
        params: {
          csvId: this.state.csvId
        },
        headers: {
          Authorization: `Bearer ${this.props.loginToken}`,
          "Content-Type": "application/json",
          Accept: ".csv"
        }
      })
      .then(res => {
        const filename = this.props.file.name.replace(".csv", "-anonymized.csv");
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
  }

  render() {
    return (
      <FileWrapper>
        <div>{this.props.file.name}</div>
        {this.state.done ? (
          <Icon src={CheckMark} />
        ) : (
          <Icon
            src={
              "http://cdn.lowgif.com/full/ba11c4d30b6f2054-loading-gif-transparent-background-to-setup-a-background-of-beach-just-run-it-is-best-do-this.gif"
            }
          />
        )}
        {this.state.done ? (
          <Button onClick={this.doDownload.bind(this)}>DOWNLOAD</Button>
        ) : (
          <Button disabled={true}>LOADING</Button>
        )}
      </FileWrapper>
    );
  }
}

export default FileBox;
