import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Button,
  Toolbar,
  Card,
  CardActionArea,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
import LOGO from "./LOGO2.png";

import "../estlo.css";
import { useNavigate, useLocation } from "react-router-dom";

function SeleccionaTipoCompra() {
  const navigate = useNavigate();
  const location = useLocation();

  const documento = new URLSearchParams(location.search).get("documento");
  console.log(documento);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          padding: 1,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <img src={LOGO}></img>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "rgb(   255, 89, 0  )",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <Card
            sx={{
              width: "90%",
              height: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <CardActionArea
              onClick={() =>
                navigate(`/vistaSeleccionaExamen?documento=${documento}`)
              }
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  // backgroundColor: "blue",
                  width: { xs: "100%" },
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    color: "rgb( 255, 89, 0 )",
                    height: "20%",
                  }}
                >
                  <Typography variant="h5">QUIERO COMPRAR EXAMENES!</Typography>
                </Box>
                <Box
                  sx={{
                    // backgroundColor: "pink",
                    height: "70%",
                    paddingTop: 5,
                    paddingLeft: { xs: "28%", sm: 3, lg: 5 },
                    color: "rgb( 83, 82, 81 )",
                    textAlign: { sm: "center" },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ display: { xs: "flex", sm: "none" } }}
                  >
                    !Click Aqui!
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Ahora puedes programar tu cita con nosotros con anticipación
                    y evitar largos tiempos de espera. Si tienes una orden
                    médica, !haz clic aquí!
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "rgb(   255, 89, 0  )",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 400,
          }}
        >
          <Card
            sx={{
              width: "90%",
              height: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
            }}
          >
            <CardActionArea
              onClick={() =>
                navigate(`/vistaSeleccionaPaquete?documento=${documento}`)
              }
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  // backgroundColor: "blue",
                  width: { xs: "100%" },
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    paddingTop: 2,
                    textAlign: "center",
                    color: "rgb( 255, 89, 0 )",
                    height: "20%",
                  }}
                >
                  <Typography variant="h5">QUIERO COMPRAR PAQUETES!</Typography>
                </Box>
                <Box
                  sx={{
                    // backgroundColor: "pink",
                    height: "70%",
                    paddingTop: 5,
                    paddingLeft: { xs: "28%", sm: 3, lg: 5 },
                    color: "rgb( 83, 82, 81 )",
                    textAlign: { sm: "center" },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ display: { xs: "flex", sm: "none" } }}
                  >
                    !Click Aqui!
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Ahora puedes programar tu cita con nosotros con anticipación
                    y evitar largos tiempos de espera. Si tienes una orden
                    médica, !haz clic aquí!
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SeleccionaTipoCompra;
