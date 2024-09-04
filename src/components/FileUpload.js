import React, { useState } from "react";
import { BACKEND } from "../ServerAPI";
import axios from "axios";

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const chunkSize = 1024 * 1024; // 1 MB chunks

  const uploadFile = async (file) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    for (let i = 0; i < totalChunks; i++) {
      setProgress(i / totalChunks);
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("chunk", i);
      formData.append("totalChunks", totalChunks);

      try {
        const response = await axios.post(BACKEND + "/uploadFile", formData);
        // Handle response and progress updates
      } catch (error) {
        // Handle errors and retry failed chunks
      }
    }
  };
  return (
    <form onSubmit={(e) => uploadFile(e.target.zipFile.files[0])}>
      <input type="file" accept=".zip" name="zipFile" required />
      <button type="submit">Upload File</button>
      <progress value={progress} />
    </form>
  );
};

export default FileUpload;
