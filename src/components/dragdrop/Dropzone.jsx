import React, { useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import FormData from "form-data";
import FileBox from "./FileBox";

const ErrorSpan = styled.span`
  color: red;
  font-weight: bold;
`;

const Box = styled.div`
  margin-top: 30px;
  outline: 2px dashed #92b0b3;
  background-color: #c8dadf;
  outline-offset: -10px;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
  padding: 100px 20px;

  p:hover b {
    color: #39bfd3;
  }
`;

const BoxIcon = styled.svg`
  width: 100%;
  height: 80px;
  fill: #92b0b3;
  display: block;
  margin-bottom: 40px;
`;

const url = "http://localhost:3001";
const download_url = url + '/api/download';
const instance = axios.create({
  baseURL: url,
  "Content-Type": "multipart"
});

function MyDropzone(props) {
  const [error, setError] = useState("");
  const [csvId, setCsvId] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(acceptedFile => {
    const form = new FormData();
    form.append("target_csv", acceptedFile[0]);
    form.append("target_col", "Hello");
    setFileName(acceptedFile[0].name);

    instance
      .post("/api/upload", form, {
        headers: {
          Authorization: `Bearer ${props.loginToken}`
        }
      })
      .then(response => {
        setCsvId(response.data.csvId);
        setError("");
        setUploaded(true);
      })
      .catch(error => {
        setError(error.data.message);
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()}>
      {error && <ErrorSpan>${error}</ErrorSpan>}
      {uploaded ? (
        <FileBox loginToken={props.loginToken} fileName={fileName} fileId={csvId} targetLink={download_url}/>
      ) : (
        <Fragment>
          <BoxIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43">
            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
          </BoxIcon>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop it</p>
          ) : (
            <p>
              <b>Choose a file</b> or drag it here
            </p>
          )}
        </Fragment>
      )}
    </Box>
  );
}

export default MyDropzone;
