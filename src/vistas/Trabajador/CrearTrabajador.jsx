import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Exitoso from "./Exitoso";
import logo from "../logueo/LOGO2.png";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function CrearCuenta() {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [exitoso, setExitoso] = useState(false);
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [coincide, setCoincide] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [blockButton, setBlockButton] = useState(false);

  const datosInputs = [
    {
      label: "Nombre",
      identificador: "nombre",
    },
    {
      label: "Segundo Nombre",
      identificador: "segundoNombre",
    },
    {
      label: "Primer Apellido",
      identificador: "primerApellido",
    },
    {
      label: "Segundo Apellido",
      identificador: "segundoApellido",
    },
  ];

  const [capturar, setCapturar] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    edad: "",
    sexo: "",
    rol: "",
    celular: "",
    fechaNacimiento: "",
    contrasena: "",
    confContrasena: "",
    estado: "",
  });

  const capturarDatos = (e) => {
    const { name, value } = e.target;

    setCapturar({ ...capturar, [name]: value });
  };

  const hacerPeticion = async (e) => {
    setBlockButton(true);

    // console.log(capturar);
    if (
      capturar.tipoDocumento === "" ||
      capturar.numeroDocumento == "" ||
      capturar.nombre === "" ||
      capturar.primerApellido == "" ||
      capturar.segundoApellido == "" ||
      capturar.email === "" ||
      capturar.edad === "" ||
      capturar.celular == "" ||
      capturar.sexo === "" ||
      capturar.contrasena === "" ||
      capturar.confContrasena === ""
    ) {
      setCamposVacios(true);
      setBlockButton(false);
    } else {
      if (capturar.confContrasena !== capturar.contrasena) {
        setCoincide(true);
        setBlockButton(false);
      } else {
        if (
          !/[a-z]/.test(capturar.contrasena) ||
          !/[A-Z]/.test(capturar.contrasena) ||
          capturar.contrasena.length < 7
        ) {
          alert(
            "La contraseña debe contener al menos una letra mayúscula y una minúscula, ademas debe tener una ongitud minima de 7 caracteres"
          );
          setBlockButton(false);
          return; // Stop further processing if the password is not secure
        }
        console.log(capturar);

        await fetch(
          "https://apilnfg-production.up.railway.app/apiLNFG/crearTrabajador",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify({
              tipo_documento: capturar.tipoDocumento.toUpperCase().trim(),
              documento: capturar.numeroDocumento.trim(),
              nombre: capturar.nombre.toUpperCase().trim(),
              segundo_nombre: capturar.segundoNombre.toUpperCase().trim(),
              primer_apellido: capturar.primerApellido.toUpperCase().trim(),
              segundo_apellido: capturar.segundoApellido.toUpperCase().trim(),
              edad: capturar.edad.trim(),
              rol: capturar.rol.toUpperCase().trim(),
              email: capturar.email.trim(),
              fecha_nacimiento: capturar.fechaNacimiento.trim(),
              celular: capturar.celular.trim(),
              contrasena: capturar.contrasena.trim(),
              sexo: capturar.sexo.toUpperCase().trim(),
              estado: "ACTIVO".toUpperCase().trim(),
            }),
          }
        ).then((respuesta) => {
          respuesta.json();

          if (respuesta.status == 200) {
            setExitoso(true);
            setBlockButton(false);
          } else {
            setUsuarioExiste(true);
            setBlockButton(false);
          }
        });
      }
    }
  };

  const tipoDireccion = [
    {
      value: "Barrio",
      label: "Barrio",
    },
    {
      value: "Urbanizacion",
      label: "Urbanizacion",
    },
    {
      value: "Edificio",
      label: "Edificio",
    },
  ];

  const sexo = [
    {
      value: "Masculino",
      label: "Masculino",
    },
    {
      value: "Femenino",
      label: "Femenino",
    },

    {
      value: "Otro",
      label: "Otro",
    },
  ];

  const tipo = [
    {
      value: "Administrador",
      label: "Administrador",
    },
    {
      value: "Admisionista",
      label: "Admisionista",
    },
    {
      value: "Tecnico",
      label: "Tecnico",
    },
    {
      value: "Laboratorio",
      label: "Labratorio",
    },
  ];

  const sede = [
    {
      value: 1000,
      label: "Principal",
    },
  ];

  const currencies = [
    {
      value: "Cedula",
      label: "Cedula",
    },
    {
      value: "Tarjeta de indentidad",
      label: "Tarjeta de identidad",
    },
    {
      value: "Pasaporte",
      label: "Pasaporte",
    },
    {
      value: "Permiso especial",
      label: "Permiso especial",
    },

    {
      value: "Otro",
      label: "Otro",
    },
  ];

  const nombreInputs = [
    "Nombre",
    "Segundo Nombre",
    "primero Apellido",
    "Segundo Apellido",
  ];

  return (
    <Box>
      {/* Container del logo */}
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          height: { xs: "10vh", sm: "18vh", md: "19vh", lg: "19vh" },
        }}
      >
        <img src={logo} style={{ width: "100%" }} />
      </Box>

      {/* Container de Tipo de documento y documento */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // backgroundColor: "red",
        }}
      >
        <Grid
          container
          xs={12}
          md={8}
          lg={8}
          marginBottom={3}
          padding={2}
          // sx={{ backgroundColor: "cyan" }}
        >
          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              id="outlined-select-currency"
              select
              label="Tipo de documento"
              helperText="Seleccione su documento"
              defaultValue=""
              onChange={capturarDatos}
              name="tipoDocumento"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              label="Numero de documento"
              type="number"
              name="numeroDocumento"
              onChange={capturarDatos}
            ></TextField>
          </Grid>

          {/* container de nombre, segundo nombre,prier apelldio, segunso apellido */}

          {datosInputs.map((inputData) => (
            <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
              <TextField
                fullWidth
                error={
                  inputData.identificador == "segundoNombre"
                    ? false
                    : camposVacios
                }
                label={inputData.label}
                key={inputData.identificador}
                name={inputData.identificador}
                onChange={capturarDatos}
              />
            </Grid>
          ))}

          {/* container de email, edad y sexo */}
          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              label="E-mail"
              type="email"
              name="email"
              onChange={capturarDatos}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              label="Edad"
              name="edad"
              type="number"
              onChange={capturarDatos}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              id="outlined-select-currency"
              select
              label="Sexo"
              defaultValue=""
              helperText="Seleccione su sexo"
              name="sexo"
              onChange={capturarDatos}
            >
              {sexo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* container de Rol, celular y fecha */}

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              id="outlined-select-currency"
              select
              label="Rol del trabajador"
              onChange={capturarDatos}
              name="rol"
              defaultValue=""
            >
              {tipo.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              label="Celular"
              type="number"
              name="celular"
              onChange={capturarDatos}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              type="date"
              name="fechaNacimiento"
              label=""
              helperText="Fecha Nacimiento"
              onChange={capturarDatos}
              defaultValue=""
            ></TextField>
          </Grid>

          {/* Contenedor Sede Trabajador */}

          {/* container de las contraseñas */}

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              type={see ? "text" : "password"}
              fullWidth
              error={camposVacios}
              label="Contraseña"
              name="contrasena"
              onChange={capturarDatos}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSee(!see)} edge="end">
                      {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              type={see ? "text" : "password"}
              label="Confirmar contraseña"
              name="confContrasena"
              onChange={capturarDatos}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSee(!see)} edge="end">
                      {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          {/* Container de lo botono */}

          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<SendIcon></SendIcon>}
              onClick={hacerPeticion}
              disabled={blockButton}
            >
              {blockButton ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Enviar"
              )}
            </Button>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              endIcon={<CloseIcon></CloseIcon>}
              onClick={() => navigate("/vistaAdministrador")}
              disabled={blockButton}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={usuarioExiste}
        autoHideDuration={6000}
        onClose={() => setUsuarioExiste(false)}
      >
        <Alert
          onClose={() => setUsuarioExiste(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          El Usuario Ya Existe
        </Alert>
      </Snackbar>

      <Snackbar
        open={camposVacios}
        autoHideDuration={6000}
        onClose={() => setCamposVacios(false)}
      >
        <Alert
          onClose={() => setCamposVacios(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Campos obligatorios vacios
        </Alert>
      </Snackbar>
      <Snackbar
        open={coincide}
        autoHideDuration={6000}
        onClose={() => setCoincide(false)}
      >
        <Alert
          onClose={() => setCoincide(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Las contraseñas no coinciden
        </Alert>
      </Snackbar>

      <Exitoso openProp={exitoso} link={"/vistaAdministrador"}></Exitoso>
    </Box>
  );
}

export default CrearCuenta;
