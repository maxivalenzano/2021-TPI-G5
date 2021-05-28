import React, { useState } from "react";
import Container from '@material-ui/core/Container'
import { DataGrid } from '@material-ui/data-grid'
import moment from 'moment'

export default function Report() {

    const [data, setData] = useState([])
  
    fetch("http://localhost:8081/ventas")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      });
  
      const prettyDate = {
        type: "date",
        width: 130,
        valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY')
      };
  
  const currencyFormatter = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  });

  const usdPrice = {
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  };

    const columns = [
      { field: "_id", headerName: "ID", width: 270 },
      { field: "denominacion", headerName: "Denominacion", width: 190 },
      { field: "codigo_ean", headerName: "EAN", width: 190 },
      { field: "cantidad_vend", headerName: "Cantidad", width: 130 },
      { field: "precio", headerName: "Precio", ...usdPrice },
      { field: "fecha", headerName: "Fecha", ...prettyDate },
      
    ];

    const rows = data
    
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          flexDirection: 'column'
        }}
      >
        <Container maxWidth="lg">
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              pageSize={10}
            />
          </div>
        </Container>
        <button style={{padding: 25, margin: 20}} onClick={() => alert('REPORTE ENVIADO')} >ENVIAR REPORTE</button>
      </div>
    );
}