import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import EditarExitoso from "./EditarExitos";
import Grid from "@mui/material/Grid";

function EditarExamen() {
  const navigate = useNavigate();
  const [navegar, setNavegar] = useState(false);
  const [block, setBlock] = useState(false);
  const [datosTextField, setDatosTextField] = useState({
    id: "",
    nombre: "",
    precio: "",
    requisitos: "",
  });

  const [cargando, setCargando] = useState(false); // Estado para controlar la pantalla de carga

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id_examen");
  console.log(id);

  const capturarDatosTextField = (e) => {
    setDatosTextField({ ...datosTextField, [e.target.name]: e.target.value });
  };

  const peticion = async () => {
    setBlock(true);
    setCargando(true); // Establecer cargando en true antes de la solicitud fetch
    try {
      await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/actualizarExamen/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: datosTextField.nombre.toUpperCase().trim(),
            precio: datosTextField.precio.toUpperCase().trim(),
            requisitos: datosTextField.requisitos.toUpperCase().trim(),
          }),
        }
      );

      // La solicitud fetch se completó con éxito, puedes realizar acciones adicionales si es necesario.
    } catch (error) {
      // Manejar errores de la solicitud fetch si es necesario.
      console.error("Error en la solicitud:", error);
    } finally {
      // Establecer cargando en false después de que se complete la solicitud (éxito o error).
      setCargando(false);
      setBlock(false);
      setNavegar(true);
    }
  };

  const datosBd = async () => {
    try {
      await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/obtenerExameneId/${id}`
      )
        .then((res) => res.json())
        .then((respuesta) => {
          console.log(respuesta);
          setDatosTextField({
            id: respuesta.id_examen,
            nombre: respuesta.nombre,
            precio: respuesta.precio,
            requisitos: respuesta.requisitos,
          });
        });
    } catch (error) {
      console.log("ERRO EN LA PETICION FETCH");
    }
  };

  useEffect(() => {
    datosBd();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: { xs: "90%", sm: "90%", md: "50%", lg: "30%" },
          marginLeft: { xs: "5%", sm: "5%", md: "10%", lg: "20%" },
          marginTop: { xs: "5%", sm: "0%", md: "0%", lg: "0%" },
          marginBottom: { xs: "0%", sm: "5%" },
        }}
      >
        <img src={logo} alt="" style={{ width: "100%" }} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid container lg={8} padding={2}>
          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled
              label="Id"
              name="id"
              value={datosTextField.id}
              onChange={capturarDatosTextField}
            />
          </Grid>

          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Nombre"
              name="nombre"
              value={datosTextField.nombre}
              onChange={capturarDatosTextField}
            />
          </Grid>

          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Precio"
              name="precio"
              value={datosTextField.precio}
              onChange={capturarDatosTextField}
            />
          </Grid>
          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Requisitos"
              name="requisitos"
              value={datosTextField.requisitos}
              onChange={capturarDatosTextField}
              multiline
              rows={8}
            />
          </Grid>
          <Grid xs={12} lg={12} padding={1}>
            <Button
              fullWidth
              disabled={block}
              variant="contained"
              onClick={peticion} // Llama a la función peticion al hacer clic en "Enviar"
            >
              {block ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Enviar"
              )}
            </Button>
          </Grid>

          <Grid xs={12} lg={12} padding={1}>
            <Button
              disabled={block}
              variant="contained"
              color="error"
              sx={{ width: "100%" }}
              onClick={() => navigate("/vistaAdministrarExamen")}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <EditarExitoso
        openProp={navegar}
        link="/vistaAdministrarExamen"
      ></EditarExitoso>
    </Box>
  );
}

export default EditarExamen;
