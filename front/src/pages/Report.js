import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import SaleService from "services/SaleService";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Report(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const consultaAPI = async () => {
      const result = await SaleService.getAll();
      setData(result.data);
      setLoading(false);
    };

    consultaAPI();
  }, []);

  /* Esta wea esta mal

     fetch("https://secure-sands-97755.herokuapp.com/ventas")
       .then((response) => response.json())
       .then((data) => {
         setData(data);
         setLoading(false)
       });
       
  */

  const prettyDate = {
    type: "date",
    width: 130,
    valueFormatter: ({ value }) => moment(value).format("DD/MM/YYYY"),
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

  const rows = data;

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
            onCellDoubleClick={(row) => {
              props.history.push("/item/" + row.row._id);
            }}
          />
        </div>
      </Container>

      <div style={{ margin: 25 }}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Enviar Reporte
            </Button>
          </Grid>
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Volver Atrás
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          El reporte se envió correctamente!
        </Alert>
      </Snackbar>
    </div>
  );
}
