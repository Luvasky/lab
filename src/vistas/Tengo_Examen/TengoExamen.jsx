import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Autocomplete,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import LOGO from "./LOGO2.png";
import { useNavigate, useLocation } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Exitoso from "./Exitoso";
import Push from "push.js";

function TengoExamen() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [exitoso, setExitoso] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [obligatorios, setObligatorios] = useState(false);
  const [empresa, setEmpresa] = useState([]);
  const nombreEpresas = [];
  const navigate = useNavigate();
  const location = useLocation();
  const [cargando, setCargando] = useState(false);
  const [datosPaciente, setDatosPaciente] = useState({
    documento: "",
    nombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
  });

  const [datosSecundarios, setDatosSecundarios] = useState({
    empresa: "",
    tipoServicio: "",
    fecha: "",
  });

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setDatosSecundarios((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
    console.log(datosSecundarios);
  };

  const handleTipoServicioChange = (event, newValue) => {
    setDatosSecundarios((prevDatos) => ({
      ...prevDatos,
      tipoServicio: newValue ? newValue.value : "", // Captura el valor seleccionado
    }));
  };

  const handleEmpresaoChange = (event, newValue) => {
    setDatosSecundarios((prevDatos) => ({
      ...prevDatos,
      empresa: newValue ? newValue.nombre : "", // Captura el nombre de la empresa seleccionada
    }));
  };

  const servicio = [
    {
      label: "DOMICILIO",
      value: "DOMICILIO",
    },

    {
      label: "PRESENCIAL",
      value: "PRESENCIAL",
    },
  ];

  const documento = new URLSearchParams(location.search).get("documento");
  console.log(documento);

  const EnviarSolicitud = async () => {
    if (
      (datosSecundarios.fecha === "") |
        (datosSecundarios.tipoServicio === "") ||
      datosSecundarios.empresa === ""
    ) {
      setObligatorios(true);
    } else {
      setEnviando(true);
      await fetch("http://localhost:3000/apiLNFG/crearSolicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify({
          documento: datosPaciente.documento,
          nombre: datosPaciente.nombre,
          segundo_nombre: datosPaciente.segundoNombre,
          primer_apellido: datosPaciente.primerApellido,
          segundo_apellido: datosPaciente.segundoApellido,
          fecha: datosSecundarios.fecha,
          tipo_servicio: datosSecundarios.tipoServicio,
          empresa: datosSecundarios.empresa,
        }),
      })
        .then((res) => res.json())
        .then((respuesta) => {
          notificacion();
          console.log(respuesta);
          setExitoso(true);
        });
    }
    setEnviando(false);
  };

  useEffect(() => {
    setCargando(true);
    fetch(`http://localhost:3000/apiLNFG/obtenerPacienteDocumento/${documento}`)
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta);

        setDatosPaciente({
          documento: respuesta.respuesta.documento,
          nombre: respuesta.respuesta.nombre,
          segundoNombre: respuesta.respuesta.segundo_nombre,
          primerApellido: respuesta.respuesta.primer_apellido,
          segundoApellido: respuesta.respuesta.segundo_apellido,
        });

        // setCargando(false);
      });

    fetch(`http://localhost:3000/apiLNFG/obtenerListaEmpresas`)
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta);

        setEmpresa(respuesta.respuesta);

        console.log(empresa);
        setCargando(false);
      });
  }, []);

  const notificacion = () => {
    Push.create("LAB. NANCY FLOREZ GARCIA", {
      body: "NUEVA SOLICITUD ",
      icon: "/path/to/icon.png",
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      },
    });
  };

  return (
    <Box>
      {cargando ? (
        <Box>CARGANDO ...</Box>
      ) : (
        <Box>
          <Box margin={2} sx={{ width: { xs: "90%", sm: "40%" } }}>
            <img src={LOGO} style={{ width: "100%" }}></img>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              //   backgroundColor: "red",
            }}
          >
            <Grid container xs={10}>
              <Grid xs={12} sm={6} padding={2}>
                <Autocomplete
                  name="empresa"
                  onChange={handleEmpresaoChange}
                  id="size-small-outlined"
                  options={empresa}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField
                      error={obligatorios}
                      {...params}
                      label="Empresa asociada"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  fullWidth
                  label="Documento"
                  value={datosPaciente.documento}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  fullWidth
                  label="Nombre"
                  value={datosPaciente.nombre}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  fullWidth
                  label="Segundo Nombre"
                  value={datosPaciente.segundoNombre}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  fullWidth
                  label="Primer Apellido"
                  value={datosPaciente.primerApellido}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  fullWidth
                  label="Segundo Apellido"
                  value={datosPaciente.segundoApellido}
                  disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <TextField
                  error={obligatorios}
                  name="fecha"
                  onChange={capturarDatos}
                  fullWidth
                  helperText="Fecha Examenes"
                  type="date"
                  // disabled={true}
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} padding={2}>
                <Autocomplete
                  onChange={handleTipoServicioChange}
                  name="tipoServicio"
                  id="size-small-outlined"
                  options={servicio}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      error={obligatorios}
                      {...params}
                      label="Tipo Servicio"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} padding={1}>
                <Button
                  disabled={enviando}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => EnviarSolicitud()}
                >
                  {enviando ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </Grid>
              <Grid xs={12} padding={1} marginBottom={10}>
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() =>
                    navigate(`/vistaUsuario?documento=${documento}`)
                  }
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      <Snackbar
        open={obligatorios}
        autoHideDuration={6000}
        onClose={() => setObligatorios(false)}
      >
        <Alert
          onClose={() => setObligatorios(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Todos los campos son obligatorios
        </Alert>
      </Snackbar>

      <Exitoso
        openProp={exitoso}
        link={`/vistaUsuario?documento=${documento}`}
        documento={documento}
      ></Exitoso>
    </Box>
  );
}

export default TengoExamen;
