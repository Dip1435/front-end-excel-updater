import { useState } from "react";
import axios from "axios";

export default function ExcelUploader() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    setIsLoading(true);
    setDownloadLink("");

    const formData = new FormData();
    formData.append("excel", file);

    try {
      const response = await axios.post(
        "https://backend-excel-updater.onrender.com/upload",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error processing file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Upload Excel File</h2>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed p-6 rounded-lg ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <p className="text-gray-700 font-medium">{file.name}</p>
          ) : (
            <p className="text-gray-500">Drag & Drop your file here or click to select</p>
          )}
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="mt-2 block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
          >
            Select File
          </label>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`mt-6 px-5 py-2 text-white rounded-md w-full ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Upload & Process"}
        </button>

        {/* Loading Indicator */}
        {isLoading && (
          <p className="mt-3 text-gray-600 animate-pulse">Processing file, please wait...</p>
        )}

        {/* Download Link */}
        {downloadLink && (
          <a
            href={downloadLink}
            download="updated_data.xlsx"
            className="mt-6 block px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download Updated File
          </a>
        )}
      </div>
    </div>
  );
}
