import CircularProgress from "@material-ui/core/CircularProgress";
import React from 'react'

const Loading = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          color: "black",
          flexDirection: 'column',
          height: 400   
        }}
      >
        <CircularProgress />
        <h2>Buscando su estado...</h2>
      </div>
    );
}

export default Loading;