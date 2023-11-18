import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import logo from "./LOGO2.png";
import { useState, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [estadoBoton, setEstadoBoton] = useState(false);
  const [estadoDocumento, setEstadoDocumento] = useState(false);
  const [estadoContrasena, setEstadoContrasena] = useState(false);
  const [credencialesIncorrectas, setCredencialesIncorrectas] = useState(false);
  const [see, setSee] = useState(false);

  const [credenciales, setCredenciales] = useState({
    documento: "",
    contrasena: "",
  });

  const [respuestaPeticion, setRespuestaPeticion] = useState({
    documento: "",
    contrasena: "",
    estado: "",
    rol: "",
    id_usuario: "",
  });

  const capturarCredenciales = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    // console.log(credenciales);
  };

  const peticionUsuario = async () => {
    if (credenciales.documento === "") {
      // console.log("Ingrese un ususario");
      setEstadoDocumento(true);
      setEstadoContrasena(false); // Reinicia el estado de la contraseña
      setCredencialesIncorrectas(false);
    } else if (credenciales.contrasena === "") {
      // console.log("Ingrese una ocntrasena");
      setEstadoDocumento(false); // Reinicia el estado del documento
      setEstadoContrasena(true);
      setCredencialesIncorrectas(false);
    } else {
      setEstadoBoton(true);
      setEstadoDocumento(false);
      setEstadoContrasena(false);
      await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/obtenerUsuarioDocumento/${credenciales.documento}`
      )
        .then((respuesta) => respuesta.json())
        .then((res) => {
          setRespuestaPeticion(res);

          console.log(res);
          setEstadoBoton(false);
          if (res.contrasena === credenciales.contrasena) {
            if (res.estado === "ACTIVO") {
              switch (res.rol) {
                case "ADMINISTRADOR":
                  navigate(
                    `/vistaAdministrador?nombre=${credenciales.documento}`
                  );
                  break;
                case "ADMISIONISTA":
                  navigate(
                    `/vistaAdmisionista?documento=${credenciales.documento}`
                  );
                  break;
                case "TECNICO":
                  navigate(`/vistaTecnico?documento=${credenciales.documento}`);
                  break;
                case "USUARIO":
                  navigate(`/vistaUsuario?documento=${credenciales.documento}`);
                  break;
              }
            }
          } else {
            setCredencialesIncorrectas(true);
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    }
  };

  useEffect(() => {
    // Deshabilitar el botón de retroceso
    const disableBackButton = (event) => {
      event.preventDefault();
      window.history.forward(); // Navegar hacia adelante
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", disableBackButton);

    return () => {
      window.removeEventListener("popstate", disableBackButton);
    };
  }, []);

  return (
    <Box
      sx={{
        // backgroundColor: { xs: "red", sm: "blue", md: "yellow", lg: "green" },

        width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
        marginLeft: { xs: "5%", sm: "15%", md: "25%", lg: "30%" },
        height: { xs: "70vh", sm: "110vh", md: "70vh", lg: "70vh" },
        marginBottom: { sm: "5%" },
        marginTop: { xs: "0%", sm: "0%", md: "10%", lg: "5%" },
        // backgroundColor: "cyan",
      }}
    >
      {/* Container logo */}
      <Box
        sx={{
          // backgroundColor: { xs: "red", sm: "blue", md: "yellow", lg: "green" },

          width: { xs: "100%", sm: "100%" },
          marginTop: "5%",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {" "}
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
        </Box>
      </Box>

      {/* Container Documento contraseña */}
      <Box
        sx={{
          width: { xs: "100%", sm: "100%" },
          marginTop: "5%",
          // backgroundColor: "cyan",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%" },
            marginBottom: { xs: "7%", sm: "5%" },
            // backgroundColor: "gray",
          }}
        >
          <TextField
            disabled={estadoBoton}
            onChange={capturarCredenciales}
            name="documento"
            variant="outlined"
            label="Documento"
            type="number"
            sx={{
              width: { xs: "100%", sm: "100%" },
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "100%" },
            marginBottom: { xs: "7%", sm: "5%" },
            // backgroundColor: "gold",
          }}
        >
          <TextField
            disabled={estadoBoton}
            onChange={capturarCredenciales}
            name="contrasena"
            variant="outlined"
            label="Contraseña"
            type={see ? "text" : "password"}
            sx={{
              width: { xs: "100%", sm: "100%" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSee(!see)} edge="end">
                    {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Contenedor de Boton */}
      <Box
        sx={{ marginTop: "5%", width: { sm: "100%" }, backgroundColor: "cyan" }}
      >
        <Button
          disabled={estadoBoton}
          onClick={peticionUsuario}
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "100%" } }}
        >
          {estadoBoton ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Iniciar Sesion"
          )}
        </Button>
      </Box>

      {/* Contenedor de typographys */}
      <Box
        sx={{
          // backgroundColor: "cyan",
          width: { sm: "100%" },
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5%",

          marginBottom: { sm: "10%" },
        }}
      >
        <Box
          sx={{
            width: "50%",
            // backgroundColor: "gray",
          }}
        >
          <Typography
            onClick={() => navigate("/vistaOlvido")}
            variant="body1"
            color="primary"
            sx={{
              display: estadoBoton ? "none" : "flex",
              justifyContent: "start",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Olvidé mi contraseña
          </Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <Typography
            onClick={() => navigate("/vistaCrearCuenta")}
            variant="body1"
            color="primary"
            sx={{
              display: estadoBoton ? "none" : "flex",
              justifyContent: "end",
              cursor: "pointer",
              textDecoration: "underline",
              // backgroundColor: "gold",
            }}
          >
            Crear una cuenta
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={estadoDocumento}
        autoHideDuration={6000}
        onClose={() => setEstadoDocumento(false)}
      >
        <Alert
          onClose={() => setEstadoDocumento(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Digite un usuario
        </Alert>
      </Snackbar>

      <Snackbar
        open={estadoContrasena}
        autoHideDuration={6000}
        onClose={() => setEstadoContrasena(false)}
      >
        <Alert
          onClose={() => setEstadoContrasena(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Digite una contraseña
        </Alert>
      </Snackbar>

      <Snackbar
        open={credencialesIncorrectas}
        autoHideDuration={6000}
        onClose={() => setCredencialesIncorrectas(!credencialesIncorrectas)}
      >
        <Alert
          onClose={() => setCredencialesIncorrectas(!credencialesIncorrectas)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Credenciales Incorrectas
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
