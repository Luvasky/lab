import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  CircularProgress,
  Grid,
} from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import MuiAlert from "@mui/material/Alert";
import Exitoso from "../logueo/Exitoso";

function CrearEmpresa() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [datosExamen, setDatosExamen] = useState({
    emrpresa: "",
  });

  const [camposVacios, setCamposVacios] = useState(false);
  const [exitoso, setExitoso] = useState(false);

  const capturarDatosExamen = (e) => {
    setDatosExamen({ ...datosExamen, [e.target.name]: e.target.value });
  };

  const peticion = async () => {
    setCargando(true);

    if (datosExamen.empresa === "") {
      setCamposVacios(true);
    } else {
      try {
        await fetch("http://localhost:3000/apiLNFG/crearEmpresa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: datosExamen.empresa.toUpperCase().trim(),
          }),
        }).then((res) =>
          res.json().then((respuesta) => console.log(respuesta))
        );
        setCargando(false);
        setExitoso(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      {/* Contenedor del logo */}
      <Box
        sx={{
          // backgroundColor: "gray",
          width: { xs: "100%", sm: "70%", md: "40%" },
          height: { md: "15vh" },
          marginTop: { md: "5%" },
          marginLeft: { sm: "15%", md: "5%" },
          marginBottom: { md: "5%" },
          paddingLeft: { md: "5%" },
        }}
      >
        <img src={logo} style={{ width: "100%" }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid container xs={12} md={8} lg={6}>
          {/* Contenedor de TextFileds */}

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              name="empresa"
              label="Nombre Empresa"
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>

          {/* Contenedpr de botones */}

          <Grid xs={12} padding={1}>
            <Button
              // onClick={() => console.log(datosExamen)}
              fullWidth
              disabled={cargando}
              onClick={peticion}
              variant="contained"
              color="primary"
            >
              {cargando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Enviar"
              )}
            </Button>
          </Grid>

          <Grid xs={12} padding={1}>
            <Button
              disabled={cargando}
              variant="contained"
              color="error"
              fullWidth
              onClick={() => navigate(-1)}
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
      <Exitoso openProp={exitoso} link={"/vistaAdministrador"}></Exitoso>;
    </Box>
  );
}

export default CrearEmpresa;
