import React from "react";
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

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
        marginTop: theme.spacing(1),
    },
}));

export default function Home() {
    const classes = useStyles()

    return(
        <Container maxWidth="md">
            <div className={classes.mainFeaturedPostContent}>
                <Typography component="h1" variant="h3" color="inherit" align="center" gutterBottom>
                    Sistema de registro de ventas
                </Typography>
                <Typography variant="h5" color="inherit" align="center" paragraph>
                    Aquí podran registrar las ventas para el envio de reporte mensual
                </Typography>
            </div>
            <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Link to="/sales" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="primary">
                                Registrar Venta
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/report" style={{ textDecoration: "none" }}>
                            <Button variant="outlined" color="primary">
                                Generar reporte
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/status" style={{ textDecoration: "none" }}>
                            <Button variant="outlined" color="primary">
                                Consultar deuda
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}