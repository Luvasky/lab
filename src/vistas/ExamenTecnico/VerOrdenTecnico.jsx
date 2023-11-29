import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import logo from "./LOGO2.png";
// import OrdenExitoso from "./OrdenExitosa";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function GenerarOrden() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    id_paciente,
    id_tecnico,
    id_orden,
    estado,
    examenes,
    paquetes,
    req_paquetes,
    valor_factura,
    tipo_servicio,
    valor_domicilio,
    req_examenes,
    fecha_examen,
    valor_copago,
    valor_paquetes,
    tipo_paciente,
    valor_examenes,
  } = location.state;

  console.log(id_paciente);

  const [exito, setExito] = useState(false);
  const [paquetesSeleccionados, setPaquetesSeleccionados] = useState([]);
  const [listaTecnicos, setListaTecnicos] = useState([]);
  const [listaExamenes, setListaExamenes] = useState([]);
  const [listaNombreExamenes, setListaNombreExamenes] = useState([]);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [hayExamenesSeleccionados, setHayExamenesSeleccionados] =
    useState(false);
  // const [examenesSeleccionados, setExamenesSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [block, setBlock] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    numerDocumento: "",
    direccion: "",
    descDir: "",
    celular: "",
    tipoDocumento: "",
  });

  const datosPaciente = async () => {
    await fetch(
      `https://apilnfg-production.up.railway.app/apiLNFG/obtenerPacienteDocumento/${id_paciente}`
    )
      .then((res) => res.json())
      .then((respuesta) => {
        setDatos({
          nombre: respuesta.respuesta.nombre,
          segundoNombre: respuesta.respuesta.segundo_nombre,
          primerApellido: respuesta.respuesta.primer_apellido,
          segundoApellido: respuesta.respuesta.segundo_apellido,
          numerDocumento: respuesta.respuesta.documento,
          direccion: respuesta.respuesta.direccion,
          descDir: respuesta.respuesta.desc_dir,
          celular: respuesta.respuesta.celular,
          tipoDocumento: respuesta.respuesta.tipo_documento,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    datosPaciente();

    setCargando(true);
    // console.log(datosrden.examenes);
  }, []);

  const ObjetoNombre = [
    {
      label: "Tipo Documento",
      iden: "tipoDocumento",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Numero Documento",
      iden: "numerDocumento",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Nombre",
      iden: "nombre",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Nombre",
      iden: "segundoNombre",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Primer Apellido",
      iden: "primerApellido",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Apellido",
      iden: "segundoApellido",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Direccion",
      iden: "direccion",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Celular",
      iden: "celular",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Descripcion Direccion",
      iden: "descDir",
      block: false,
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
  ];

  const tipoServicios = [
    // {
    //   label: "Presencial",
    //   value: "PRESENCIAL",
    // },
    {
      label: "Domicilio",
      value: "DOMICILIO",
    },
  ];

  return (
    <Box>
      {cargando ? (
        <Box>
          <img src={logo} alt="" />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container lg={8} padding={2}>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  //   onChange={capturarDatosSecundarios}
                  name="tipoServicio"
                  label="Tipo de Servicio"
                  fullWidth
                  value={tipo_servicio}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  //   disabled={
                  //     datosSecundario.tipoServicio === "PRESENCIAL" ? true : false
                  //   }
                  name="valorDomicilio"
                  fullWidth
                  label="Costo Domicilio"
                  value={valor_domicilio}
                  //   onChange={capturarDatosSecundarios}
                ></TextField>
              </Grid>

              {ObjetoNombre.map((opciones) => (
                <Grid
                  xs={opciones.xs}
                  sm={opciones.sm}
                  md={opciones.md}
                  lg={opciones.lg}
                  padding={2}
                  key={opciones.iden}
                >
                  <TextField
                    disabled={opciones.block}
                    // onChange={capturarDatos}
                    fullWidth
                    value={datos[opciones.iden]}
                    label={opciones.label}
                    name={opciones.iden}
                  ></TextField>
                </Grid>
              ))}

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="fechaExamen"
                  fullWidth
                  helperText="Ingrese la fecha del examen"
                  value={new Date(
                    new Date(fecha_examen).setDate(
                      new Date(fecha_examen).getDate() + 1
                    )
                  ).toLocaleDateString("es-ES")}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="examenes"
                  fullWidth
                  multiline
                  rows={4}
                  //   {...params}
                  label="Seleccione Los examenes"
                  placeholder="Examenes"
                  value={examenes}
                />
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  value={req_examenes}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="Requisitos Examenes"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  value={paquetes}
                  name="paquetes"
                  fullWidth
                  multiline
                  rows={4}
                  //   {...params}
                  label="Seleccione Los Paquetes"
                  placeholder="Paquetes"
                />
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={req_paquetes}
                  helperText="Requisitos Paquetes"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  //   disabled={
                  //     datosSecundario.tipoServicio === "PRESENCIAL" ? true : false
                  //   }
                  name="valorDomicilio"
                  fullWidth
                  label="Tipo Pacinete"
                  value={tipo_paciente}
                  //   onChange={capturarDatosSecundarios}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="precioFactura"
                  helperText="Valor Copago"
                  fullWidth
                  value={valor_copago || 0}
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="precioFactura"
                  helperText="Valor Examenes"
                  fullWidth
                  value={valor_examenes || 0}
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="precioFactura"
                  helperText="Valor Paquetes"
                  fullWidth
                  value={valor_paquetes || 0}
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  name="precioFactura"
                  helperText="Precio Factura"
                  fullWidth
                  value={valor_factura || 0}
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <div>Cargando...</div>
      )}

      {/* <OrdenExitoso openProp={exito} link={-1}></OrdenExitoso> */}
    </Box>
  );
}

export default GenerarOrden;
