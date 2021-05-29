import React, { useState } from "react";
import Container from '@material-ui/core/Container'
import Button from "@material-ui/core/Button";
import { DataGrid } from '@material-ui/data-grid'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import moment from 'moment'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Report() {

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  
  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

    
    fetch("https://secure-sands-97755.herokuapp.com/ventas")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false)
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
          flexDirection: "column",
        }}
      >
        <Container maxWidth="lg">
          <div style={{ height: 580, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={rows}
              columns={columns}
              pageSize={9}
              loading={loading}
            />
          </div>
        </Container>
        <Button variant='contained' onClick={handleClick} style={{margin: 25}}>
          Enviar Reporte
        </Button>
        <Snackbar anchorOrigin={{vertical:'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            El reporte se envió correctamente!
          </Alert>
        </Snackbar>
      </div>
    );
}