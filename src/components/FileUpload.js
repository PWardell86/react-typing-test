import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";
import axios from "axios";

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const uploadZipFile = async (event) => {
    event.preventDefault();
    const file = event.target.uploadFile.files[0];
    try {
      const formData = new FormData();
      formData.append("zipFile", file);

      const response = await axios.post(BACKEND, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      });

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={uploadZipFile}>
      <h2>Resumable File Upload</h2>
      <input type="file" accept=".zip" name="uploadFile" />
      <button type="submit">Upload File</button>
      <progress value={progress} />
    </form>
  );
};

export default FileUpload;
