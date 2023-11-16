import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Exitoso from "../logueo/Exitoso";
function CrearSede() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  const [exitoso, setExitoso] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const capturarDatos = (e) => {
    const { name, value } = e.target;

    setDatos({ ...datos, [name]: value });
  };
  const peticion = async () => {
    setEnviando(true);
    if (
      datos.nombre === "" ||
      datos.telefono === "" ||
      datos.direccion === ""
    ) {
      setCamposVacios(true);
      setEnviando(false);
    } else {
      try {
        const response = await fetch(
          "http://localhost:3000/apiLNFG/crearSede",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre_sede: datos.nombre,
              telefono: datos.telefono,
              direccion: datos.direccion,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const respuesta = await response.json();
        console.log(respuesta);
        setExitoso(true);
        setEnviando(false);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setEnviando(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          // backgroundColor: { xs: "red", sm: "green", md: "pink", lg: "cyan" },
          marginBottom: 2,
        }}
      >
        <img src={logo} alt="" />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Centrar verticalmente
          marginTop: { lg: "5%" },
        }}
      >
        <Grid container lg={8} padding={2}>
          <Grid xs={6} sm={6} md={6} lg={6} padding={2}>
            <TextField
              error={camposVacios}
              fullWidth
              label="Nombre"
              name="nombre"
              onChange={capturarDatos}
            ></TextField>
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} padding={2}>
            <TextField
              error={camposVacios}
              fullWidth
              label="Telefono"
              name="telefono"
              onChange={capturarDatos}
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              error={camposVacios}
              fullWidth
              label="Direccion"
              name="direccion"
              onChange={capturarDatos}
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              disabled={enviando}
              fullWidth
              variant="contained"
              onClick={peticion}
            >
              {enviando ? (
                <CircularProgress size={25} color="inherit"></CircularProgress>
              ) : (
                " Enviar"
              )}
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              disabled={enviando}
              fullWidth
              variant="contained"
              color="error"
              onClick={() => navigate("/vistaAdministrador")}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
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
        <Exitoso openProp={exitoso} link={"/vistaAdministrador"}></Exitoso>;
      </Box>
    </>
  );
}

export default CrearSede;
