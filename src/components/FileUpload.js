import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";

const FileUpload = () => {
  const uploadFile = (e) => {
    e.preventDefault();
    let file = e.target.uploadFile.files[0];
    const formData = new FormData();

    formData.append("file", file);

    axios
      .post(BACKEND + "/uploadFile", formData)
      .then((res) => console.log(res))
      .catch((err) => console.warn(err));
  };
  return (
    <form onSubmit={uploadFile}>
      <h2>Resumable File Upload</h2>
      <input type="file" accept=".zip" name="uploadFile" />
      <button type="submit">Upload File</button>
      <progress value={progress} />
    </form>
  );
};

export default FileUpload;
