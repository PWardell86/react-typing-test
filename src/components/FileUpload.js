import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";
import axios from "axios";

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const chunkSize = 64 * 1024 * 1024; // 1 MB chunks

  const uploadFile = async (file) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    let failed = false;
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunk", i);
      formData.append("totalChunks", totalChunks);

      try {
        const response = await axios.post(BACKEND + "/uploadFile", formData);
        setProgress((i + 1) / totalChunks);
      } catch (error) {
        failed = true;
        alert("Failed to upload file. Maybe try again?");
        break;
      }
    }
    if (failed) {
      document.getElementById("completed-status").innerText = "Failed";
    } else {
      document.getElementById("completed-status").innerText = "Completed";
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        uploadFile(e.target.zipFile.files[0]);
      }}
    >
      <input type="file" accept=".zip" name="zipFile" required />
      <button type="submit">Upload File</button>
      <progress value={progress} />
      <span id="completed-status">Waiting...</span>
    </form>
  );
};

export default FileUpload;
