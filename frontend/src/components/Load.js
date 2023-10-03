import React from "react";
import ReactLoading from "react-loading";

const Load = ({ type, color }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "100px",
    }}
  >
    <ReactLoading type={type} color={color} height={667} width={375} />
  </div>
);

export default Load;
