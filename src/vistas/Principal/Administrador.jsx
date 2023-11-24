import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Button,
} from "@mui/material";
import logo from "../logueo/LOGO2.png";
import trabajador_clinico from "./trabajador-clinico.jpg";
import paciente from "./paciente.jpg";
import examen from "./examen.jpg";
import orden from "./orden-medica.png";
import AdministrarTrabajador from "./administrarTrabajador.jpg";
import AdministrarPaciente from "./AdministrarPaciente.jpg";
import AdministrarOrden from "./AdministrarOrden.jpg";
import noConforme from "./noConforme.jpg";
import EnviarOrden from "./EnviarOrden.jpg";
import AdministrarExamen from "./AdministrarExamen.jpg";
import Sede from "./Sede.jpg";
import AdminSede from "./AdminSede.jpg";
import Paquete from "./Paquete.jpg";
import AdminExamen from "./AdminExamen.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import cuatro from "./cuatro.jpg";
import dos from "./dos.png";
import tres from "./tres.jpg";
import uno from "./uno.jpg";

const opcionesAdmin = [
  {
    accion: "Crear Trabajador",
    imagen: trabajador_clinico,
    link: "/vistaCrearTrabajador",
  },
  {
    accion: "Crear Paciente",
    imagen: paciente,
    link: "/vistaCrearPaciente",
  },
  {
    accion: "Crear Examen",
    imagen: examen,
    link: "/vistaCrearExamen",
  },
  {
    accion: "Crear Orden",
    imagen: orden,
    link: "/vistaGenerarOrdenBuscar",
  },

  {
    accion: "Administrar Trabajador",
    imagen: AdministrarTrabajador,
    link: "/vistaAdministrarTrabajador",
  },

  {
    accion: "Administrar Paciente",
    imagen: AdministrarPaciente,
    link: "/vistaAdministrarPaciente",
  },
  {
    accion: "Administrar Orden",
    imagen: AdministrarOrden,
    link: "/vistaAdministrarOrden",
  },

  {
    accion: "Administrar Examen",
    imagen: AdministrarExamen,
    link: "/vistaAdministrarExamen",
  },

  {
    accion: "Crear Paquete",
    imagen: Paquete,
    link: "/vistaCrearPaquete",
  },
  {
    accion: "Administrar Paquete",
    imagen: AdminExamen,
    link: "/vistaAdministrarPaquete",
  },
  {
    accion: "Administrar Solicitudes",
    imagen: cuatro,
    link: "/vistaAdministrarSolicitud",
  },
  {
    accion: "Crear Empresa",
    imagen: tres,
    link: "/vistaCrearEmpresa",
  },

  {
    accion: "Solicitudes Wompi",
    imagen: uno,
    link: "/vistaAdministrarSolicitudesWompi",
  },

  {
    accion: "Generar Itinerario",
    imagen: uno,
    link: "/vistaIngresarCampo",
  },
];

function Administrador() {
  const location = useLocation();
  const nombre = new URLSearchParams(location.search).get("nombre");
  // console.log(nombre);

  const navigate = useNavigate();

  // console.log(nombre);

  const cerrarSesion = () => {
    const resultado = window.confirm(
      "¿Estás seguro que quieres cerrar la sesión?"
    );

    if (resultado) {
      // El usuario hizo clic en "Aceptar", ejecuta tu código aquí
      navigate("/");
    } else {
      // El usuario hizo clic en "Cancelar" o cerró la ventana de confirmación
    }
  };

  useEffect(() => {
    // Deshabilitar el botón de retroceso

    // if (nombre === null) {
    //   navigate("/");
    // }

    const disableBackButton = (event) => {
      event.preventDefault();
      window.history.forward(); // Navegar hacia adelante
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("popstate", disableBackButton);
    };
  }, [nombre]);

  return (
    <Box>
      <Box
        sx={{
          // backgroundColor: "blue",
          width: { sm: "100%", xs: "100%", md: "100%", lg: "100%" },
          height: { md: "15%" },
          marginTop: { sm: "5%", md: "2%" },
          marginBottom: { md: "5%" },
          marginLeft: { sm: "0%", md: "0%" },
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "inherit" } }}>
          <img src={logo} />
        </Box>

        <Button
          variant="contained"
          sx={{
            height: { sm: 40, md: 40, lg: 40 },
            width: { xs: "100%", sm: 200 },
          }}
          onClick={() => cerrarSesion()}
          endIcon={<LogoutIcon></LogoutIcon>}
        >
          Cerrar Sesion
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Grid container xs={10} sm={12} md={12} lg={12}>
          {opcionesAdmin.map((opciones) => (
            <Grid xs={10} sm={4} md={3} lg={2} padding={2}>
              <Card
                onClick={() => navigate(opciones.link)}
                key={opciones.accion}
                sx={{ marginLeft: "auto" }}
              >
                <CardActionArea sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={opciones.imagen}
                  />
                  <CardContent sx={{ backgroundColor: "gold" }}>
                    <Typography variant="h7">{opciones.accion}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Administrador;
