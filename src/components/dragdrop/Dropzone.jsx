import React, { useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import left_arrow from "./../../img/left-arrow.png";
import right_arrow from "./../../img/right-arrow.png";
import FileList from "./FileList";

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
  display: flex;
`;

const BoxArrow = styled.svg`
  width: 100%;
  height: 80px;
  fill: #92b0b3;
  display: block;
  margin-bottom: 40px;
`;

const Arrow = styled.button`
  width: 4%;
  height: 4%;
  border: none;
  background-color: transparent;
  outline: none;
  margin-top: 7%;
`;

const url = "http://localhost:3001";
const upload_url = url + "/api/upload";
const download_url = url + "/api/download";

function MyDropzone(props) {
  const [uploaded, setUploaded] = useState(false);
  const [fileCount, addFile] = useState(0);
  const [imgPage, changePage] = useState(0);
  const [fileBoxProps, addFileBoxProps] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setUploaded(true);
    acceptedFiles.map(file => {
      addFileBoxProps(prevState => [
        ...prevState,
        { file: file }
      ]);
      return file;
    });
    addFile(fileCount => fileCount + acceptedFiles.length);
  }, []);
  console.log("fileCount:", fileCount)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()}>
      <Arrow onClick={console.log("[Dropzone] Left Arrow Click")}>
        <img src={left_arrow} alt="Left Arrow" />
      </Arrow>
      {uploaded ? (
        <FileList
          files={fileBoxProps}
          loginToken={props.loginToken}
          upload_url={upload_url}
          download_url={download_url} />
      ) : (
        <Fragment>
          <BoxArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43">
            <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
          </BoxArrow>
          <input {...getInputProps()} />
        </Fragment>
      )}
      <Arrow onClick={console.log("[Dropzone] Right Arrow Click")}>
        <img src={right_arrow} alt="Right Arrow" />
      </Arrow>
    </Box>
  );
}

export default MyDropzone;
