import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function IngresarCampos() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listaTecnicos, setListaTecnicos] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para la carga
  const [datosBusqueda, setDatosBusqueda] = useState({
    documento: "",
    fecha: "",
  });

  const datosTecnico = async () => {
    setLoading(true); // Iniciar carga
    await fetch(
      "https://apilnfg-production.up.railway.app/apiLNFG/obtenerTecnico"
    )
      .then((res) => res.json())
      .then((respuesta) => {
        const tecnicos = respuesta.respuesta.map((tecnico) => ({
          value: tecnico.documento,
          label: `${tecnico.nombre} ${tecnico.segundo_nombre} ${tecnico.primer_apellido} ${tecnico.segundo_apellido} `,
        }));
        setListaTecnicos(tecnicos);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); // Detener carga
  };

  const handleTecnicoChange = (event) => {
    setDatosBusqueda({
      ...datosBusqueda,
      documento: event.target.value,
    });
  };

  const handleFechaChange = (event) => {
    setDatosBusqueda({
      ...datosBusqueda,
      fecha: event.target.value,
    });
  };

  const handleBuscarClick = () => {
    navigate("/vistaImprimir", { state: datosBusqueda });
  };

  useEffect(() => {
    datosTecnico();
  }, []);

  return (
    <Box>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            INGRESE LOS DATOS
          </Typography>
          {loading ? ( // Vista de carga condicional
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid padding={2} xs={12}>
                <TextField
                  name="tecnico"
                  label="Tecnico"
                  fullWidth
                  select
                  onChange={handleTecnicoChange}
                >
                  {listaTecnicos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid padding={2} xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  helperText="Fecha a buscar"
                  onChange={handleFechaChange}
                ></TextField>
              </Grid>

              <Grid padding={2} xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleBuscarClick}
                >
                  Buscar
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default IngresarCampos;
