import React, { useEffect, useState } from "react";
import SaleService from "services/SaleService";

export default function Status() {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const consultaAPI = async () => {
      const result = await fetch(
        "https://secure-sands-97755.herokuapp.com/secretaria",
        {
          headers: {
            Authorization: "Bearer tokenardo",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setStatus(data.incumpliendo.toString()));
    };

    consultaAPI();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#50FCC0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <h1>{status}</h1>
    </div>
  );
}
