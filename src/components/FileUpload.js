import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";
import axios from "axios";

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const uploadZipFile = async (file) => {
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
    <div>
      <h2>Resumable File Upload</h2>
      <input type="file" />
      <button onClick={uploadZipFile}>Upload File</button>
      <progress value={progress} />
    </div>
  );
};

export default FileUpload;
