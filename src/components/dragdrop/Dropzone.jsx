import React, { useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import left_arrow from "./../../img/left-arrow.png";
import right_arrow from "./../../img/right-arrow.png";
import FileList from "./FileList";
import { Button } from "react-bootstrap";
import setting from "./../../img/setting.png";
import PopUp from "./../PopUpPage";

const Box = styled.div`
  margin-top: 30px;
  outline: 2px dashed #92b0b3;
  background-color: #c8dadf;
  outline-offset: -10px;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
  padding: 100px 20px;
  overflow: hidden;

  p:hover b {
    color: #39bfd3;
  }
  display: grid;
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
  margin-top: 10%;
`;

const DropBox = styled.div`
  display: flex;
  margin-bottom: 5%;
  justify-content: space-between;
`;

const SettingBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SettingIcon = styled.button`
  width: 4%;
  height: 4%;
  border: none;
  background-color: transparent;
  outline: none;
  margin-right: 10%;
`;

const url = process.env.REACT_APP_BACKEND_URL;
console.log(`dropzone url: ${url}`);
const upload_url = url + "/api/upload";
const download_url = url + "/api/download";

function MyDropzone(props) {
  const [uploaded, setUploaded] = useState(false);
  const [fileCount, addFile] = useState(0);
  const [pageNumber, changePage] = useState(0);
  const [fileBoxProps, addFileBoxProps] = useState([]);
  const [checkedBoxs, changeCheckBox] = useState([]);
  const [seen, togglePop] = useState(false);
  const itemPerPage = 4;

  const onDrop = useCallback((acceptedFiles) => {
    setUploaded(true);
    for (let i = 0; i < acceptedFiles.length; i++) {
      changeCheckBox((checkedBoxs) => [...checkedBoxs, false]);
    }
    acceptedFiles.map((file) => {
      addFileBoxProps((prevState) => [...prevState, { file }]);
      return file;
    });
    addFile((fileCount) => {
      fileCount += acceptedFiles.length;
      changePage(Math.floor((fileCount - 1) / 4));
      return fileCount;
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function LeftArrowAction(event) {
    event.preventDefault();
    pageNumber !== 0
      ? changePage((pageNumber) => pageNumber - 1)
      : console.log("first page");
  }

  function RightArrowAction(event) {
    event.preventDefault();
    pageNumber < (fileCount - itemPerPage) / itemPerPage
      ? changePage((pageNumber) => pageNumber + 1)
      : console.log("last page");
  }

  function SelectAllButtonAction(event) {
    event.preventDefault();
    for (let i = 0; i < checkedBoxs.length; i++)
      changeCheckBox(checkedBoxs.map(() => true));
  }

  function DeselectAllButtonAction(event) {
    event.preventDefault();
    for (let i = 0; i < checkedBoxs.length; i++)
      changeCheckBox(checkedBoxs.map(() => false));
  }

  function handleClick(i) {
    const boxs = checkedBoxs.slice();
    boxs[i] = checkedBoxs[i] ^ true;
    changeCheckBox(() => boxs);
  }

  function changePopUp(event) {
    togglePop((seen) => !seen);
  }

  return (
    <Box {...getRootProps()}>
      <DropBox>
        {seen ? <PopUp toggle={changePopUp} /> : null}
        <div>
          <Button onClick={SelectAllButtonAction}>Select All</Button>
          <Button onClick={DeselectAllButtonAction}>Deselect All</Button>
        </div>
        <div>
          <Button>Submit All</Button>
        </div>
      </DropBox>
      <DropBox>
        <Arrow onClick={LeftArrowAction}>
          <img src={left_arrow} alt="Left Arrow" />
        </Arrow>
        {uploaded ? (
          <FileList
            files={fileBoxProps}
            loginToken={props.loginToken}
            upload_url={upload_url}
            download_url={download_url}
            pageNumber={pageNumber}
            itemPerPage={itemPerPage}
            checkedBoxs={checkedBoxs}
            clickHandler={(i) => handleClick(i)}
          />
        ) : (
          <Fragment>
            <BoxArrow xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 43">
              <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
            </BoxArrow>
            <input {...getInputProps()} />
          </Fragment>
        )}
        <Arrow onClick={RightArrowAction}>
          <img src={right_arrow} alt="Right Arrow" />
        </Arrow>
      </DropBox>
      <SettingBox>
        <SettingIcon onClick={changePopUp}>
          <img src={setting} />
        </SettingIcon>
      </SettingBox>
    </Box>
  );
}

export default MyDropzone;
