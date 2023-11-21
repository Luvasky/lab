import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, TextField, Autocomplete, Button } from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Push from "push.js";

function EditarOrden() {
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
  } = location.state;

  const navigate = useNavigate();

  const [cancelado, setCancelado] = useState(false);
  const [nombreTecnico, setNombreTecnico] = useState("");
  const [cargando, setCargando] = useState(false);
  const [datos, setDatos] = useState({
    celular: "",
    tipo_documento: "",
    direccion: "",
    descripcion: "",
    celular: "",
    nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
  });

  const cancelarOrden = async () => {
    setCancelado(true);
    await fetch(
      `https://apilnfg-production.up.railway.app/apiLNFG/cancelarOrden/${id_orden}`,
      {
        method: "PUT", // O el método que estés utilizando
        headers: {
          "Content-Type": "application/json",
          // Agrega cualquier otra cabecera necesaria aquí
        },
        // Puedes incluir un cuerpo de datos si es necesario
        // body: JSON.stringify({ key: 'value' }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        notificacion(id_orden);
        console.log("Respuesta del servidor:", data);
        // Realiza cualquier acción adicional con la respuesta del servidor
        setCancelado(false);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
        // Maneja el error de alguna manera adecuada para tu aplicación
        setCancelado(false);
      });

    setCancelado(false);
  };

  const datosBd = async () => {
    setCargando(true);

    await fetch(
      `https://apilnfg-production.up.railway.app/apiLNFG/obtenerPacienteDocumento/${id_paciente}`,
      {
        method: "GET", // Puedes cambiar a 'POST' u otro método según tu necesidad
        headers: {
          "Content-Type": "application/json",
          // Puedes agregar más encabezados según sea necesario
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data.respuesta);
        // Puedes manejar la respuesta del servidor aquí
        setDatos({
          celular: data.respuesta.celular,
          tipo_documento: data.respuesta.tipo_documento,
          direccion: data.respuesta.direccion,
          descripcion: data.respuesta.desc_dir,
          nombre: data.respuesta.nombre,
          segundo_nombre: data.respuesta.segundo_nombre,
          primer_apellido: data.respuesta.primer_apellido,
          segundo_apellido: data.respuesta.segundo_apellido,
        });
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
        // Puedes manejar los errores aquí
      });

    // PETICIO PARA OBTENER EL TECNICO

    fetch(
      `https://apilnfg-production.up.railway.app/apiLNFG/obtenerTrabajadorDocumento/${id_tecnico}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Puedes agregar más encabezados según sea necesario
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data.respuesta[0]);
        // Puedes manejar la respuesta del servidor aquí
        setNombreTecnico(
          `${data.respuesta[0].nombre} ${data.respuesta[0].segundo_nombre} ${data.respuesta[0].primer_apellido} ${data.respuesta[0].segundo_apellido}`
        );
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
        // Puedes manejar los errores aquí
      });

    setCargando(false);
  };

  console.log(
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
    fecha_examen
  );

  const ObjetoNombre = [
    {
      label: "Tipo Documento",
      iden: datos.tipo_documento,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Numero Documento",
      iden: id_paciente,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Nombre",
      iden: datos.nombre,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Nombre",
      iden: datos.segundo_nombre,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Primer Apellido",
      iden: datos.primer_apellido,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Apellido",
      iden: datos.segundo_apellido,
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Direccion",
      iden: datos.direccion,
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Celular",
      iden: datos.celular,
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Descripcion Direccion",
      iden: datos.descripcion,
      block: false,
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
  ];

  const notificacion = (id) => {
    Push.create("LAB. NANCY FLOREZ GARCIA", {
      body: `ORDEN ${id} CANCELADAD`,
      icon: logo,
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      },
    });
  };

  useEffect(() => {
    datosBd();
  }, []);

  return (
    <>
      {cargando ? (
        <Box>Cargando...</Box>
      ) : (
        <Box>
          <img src={logo} alt="" />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container lg={8} padding={2}>
              <Grid
                disabled={cancelado}
                xs={12}
                padding={2}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => cancelarOrden()}
                  disabled={estado === "CANCELADO" ? true : false}
                >
                  CANCELAR
                </Button>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  label="Numeo de documento"
                  fullWidth
                  value={id_paciente}
                  disabled={estado === "CANCELADO" ? true : false}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  name="tipoServicio"
                  label="Tipo de Servicio"
                  fullWidth
                  value={tipo_servicio}
                ></TextField>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={valor_domicilio}
                  type="number"
                  name="valorDomicilio"
                  fullWidth
                  label="Costo Domicilio"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.nombre}
                  label="Nombre"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.segundo_nombre}
                  label="Segundo nombre"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.primer_apellido}
                  label="Primer apellido"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.segundo_apellido}
                  label="Segundo apellido"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.direccion}
                  label="Direccion"
                ></TextField>
              </Grid>

              <Grid lg={6} md={6} sm={12} xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  fullWidth
                  value={datos.descripcion}
                  label="Descripcion direccion"
                ></TextField>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  name="tecnico"
                  label="Tecnico"
                  fullWidth
                  value={nombreTecnico}
                ></TextField>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={new Date(fecha_examen).toLocaleDateString()}
                  name="fechaExamen"
                  fullWidth
                  helperText="Fecha del examen"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={examenes}
                  name="examenes"
                  fullWidth
                  multiline
                  rows={4}
                  label="Seleccione Los examenes"
                  placeholder="Examenes"
                ></TextField>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={req_examenes}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="Requisitos Examenes"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={paquetes}
                  name="paquetes"
                  fullWidth
                  multiline
                  rows={4}
                  label="Seleccione Los Paquetes"
                  placeholder="Paquetes"
                ></TextField>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={req_paquetes}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="Requisitos Paquetes"
                ></TextField>
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  disabled={estado === "CANCELADO" ? true : false}
                  value={valor_factura}
                  fullWidth
                  helperText="Valor de la factura"
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
                ></TextField>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default EditarOrden;
