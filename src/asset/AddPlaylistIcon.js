import React from "react";

const AddPlaylistIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-playlist-add"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" fill="none" /> 
      <path d="M19 8h-14" stroke={fill} /> 
      <path d="M5 12h9" stroke={fill} /> 
      <path d="M11 16h-6" stroke={fill} /> 
      <path d="M15 16h6" stroke={fill}/>{" "}
      <path d="M18 13v6" stroke={fill}/>{" "}
    </svg>
  );
};

export default AddPlaylistIcon;
