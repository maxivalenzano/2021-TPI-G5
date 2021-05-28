import React from "react";
import { Container, Typography, Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import SaleService from "services/SaleService"

import { useForm, Controller } from "react-hook-form";

export default function Sales() {
    const classes = useStyles()

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        SaleService.create(data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        reset({
            denominacion: "",
            codigo_ean: "",
            cantidad_vend: "",
            precio: "",
            fecha: new Date()
        })


    };


    return (
        <Container maxWidth="sm">
            <div className={classes.mainFeaturedPostContent}>
                <Typography component="h2" variant="h4" color="inherit" v gutterBottom>
                    Agregar venta
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue={new Date()}
                    />
                </Grid>

            </Grid>

            <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        {/* <Link to="/sales" style={{ textDecoration: "none" }}> */}
                        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                            Registrar
                        </Button>
                        {/* </Link> */}
                    </Grid>
                    <Grid item>
                        {/* <Link to="/report" style={{ textDecoration: "none" }}> */}
                        <Button variant="outlined" color="primary" onClick={reset({
                            denominacion: "",
                            codigo_ean: "",
                            cantidad_vend: "",
                            precio: "",
                            fecha: new Date()
                        })}>
                            Limpiar
                            </Button>
                        {/* </Link> */}
                    </Grid>
                    <Grid item>
                        <Link to="/report" style={{ textDecoration: "none" }}>
                            <Button variant="outlined" color="primary">
                                Ver Reporte
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>








        </Container>
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