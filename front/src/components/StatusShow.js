import React from "react";
import alert from '../assets/alert.png'
import success from "../assets/success.png";
const StatusShow = ({value, message}) => {
  if (value) {
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <img src={success} alt="Success" width="14  0" height="100" />
        <h1>{message}</h1>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "red",
          flexDirection: 'column',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          color: 'white',
          height: 300
        }}
      >
        <img src={alert} alt="Alert" width="100" height="100" />
        <h1>{message}</h1>
      </div>
    );
  }
};

export default StatusShow;
