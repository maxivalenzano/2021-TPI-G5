import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container, InputAdornment, IconButton, CircularProgress, Snackbar } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from '@material-ui/core/styles';
import AuthService from 'services/AuthService'
import MuiAlert from "@material-ui/lab/Alert";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link as LinkRouter } from "react-router-dom"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMsj: {
        color: "#bf1650",
        margin: theme.spacing(0, 0, 0),
    }
}));


const Recovery = () => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('El nombre de usuario es requerido')
            .min(4, 'El nombre de usuario debe tener al menos 6 caracteres')
            .max(20, 'El nombre de usuario no debe exceder los 20 caracteres'),
        email: Yup.string()
            .required('El correo electronico es requerido')
            .email('El correo es invalido'),
        password: Yup.string()
        .required('La contraseña es requerida')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial")
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(40, 'La contraseña no debe exceder los 40 caracteres'),
        confirmPassword: Yup.string()
            .required('Se requiere confirmación de contraseña')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    });

    const { handleSubmit, reset, control, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        setSending(true)
        console.log(data);
        let response
        try {
            response = await AuthService.recovery(data);
            setMessage(response.data.message)
            setStatus("success")
            resetForm()
        } catch (error) {
            const resMessage = ((error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString());
            setMessage(resMessage);
            setStatus("warning")
        }
        setOpenSnackB(true)
        setSending(false)
        console.log(response.data)
    };

    const resetForm = () => {
        reset({
            username: "",
            password: "",
            email: "",
            confirmPassword: ""
        })
    }
    const [sending, setSending] = useState(false)
    const [openSnackB, setOpenSnackB] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("warning")

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackB(false);
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Restablecer Contraseña
                </Typography>
                <form className={classes.form} noValidate>

                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Usuario"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={value}
                                onChange={onChange}
                            />)
                        }
                        defaultValue=""
                    />
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        render={({ message }) => <p className={classes.errorMsj}>{message}</p>}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                                value={value}
                                onChange={onChange}
                            />)
                        }
                        defaultValue=""
                    />
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p className={classes.errorMsj}>{message}</p>}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="new-password"
                                value={value}
                                onChange={onChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />)
                        }
                        defaultValue=""
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className={classes.errorMsj}>{message}</p>}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                type={showPasswordConfirm ? "text" : "password"}
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={value}
                                onChange={onChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordConfirm}
                                                onMouseDown={handleMouseDownPasswordConfirm}
                                            >
                                                {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />)
                        }
                        defaultValue=""
                    />
                    <ErrorMessage
                        errors={errors}
                        name="confirmPassword"
                        render={({ message }) => <p className={classes.errorMsj}>{message}</p>}
                    />

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recordar"
                    /> */}


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit(onSubmit)}
                        disableFocusRipple={true}
                    >
                        {sending ? <CircularProgress color="secondary" size={22} /> : "Cambiar Contraseña"}
                    </Button>



                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" component={LinkRouter} to="/auth">
                                {"Iniciar Sesión"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" component={LinkRouter} to="/auth/register">
                                {"¿No tiene una cuenta? Registrese"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={openSnackB}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={status}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}

export default Recovery;