import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import logo from "../logueo/LOGO2.png";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import PacienteExitoso from "./PacienteExitoso";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function EditarTrabajador() {
  const navigate = useNavigate();
  const location = useLocation();
  const documento = new URLSearchParams(location.search).get("documento");
  const [see, setSee] = useState(false);
  const [activo, setActivo] = useState("ACTIVO");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [cargando, setCargando] = useState(true);
  const [exitoso, setExitoso] = useState(false);
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [coincide, setCoincide] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [blockButton, setBlockButton] = useState(false);
  const [estado, setEstado] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [complete, setComplete] = useState(false);

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
    celular: "",
    fechaNacimiento: "",
    descripcion: "",
    contrasena: "",
    confContrasena: "",
    rol: "",
    estado: "",
  });

  const capturarDatos = (e) => {
    setCapturar({ ...capturar, [e.target.name]: e.target.value });
  };

  const handleSwitchChange = () => {
    setActivo(!activo);
    alert(isActive);
    console.log(estado);
  };

  const habiliatr = async () => {
    setComplete(true);
    if (estado.estado === "INACTIVO") {
      // Supongamos que 'url' es la dirección de tu servidor
      const url = "https://apilnfg-production.up.railway.app/apiLNFG/habilitar";

      // Supongamos que 'data' es el cuerpo de la solicitud, si es necesario
      const data = {
        documento: documento,
      };

      // Configuración de la solicitud
      const options = {
        method: "PUT", // Método de la solicitud
        headers: {
          "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
          // Otras cabeceras si es necesario
        },
        body: JSON.stringify(data), // Convertir el objeto 'data' a formato JSON
      };

      // Hacer la solicitud usando fetch
      await fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // o response.text() si la respuesta no es JSON
        })
        .then((data) => {
          console.log("Respuesta exitosa:", data);
          setComplete(false);
          navigate("/vistaAdministrarTrabajador");
        })
        .catch((error) => {
          console.error("¡Error en la solicitud!", error);
        });
    } else {
      // Supongamos que 'url' es la dirección de tu servidor
      const url =
        "https://apilnfg-production.up.railway.app/apiLNFG/inhabilitar";

      // Supongamos que 'data' es el cuerpo de la solicitud, si es necesario
      const data = {
        documento: documento,
      };

      // Configuración de la solicitud
      const options = {
        method: "PUT", // Método de la solicitud
        headers: {
          "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
          // Otras cabeceras si es necesario
        },
        body: JSON.stringify(data), // Convertir el objeto 'data' a formato JSON
      };

      // Hacer la solicitud usando fetch
      await fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // o response.text() si la respuesta no es JSON
        })
        .then((data) => {
          console.log("Respuesta exitosa:", data);
          setComplete(false);
          navigate("/vistaAdministrarTrabajador");
        })
        .catch((error) => {
          console.error("¡Error en la solicitud!", error);
        });
    }
    setComplete(false);
  };

  const datosBd = async () => {
    try {
      await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/obtenerTrabajadorDocumento/${documento}`
      )
        .then((res) => res.json())
        .then((respuesta) => {
          console.log(respuesta.respuesta[0]);

          setCapturar({
            tipoDocumento: respuesta.respuesta[0].tipo_documento,
            numeroDocumento: respuesta.respuesta[0].documento,
            nombre: respuesta.respuesta[0].nombre,
            segundoNombre: respuesta.respuesta[0].segundo_nombre,
            primerApellido: respuesta.respuesta[0].primer_apellido,
            segundoApellido: respuesta.respuesta[0].segundo_apellido,
            email: respuesta.respuesta[0].email,
            edad: respuesta.respuesta[0].edad,
            sexo: respuesta.respuesta[0].sexo,
            celular: respuesta.respuesta[0].celular,
            fechaNacimiento: new Date(respuesta.respuesta[0].fecha_nacimiento)
              .toISOString()
              .split("T")[0],
            confContrasena: respuesta.respuesta[0].contrasena,
            contrasena: respuesta.respuesta[0].contrasena,
            rol: respuesta.respuesta[0].rol,
          });
          console.log(capturar.fechaNacimiento);
        });
    } catch (error) {
      console.log("ERROR AL HACER L PETICION FECHT", error);
    }
  };

  const capEstado = async () => {
    const apiUrl = `https://apilnfg-production.up.railway.app/apiLNFG/obtenerUsuarioDocumento/${documento}`;

    // Make the fetch request
    await fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setEstado(data);

        // You can do other things with the data if needed
        console.log("Fetched data:", data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    datosBd();
    capEstado();
    // estado.estado === "ACTiVO" ? setIsActive(true) : setActivo(false);
  }, []);

  // setCapturar({
  //   nombre: luva.nombre,
  // });

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
        await fetch(
          `https://apilnfg-production.up.railway.app/apiLNFG/actualizarTrabajador/${documento}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify({
              tipo_documento: capturar.tipoDocumento.toUpperCase().trim(),
              nombre: capturar.nombre.toUpperCase().trim(),
              segundo_nombre: capturar.segundoNombre.toUpperCase().trim(),
              primer_apellido: capturar.primerApellido.toUpperCase().trim(),
              segundo_apellido: capturar.segundoApellido.toUpperCase().trim(),
              edad: capturar.edad,
              email: capturar.email.trim(),
              fecha_nacimiento: capturar.fechaNacimiento.trim(),
              celular: capturar.celular.trim(),
              contrasena: capturar.contrasena.trim(),
              sexo: capturar.sexo.toUpperCase().trim(),
              rol: capturar.rol.toUpperCase().trim(),
              estado: "ACTIVO",
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
      label: "Laboratorio",
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
      {cargando ? (
        <CircularProgress />
      ) : (
        <>
          {/* Container del logo */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "10vh", sm: "18vh", md: "19vh", lg: "19vh" },
            }}
          >
            <img src={logo} style={{ width: "100%" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid container lg={8}>
              <Grid
                xs={12}
                padding={2}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  disabled={complete}
                  variant="contained"
                  color={estado.estado === "ACTIVO" ? "error" : "success"}
                  onClick={() => {
                    habiliatr();
                  }}
                >
                  {estado.estado === "ACTIVO" ? "INHABILITAR" : "HABILITAR"}
                </Button>
              </Grid>

              {/* Container de Tipo de documento y documento */}

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  // disabled={isActive}
                  fullWidth
                  error={camposVacios}
                  value={
                    capturar.tipoDocumento.charAt(0).toUpperCase() +
                    capturar.tipoDocumento.slice(1).toLowerCase()
                  }
                  id="outlined-select-currency"
                  select
                  label="Tipo de documento"
                  helperText="Seleccione su documento"
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

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  fullWidth
                  disabled
                  value={capturar.numeroDocumento}
                  error={camposVacios}
                  label="Numero de documento"
                  type="number"
                  name="numeroDocumento"
                  onChange={capturarDatos}
                ></TextField>
              </Grid>

              {/* container de nombre, segundo nombre,prier apelldio, segunso apellido */}

              {datosInputs.map((inputData) => (
                <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                  <TextField
                    disabled={estado.estado === "ACTIVO" ? false : true}
                    fullWidth
                    value={
                      inputData.identificador === "nombre"
                        ? capturar.nombre
                        : inputData.identificador === "segundoNombre"
                        ? capturar.segundoNombre
                        : inputData.identificador === "primerApellido"
                        ? capturar.primerApellido
                        : capturar.segundoApellido
                    }
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
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={capturar.email}
                  error={camposVacios}
                  label="E-mail"
                  type="email"
                  name="email"
                  onChange={capturarDatos}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={capturar.edad}
                  error={camposVacios}
                  label="Edad"
                  name="edad"
                  type="number"
                  onChange={capturarDatos}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={
                    capturar.sexo.charAt(0).toUpperCase() +
                    capturar.sexo.slice(1).toLowerCase()
                  }
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

              {/* container de tipo, celular y fecha */}

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={
                    capturar.rol.charAt(0).toUpperCase() +
                    capturar.rol.slice(1).toLowerCase()
                  }
                  error={camposVacios}
                  id="outlined-select-currency"
                  select
                  label="Rol del trabajador"
                  onChange={capturarDatos}
                  name="rol"
                >
                  {tipo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={12} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={capturar.celular}
                  error={camposVacios}
                  label="Celular"
                  type="number"
                  name="celular"
                  onChange={capturarDatos}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={12} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  value={capturar.fechaNacimiento}
                  error={camposVacios}
                  sx={{ width: "100%" }}
                  type="date"
                  name="fechaNacimiento"
                  label=""
                  helperText="Fecha Nacimiento"
                  onChange={capturarDatos}
                ></TextField>
              </Grid>

              {/* Container de la sede */}

              {/* container de las contraseñas */}

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  fullWidth
                  value={capturar.contrasena}
                  error={camposVacios}
                  type={see ? "text" : "password"}
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

              <Grid xs={12} sm={12} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado.estado === "ACTIVO" ? false : true}
                  value={capturar.contrasena}
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
                  onClick={() => navigate("/vistaAdministrarTrabajador")}
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

          <PacienteExitoso
            openProp={exitoso}
            link={"/vistaAdministrarTrabajador"}
          ></PacienteExitoso>
        </>
      )}
    </Box>
  );
}

export default EditarTrabajador;
