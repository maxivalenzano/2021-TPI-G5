import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Button, TextField, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import SaleService from "services/SaleService"
import moment from 'moment'
import MuiAlert from "@material-ui/lab/Alert";

import { useForm, Controller } from "react-hook-form";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Item(props) {
    const classes = useStyles()

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        setOpenDelete(false);
    }

    const [item, setItem] = useState({
        id: "",
        denominacion: "",
        codigo_ean: "",
        cantidad_vend: "",
        precio: "",
        fecha: moment().format('yyyy-MM-DD')
    });


    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        const consultaAPI = async () => {
            const result = await SaleService.get(props.match.params.id)
            console.log("Obtenido de la API", result.data)
            setItem(result.data);
        };

        consultaAPI();
    }, [props.match.params.id]);

    useEffect(() => {
        resetForm();
    }, [item])

    const onSubmit = async (data) => {
        console.log("Item a modificar:", data);

        await SaleService.update(item._id, data)
            .then(response => {
                console.log("Item updateado", response.data);
                // setItem(response.data); //hasta que esté deployado en Heroku la actualizacion
                setOpen(true);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const resetForm = () => {
        reset({
            denominacion: item.denominacion,
            codigo_ean: item.codigo_ean,
            cantidad_vend: item.cantidad_vend,
            precio: item.precio,
            fecha: moment(item.fecha).format('yyyy-MM-DD')
        })
    };

    const deteleItem = async () => {
        await SaleService.remove(item._id)
            .then(response => {
                console.log("Eliminado con exito", response.data)
                setOpenDelete(true);
                props.history.push("/report")
            })
            .catch(e => {
                console.log("El error fue: ", e)
            })
    }


    return (
        <div style={{
            backgroundColor: "white",
            paddingBottom: 200
        }}>
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
                            />)
                        }
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
                            />)
                        }
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
                            />)
                        }
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
                            />)
                        }
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
                            />)
                        }
                        defaultValue={item.fecha}
                    />
                </Grid>

            </Grid>

            <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        {/* <Link to="/sales" style={{ textDecoration: "none" }}> */}
                        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                            Editar
                        </Button>
                        {/* </Link> */}
                    </Grid>
                    <Grid item>
                        {/* <Link to="/report" style={{ textDecoration: "none" }}> */}
                        <Button variant="contained" color="primary" onClick={deteleItem}>
                            Eliminar
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


            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    La venta se modificó correctamente
          </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openDelete} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    La venta se eliminó correctamente!
          </Alert>
            </Snackbar>


        </Container>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    mainFeaturedPostContent: {
        position: 'relative',
        alignItems: 'center',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    buttons: {
        marginTop: theme.spacing(7),
    },
}));