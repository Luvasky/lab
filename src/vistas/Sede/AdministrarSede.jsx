import React, { useState, useEffect } from "react";
import { Box, Paper, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import logo from "./LOGO2.png";

function AdministrarSede() {
  const navigate = useNavigate();
  const [cargando, setCragando] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [datos, setDatos] = useState([]);

  const columns = [
    { field: "id_sede", headerName: "ID", width: 200 },
    { field: "nombre_sede", headerName: "NOMBRE", width: 300 },

    { field: "direccion", headerName: "DIRECCION", width: 400 },
    { field: "telefono", headerName: "TELEFONO", width: 400 },

    {
      field: "accion",
      headerName: "ACCIÓN",
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleAdministrar(params.row.id_sede)}
        >
          Administrar
        </Button>
      ),
    },
  ];

  const handleAdministrar = (idSede) => {
    console.log("ID de la sede seleccionada:", idSede);
    navigate(`/vistaEditarSede?id_sede=${idSede}`);
  };

  const datosBd = async () => {
    await fetch("http://localhost:3000/apiLNFG/obtenetListaSede")
      .then((res) => res.json())
      .then((respuesta) => {
        // setDatos({
        //   nombre: respuesta.respuesta.nombre_sede,
        //   direccion: respuesta.respuesta.direccion,
        //   telefono: respuesta.respuesta.telefono,
        //   id: respuesta.respuesta.id_sede,
        // });
        setDatos(respuesta.respuesta);
        console.log(datos);
        console.log(respuesta.respuesta);
      });
  };

  useEffect(() => {
    datosBd();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {cargando ? (
        <CircularProgress></CircularProgress>
      ) : (
        <div style={{ height: 500, width: "100%" }}>
          <Box
            xs={{
              backgroundColor: "red",
              width: { xs: "50%", sm: "50%" },
              height: "10vh",
            }}
          >
            <img src={logo} alt="" style={{ width: "50%" }} />
          </Box>
          <DataGrid
            rows={datos}
            columns={columns}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={(params) => {
              setPage(params.page);
            }}
            rowsPerPageOptions={[10, 25, 100]}
            onPageSizeChange={(params) => {
              setRowsPerPage(params.pageSize);
            }}
            checkboxSelection
            getRowId={(row) => row.id_sede} // Especifica el identificador único
            autoHeight // Make the grid auto height
            disableExtendRowFullWidth // Di
          />
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/vistaAdministrador")}
        >
          Volver
        </Button>
      </Box>
    </Paper>
  );
}

export default AdministrarSede;
