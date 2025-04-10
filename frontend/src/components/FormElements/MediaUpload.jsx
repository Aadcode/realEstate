import React from "react";

const MediaUpload = ({ labelStyle, inputStyle }) => {
  return (
    <div className="mt-6">
      <div className="mb-2">
        <label className={labelStyle}>Media</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition cursor-pointer">
          <p className="text-gray-500">Drop files here or click to upload.</p>
        </div>
      </div>
      <div>
        <label className={labelStyle}>Video (mp4)</label>
        <input type="file" accept="video/mp4" className={inputStyle} />
      </div>
    </div>
  );
};

export default MediaUpload;
