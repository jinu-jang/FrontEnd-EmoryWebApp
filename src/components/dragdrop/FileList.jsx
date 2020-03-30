import React, { Fragment } from "react";
import FileBox from "./FileBox";

const url = "http://localhost:3001";
const upload_url = url + "/api/upload";
const download_url = url + "/api/download";

const FileList = ({ files, props }) => {
  const renderFile = (fileprops, index) => {
    return (
      <FileBox
        file={fileprops.file}
        loginToken={props.loginToken}
        upload_url={upload_url}
        download_url={download_url}
      />
    );
  };

  return <Fragment>{files.map(renderFile)}</Fragment>;
};

export default FileList;
