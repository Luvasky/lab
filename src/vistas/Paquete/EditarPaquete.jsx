import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./LOGO2.png";
import Exitoso from "../logueo/Exitoso";

function EditarPaquete() {
  const [exitoso, setExitoso] = useState(false);
  const [esperando, setEsperando] = useState(false);
  const [camposVacios, setCamposVacios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [datos, setDatos] = useState({
    id: "",
    nombre: "",
    precio: "",
    examenes: "",
    descripcion: "",
  });

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id_examen");
  console.log(id);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const capturarDatosExamen = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const peticion = async () => {
    if (
      datos.examenes === " " ||
      datos.id === "" ||
      datos.nombre === "" ||
      datos.descripcion === "" ||
      datos.precio === ""
    ) {
      setCamposVacios(true);
    } else {
      setEnviando(true);
      await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/actualizarPaquete/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nombre: datos.nombre.toUpperCase().trim(),
            precio: datos.precio,
            descripcion: datos.descripcion.toUpperCase().trim(),
            examenes: datos.examenes.toUpperCase().trim(),
          }),
        }
      )
        .then((res) => res.json())
        .then((respuesta) => {
          console.log(respuesta);
          setDatos({
            id: "",
            nombre: "",
            precio: "",
            examenes: "",
            descripcion: "",
          }); // Reiniciar los campos después de enviar con éxito
          setExitoso(true);
        })
        .catch((error) => console.log(error));
      setEnviando(false);
    }
  };

  const datosBd = async () => {
    await fetch(
      `https://apilnfg-production.up.railway.app/apiLNFG/obtenerPaqueteId/${id}`
    )
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta.respuesta[0]);
        setDatos({
          id: respuesta.respuesta[0].id_paquete,
          nombre: respuesta.respuesta[0].nombre,
          precio: respuesta.respuesta[0].precio,
          examenes: respuesta.respuesta[0].examenes,
          descripcion: respuesta.respuesta[0].descripcion,
        });
      });
    console.log(datos);
  };

  useEffect(() => {
    datosBd();
  }, []);

  return (
    <Box>
      <Box>
        <img src={logo} alt="" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container padding={2} lg={8}>
          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              disabled={true}
              value={datos.id}
              error={camposVacios}
              name="id"
              label="Id"
              fullWidth
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
            <TextField
              value={datos.precio}
              error={camposVacios}
              type="number"
              name="precio"
              label="Precio"
              fullWidth
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              value={datos.nombre}
              error={camposVacios}
              name="nombre"
              label="Nombre"
              fullWidth
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              value={datos.examenes}
              error={camposVacios}
              onChange={capturarDatosExamen}
              name="examenes"
              label="Examenes"
              fullWidth
              multiline
              rows={8}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              value={datos.descripcion}
              error={camposVacios}
              onChange={capturarDatosExamen}
              name="descripcion"
              label="Descripcion"
              fullWidth
              multiline
              rows={8}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={peticion}
              disabled={enviando}
            >
              {enviando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Enviar"
              )}
            </Button>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
            <Button
              disabled={enviando}
              variant="contained"
              color="error"
              fullWidth
              onClick={() => navigate("/vistaAdministrador")}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
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
      <Exitoso openProp={exitoso} link={"/vistaAdministrarPaquete"}></Exitoso>;
    </Box>
  );
}

export default EditarPaquete;
