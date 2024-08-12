import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import Grid from "@mui/material/Grid";

function ObservarSolicitudWompi() {
  const navigate = useNavigate();
  const [navegar, setNavegar] = useState(false);
  const [block, setBlock] = useState(false);
  const [datosTextField, setDatosTextField] = useState({
    Ref: "",
    documento: "",
    fecha_pago: "",
    examenes: "",
    paquetes: "",
  });

  const [cargando, setCargando] = useState(false); // Estado para controlar la pantalla de carga

  const location = useLocation();
  const RefPago = new URLSearchParams(location.search).get("Ref");
  //   console.log(id);

  const capturarDatosTextField = (e) => {
    setDatosTextField({ ...datosTextField, [e.target.name]: e.target.value });
  };

  //   const peticion = async () => {
  //     setBlock(true);
  //     setCargando(true); // Establecer cargando en true antes de la solicitud fetch
  //     try {
  //       await fetch(`http://localhost:3000:3000/apiLNFG/actualizarExamen/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           nombre: datosTextField.nombre.toUpperCase().trim(),
  //           precio: datosTextField.precio.toUpperCase().trim(),
  //           requisitos: datosTextField.requisitos.toUpperCase().trim(),
  //         }),
  //       });

  //       // La solicitud fetch se completó con éxito, puedes realizar acciones adicionales si es necesario.
  //     } catch (error) {
  //       // Manejar errores de la solicitud fetch si es necesario.
  //       console.error("Error en la solicitud:", error);
  //     } finally {
  //       // Establecer cargando en false después de que se complete la solicitud (éxito o error).
  //       setCargando(false);
  //       setBlock(false);
  //       setNavegar(true);
  //     }
  //   };

  const datosBd = async () => {
    try {
      await fetch(
        `http://localhost:3000/apiLNFG/listarSlicitudWompiRef/${RefPago}`
      )
        .then((res) => res.json())
        .then((respuesta) => {
          console.log(respuesta);
          setDatosTextField({
            Ref: respuesta.idwompi_solicitud,
            documento: respuesta.documento,
            fecha_pago: respuesta.fecha_ingreso,
            examenes: respuesta.examenes,
            paquetes: respuesta.paquetes,
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
              //   disabled
              label="Referencia de pago"
              name="id"
              value={datosTextField.Ref}
              onChange={capturarDatosTextField}
            />
          </Grid>

          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Documento"
              name="nombre"
              value={datosTextField.documento}
              onChange={capturarDatosTextField}
            />
          </Grid>

          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Fecha de Pago"
              name="precio"
              value={new Date(datosTextField.fecha_pago).toLocaleDateString()} // Muestra solo la fecha              onChange={capturarDatosTextField}
            />
          </Grid>
          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Examenes"
              name="requisitos"
              value={datosTextField.examenes}
              onChange={capturarDatosTextField}
              multiline
              rows={8}
            />
          </Grid>
          <Grid xs={12} lg={12} padding={2}>
            <TextField
              fullWidth
              disabled={block}
              label="Paquetes"
              name="requisitos"
              value={datosTextField.paquetes}
              onChange={capturarDatosTextField}
              multiline
              rows={8}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ObservarSolicitudWompi;
