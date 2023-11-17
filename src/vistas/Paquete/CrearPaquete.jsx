import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Autocomplete,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import logo from "./LOGO2.png";
import Exitoso from "../logueo/Exitoso";

function CrearPaquete() {
  const [cargando, setCargando] = useState(false);
  const [exitoso, setExitoso] = useState(false);

  const [camposVacios, setCamposVacios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [datos, setDatos] = useState({
    id: "",
    nombre: "",
    precio: "",
    examenes: "",
    descripcion: "",
  });

  const [lista, setLista] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const capturarDatosExamen = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const capturarExamenesSeleccionados = async (event, value) => {
    // 'value' contiene los nombres de los exámenes seleccionados
    const examenesConcatenados = value.join(", ");

    // Recorrer la lista de exámenes para encontrar los requisitos correspondientes
    const requisitosConcatenados = lista
      .filter((examen) => value.includes(examen.nombre))
      .map((examen) => examen.requisitos)
      .join(", ");

    // Actualiza el estado 'datos' con la concatenación de los exámenes y requisitos
    setDatos({
      ...datos,
      examenes: examenesConcatenados,
      descripcion: requisitosConcatenados,
    });
    console.log(datos);
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
        "https://apilnfg-production.up.railway.app/apiLNFG/crearPaquete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id_paquete: datos.id,
            nombre: datos.nombre,
            precio: datos.precio,
            descripcion: datos.descripcion,
            examenes: datos.examenes,
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

  const ObtenerExamenes = async () => {
    setCargando(true);
    try {
      const response = await fetch(
        "https://apilnfg-production.up.railway.app/apiLNFG/obtenerListaExamenes"
      );
      const data = await response.json();

      setLista(data.respuesta || []); // Update the lista state
      setCargando(false);
    } catch (error) {
      console.log(error);
      setCargando(false);
    }
    console.log(lista);
  };
  useEffect(() => {
    ObtenerExamenes();
  }, []);

  return (
    <Box>
      {cargando ? (
        <Box>Cargando</Box>
      ) : (
        <>
          <Box>
            <img src={logo} alt="" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container padding={2} lg={8}>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  error={camposVacios}
                  name="id"
                  label="Id"
                  fullWidth
                  onChange={capturarDatosExamen}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
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
                  error={camposVacios}
                  name="nombre"
                  label="Nombre"
                  fullWidth
                  onChange={capturarDatosExamen}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <Autocomplete
                  name="examenes"
                  onChange={capturarExamenesSeleccionados} // Aquí se llama a la función
                  multiple
                  id="tags-outlined"
                  options={lista.map((option) => option.nombre)}
                  getOptionLabel={(option) => option}
                  // defaultValue={lista.length ? [lista[0].nombre] : []}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      multiline
                      rows={8}
                      {...params}
                      label="Examenes"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  value={datos.descripcion}
                  error={camposVacios}
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
              Campos obligatorios vacíos
            </Alert>
          </Snackbar>
          <Exitoso openProp={exitoso} link={"/vistaAdministrador"}></Exitoso>
        </>
      )}
    </Box>
  );
}

export default CrearPaquete;
