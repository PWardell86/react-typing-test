import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";

const FileUpload = () => {
  return (
    <form
      action={BACKEND + "/uploadFile"}
      method="POST"
      enctype="multipart/form-data"
    >
      <h2>Resumable File Upload</h2>
      <input type="file" accept=".zip" name="uploadFile" />
      <button type="submit">Upload File</button>
      <progress value={progress} />
    </form>
  );
};

export default FileUpload;
