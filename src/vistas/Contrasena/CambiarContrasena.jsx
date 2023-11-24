import React, { useState } from "react";
import { Box, Grid, Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./LOGO2.png";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function CambiarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  const [see, setSee] = useState(false);
  const [enviar, setEnviar] = useState(false);

  const documento = new URLSearchParams(location.search).get("documento");
  console.log(documento);

  const [datos, setDatos] = useState({
    contrasena: "",
    nuevaContrasena: "",
  });

  const capDatos = (event) => {
    const { name, value } = event.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
    console.log(datos);
  };

  const cambiarContrasena = () => {
    setEnviar(true);

    if (datos.contrasena === "" || datos.nuevaContrasena === "") {
      alert("Todos los campos son obligatorios");
      setEnviar(false); // Agrega esta línea para deshabilitar el envío si hay campos vacíos
    } else if (datos.contrasena !== datos.nuevaContrasena) {
      alert("Las contraseñas no coinciden");
      setEnviar(false); // Agrega esta línea para deshabilitar el envío si las contraseñas no coinciden
    } else {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contrasena: datos.contrasena,
        }),
      };

      fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/cambiarPass/${documento}`,
        options
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          alert("Contraseña actualizada con éxito");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        })
        .finally(() => {
          setEnviar(false); // Asegúrate de restablecer 'enviar' incluso si hay un error
        });
    }
  };

  return (
    <Box>
      <Box>
        <img src={logo} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          // height: "100vh",
          alignItems: "center",
        }}
      >
        {" "}
        <Grid container xs={12} sm={12} md={6} lg={6} padding={2}>
          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              disabled={enviar}
              type={see ? "text" : "password"}
              fullWidth
              label="Ingrese Nueva Contraseña"
              name="contrasena"
              onChange={capDatos}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSee(!see)} edge="end">
                      {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <TextField
              disabled={enviar}
              type={see ? "text" : "password"}
              fullWidth
              onChange={capDatos}
              label="Confirme Nueva Contraseña"
              name="nuevaContrasena"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSee(!see)} edge="end">
                      {see ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>

          <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
            <Button
              fullWidth
              variant="contained"
              disabled={enviar}
              onClick={() => cambiarContrasena()}
            >
              {" "}
              ENViar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CambiarContrasena;
