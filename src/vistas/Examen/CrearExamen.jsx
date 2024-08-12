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

function CrearExamen() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [datosExamen, setDatosExamen] = useState({
    idExamen: "",
    nombre: "",
    precio: "",
    requisitos: "",
  });

  const [camposVacios, setCamposVacios] = useState(false);
  const [exitoso, setExitoso] = useState(false);

  const capturarDatosExamen = (e) => {
    const inputValue = e.target.value;
    const fieldName = e.target.name;

    // Expresión regular para permitir solo números
    const regex = /^[0-9]*$/;

    if (fieldName === "precio" && !regex.test(inputValue)) {
      // Si el campo es "precio" y el valor no es un número, mostrar alerta y borrar el valor
      alert("Ingresa solo números en el campo Precio");
      setDatosExamen({ ...datosExamen, [fieldName]: "" });
    } else {
      // Actualizar el estado con el nuevo valor
      setDatosExamen({ ...datosExamen, [fieldName]: inputValue });
    }
  };

  // ...

  <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
    <TextField
      fullWidth
      error={camposVacios}
      name="precio"
      onChange={capturarDatosExamen}
      label="Precio"
      type="number"
      value={datosExamen.precio}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  </Grid>;

  const peticion = async () => {
    setCargando(true);

    if (datosExamen.precio === "" || /[^\d.]/.test(datosExamen.precio)) {
      alert(
        "EL PRECIO DEBE SER UN NÚMERO ENTERO Y NO DEBE CONTENER CARACTERES ESPECIALES COMO COMAS"
      );
      setCargando(false);
      return;
    }

    if (
      datosExamen.idExamen === "" ||
      datosExamen.nombre === "" ||
      datosExamen.precio === "" ||
      datosExamen.requisitos === ""
    ) {
      setCamposVacios(true);
    } else if (
      isNaN(Number(datosExamen.precio)) ||
      !Number.isInteger(Number(datosExamen.precio))
    ) {
      alert(
        "EL CAMPO PRECIO DEBE SER UN NÚMERO ENTERO SIN PUNTOS Y SIN LETRAS"
      );
    } else {
      try {
        const response = await fetch(
          "http://localhost:3000/apiLNFG/crearExamen",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_examen: datosExamen.idExamen.toUpperCase().trim(),
              nombre: datosExamen.nombre.toUpperCase().trim(),
              precio: datosExamen.precio.toUpperCase().trim(),
              requisitos: datosExamen.requisitos.toUpperCase().trim(),
            }),
          }
        );

        const respuesta = await response.json();

        if (response.status === 200) {
          console.log(respuesta);
          setCargando(false);
          setExitoso(true);
        } else {
          console.log(respuesta);
          alert("EL EXAMEN YA EXISTE");
        }
      } catch (error) {
        console.log(error);
        setCargando(false);
      }
    }

    setCargando(false);
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
              name="idExamen"
              label="Id"
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              name="nombre"
              label="Nombre"
              onChange={capturarDatosExamen}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              name="precio"
              onChange={capturarDatosExamen}
              label="Precio"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),

                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              fullWidth
              error={camposVacios}
              name="requisitos"
              onChange={capturarDatosExamen}
              id="outlined-multiline-static"
              label="Requisitos"
              multiline
              rows={7}
            />
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

export default CrearExamen;
