import React from "react";
import FileBox from "./FileBox";
import styled from "styled-components";

const FileWrapper = styled.div`
  overflow: hidden;
  display: contents;
  width: 100%;
  height: 142px;
`;

const ListWrapper = styled.ul`
  margin: 0px;
  padding: 0px;
  position: relative;
  list-style-type: none;
  z-index: 1;
  width: 160%;
  height: 100%;
  left: 0%;
`;

const FileList = (props) => {
  const renderFile = (wrappedFile, index) => {
    const itemPerPage = 4;
    const hidden =
      index >= props.pageNumber * itemPerPage &&
      index < (props.pageNumber + 1) * itemPerPage;
    return (
      <FileBox
        key={index}
        file={wrappedFile.file}
        loginToken={props.loginToken}
        upload_url={props.upload_url}
        download_url={props.download_url}
        hidden={hidden}
      />
    );
  };

  return (
    <FileWrapper>
      <ListWrapper>{props.files.map(renderFile)}</ListWrapper>
    </FileWrapper>
  );
};

export default FileList;
