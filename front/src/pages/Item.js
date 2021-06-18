import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Snackbar,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SaleService from "services/SaleService";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";

import { useForm, Controller } from "react-hook-form";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Item(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendingDelete, setSendingDelete] = useState(false)
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("warning");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [item, setItem] = useState({
    id: "",
    denominacion: "",
    codigo_ean: "",
    cantidad_vend: "",
    precio: "",
    fecha: moment().format("yyyy-MM-DD"),
  });

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const consultaAPI = async () => {
      const result = await SaleService.get(props.match.params.id);
      console.log("Obtenido de la API", result.data);
      setItem(result.data);
    };

    consultaAPI();
  }, [props.match.params.id]);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmit = async (data) => {
    setSending(true);
    console.log("Item a modificar:", data);

    await SaleService.update(item._id, data)
      .then((response) => {
        console.log("Item updateado", response.data);
        // setItem(response.data); //hasta que esté deployado en Heroku la actualizacion
        setStatus("success")
        setMessage("La venta se modificó correctamente")
        setOpen(true);
      })
      .catch((e) => {
        // console.log(e.message);
        if (e.message === `Request failed with status code 403`) {
          setStatus("error");
          setMessage("No tiene autorizacion para modificar, llame a un Administrador")
        } else {
        setMessage(JSON.stringify(e.message));
          setStatus("warning")
        }
        setOpen(true);
      });
    setSending(false);
  };

  const resetForm = () => {
    reset({
      denominacion: item.denominacion,
      codigo_ean: item.codigo_ean,
      cantidad_vend: item.cantidad_vend,
      precio: item.precio,
      fecha: moment(item.fecha).format("yyyy-MM-DD"),
    });
  };

  const deteleItem = async () => {
    setSendingDelete(true);
    await SaleService.remove(item._id)
      .then((response) => {
        console.log("Eliminado con exito", response.data);
        setStatus("success")
        setMessage("La venta se eliminó correctamente")
        setOpen(true);
        setTimeout(() => {
          props.history.push("/report");
        }, 1000);
      })
      .catch((e) => {
        // console.log(JSON.stringify(e.message));
        if (e.message === `Request failed with status code 403`) {
          setStatus("error");
          setMessage("No tiene autorizacion para eliminar, llame a un Administrador")
        } else {
        setMessage(JSON.stringify(e.message));
          setStatus("warning")
        }
        setOpen(true);
      });
    setSendingDelete(false);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        paddingBottom: 200,
      }}
    >
      <Container maxWidth="sm">
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h2" variant="h4" color="inherit" gutterBottom>
            Editar una venta
          </Typography>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="codigo_ean"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  required
                  id="codigo_ean"
                  name="codigo_ean"
                  label="Codigo EAN"
                  type="number"
                  fullWidth
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
              )}
              defaultValue={item.codigo_ean}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              control={control}
              name="denominacion"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  required
                  id="denominacion"
                  name="denominacion"
                  label="Denominacion"
                  type="text"
                  fullWidth
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
              )}
              defaultValue={item.denominacion}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              control={control}
              name="precio"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  required
                  id="precio"
                  name="precio"
                  label="Precio"
                  type="number"
                  fullWidth
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
              )}
              defaultValue={item.precio}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="cantidad_vend"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  required
                  id="cantidad_vend"
                  name="cantidad_vend"
                  type="number"
                  label="Cantidad vendida"
                  fullWidth
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
              )}
              defaultValue={item.cantidad_vend}
              rules={{ required: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              control={control}
              name="fecha"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  type="date"
                  fullWidth
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              defaultValue={item.fecha}
            />
          </Grid>
        </Grid>

        <div className={classes.buttons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              {/* <Link to="/sales" style={{ textDecoration: "none" }}> */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                {sending ? <> Editando <CircularProgress color="secondary" size={22} /> </ > : "Editar"}
              </Button>
              {/* </Link> */}
            </Grid>
            <Grid item>
              {/* <Link to="/report" style={{ textDecoration: "none" }}> */}
              <Button fullWidth variant="contained" color="primary" onClick={deteleItem}>
                {sendingDelete ? <>Eliminando <CircularProgress color="secondary" size={22} /> </ > : "Eliminar"}
              </Button>
              {/* </Link> */}
            </Grid>
            <Grid item>
              <Link to="/report" style={{ textDecoration: "none" }}>
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
          <Alert onClose={handleClose} severity={status}>
            {message}
          </Alert>
        </Snackbar>

      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  mainFeaturedPostContent: {
    position: "relative",
    alignItems: "center",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  buttons: {
    marginTop: theme.spacing(7),
  },
}));
