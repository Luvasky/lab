import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate, useLocation } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Exitoso from "../logueo/Exitoso";

function EditarSede() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id_sede");
  console.log(id);

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
    console.log(datos);
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
        await fetch(`http://localhost:3000:3000/apiLNFG/actualizarSede/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nombre: datos.nombre.toUpperCase().trim(),
            telefono: datos.telefono.toUpperCase().trim(),
            direccion: datos.direccion.toUpperCase().trim(),
          }),
        })
          .then((res) => res.json())
          .then((respuesta) => console.log(respuesta))
          .catch((error) => console.log(error));

        setExitoso(true);
        setEnviando(false);
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setEnviando(false);
      }
    }
  };

  const datosBd = async () => {
    await fetch(`http://localhost:3000:3000/apiLNFG/obtenerSede/${id}`)
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta);
        setDatos({
          nombre: respuesta.nombre_sede,
          telefono: respuesta.telefono,
          direccion: respuesta.direccion,
        });

        console.log(datos + " Estos son los datos");
      })
      .catch((error) => console.log("OCURRRIO UN ERROR"));
  };

  useEffect(() => {
    datosBd();
  }, []);

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
              value={datos.nombre}
              error={camposVacios}
              fullWidth
              label="Nombre"
              name="nombre"
              onChange={capturarDatos}
            ></TextField>
          </Grid>
          <Grid xs={6} sm={6} md={6} lg={6} padding={2}>
            <TextField
              value={datos.telefono}
              error={camposVacios}
              fullWidth
              label="Telefono"
              name="telefono"
              onChange={capturarDatos}
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              value={datos.direccion}
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
              onClick={() => navigate("/vistaAdministrarSede")}
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
        <Exitoso openProp={exitoso} link={"/vistaAdministrarSede"}></Exitoso>;
      </Box>
    </>
  );
}

export default EditarSede;
