import React, { Fragment } from "react";
import FileBox from "./FileBox";

const FileList = props => {
  const renderFile = (wrappedFile, index) => {
    return (
      <FileBox
        key={index}
        file={wrappedFile.file}
        loginToken={props.loginToken}
        upload_url={props.upload_url}
        download_url={props.download_url}
      />
    );
  };

  return (
    <Fragment>
      {props.files
        .slice(props.pageNumber * 4, (props.pageNumber + 1) * 4)
        .map(renderFile)}
    </Fragment>
  );
};

export default FileList;
