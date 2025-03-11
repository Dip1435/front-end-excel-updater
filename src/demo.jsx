import { useState } from "react";
import axios from "axios";

export default function ExcelUploader() {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("excel", file);

    try {
      const response = await axios.post("https://backend-excel-updater.onrender.com/upload", formData, {
        responseType: "blob", // Expect file response
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error processing file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold my-10">Upload Excel File</h2>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="mb-10 h-8 shadow-xl cursor-pointer border-2 border-blue-500 rounded-md" />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload & Process
        </button>
        {downloadLink && (
          <a
            href={downloadLink}
            download="updated_data.xlsx"
            className="block mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download Updated File
          </a>
        )}
      </div>
    </div>
  );
}
