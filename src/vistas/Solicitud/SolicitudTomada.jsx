import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Button, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";

export default function SolicitudTomada() {
  const navigate = useNavigate();
  const [datoProp, setDatoProp] = useState();
  const [examenes, setExamenes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cargando, setCargando] = React.useState(false);

  const columns = [
    { field: "id_solicitud", headerName: "ID", width: 200 },
    { field: "empresa", headerName: "EMPRESA", width: 300 },

    { field: "documento", headerName: "DOCUMENTO", width: 400 },
    { field: "nombre", headerName: "NOMBRE", width: 400 },
    { field: "segundo_nombre", headerName: "SEGUNDO NOMBRE", width: 400 },
    { field: "primer_apellido", headerName: "PRIMER APELIDO", width: 400 },
    { field: "segundo_apellido", headerName: "SEGUNDO APELLIDO", width: 400 },
    {
      field: "fecha",
      headerName: "FECHA",
      width: 400,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    { field: "tipo_servicio", headerName: "TIPO DE SERVICIO", width: 400 },
    { field: "estado", headerName: "ESTADO", width: 400 },

    // {
    //   field: "accion",
    //   headerName: "ACCIÓN",
    //   width: 300,
    //   renderCell: (params) => (
    //     <Button
    //       variant="contained"
    //       onClick={() => handleAdministrar(params.row.documento)}
    //     >
    //       Generar Orden
    //     </Button>
    //   ),
    // },
  ];

  const peticion = async () => {
    setCargando(true);
    try {
      const resul = await fetch(
        "http://localhost:3000/apiLNFG/obtenerListaSolicitudTomada",
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((respuesta) => {
          console.log(respuesta.respuesta);
          setExamenes(respuesta.respuesta);
          setCargando(false);
        });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setCargando(false);
    }
  };

  const handleAdministrar = (idExamen) => {
    console.log("ID del examen seleccionado:", idExamen);
    setDatoProp(idExamen);
    navigate(`/vistaGenerarOrden?documento=${idExamen}`);
  };

  useEffect(() => {
    peticion();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        xs={{
          backgroundColor: "red",
          width: { xs: "50%", sm: "50%" },
          height: "10vh",
        }}
      >
        <img src={logo} alt="" style={{ width: "50%" }} />
      </Box>

      {cargando ? (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={examenes}
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
            getRowId={(row) => row.id_solicitud} // Especifica el identificador único
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
        <Button variant="contained" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Box>
    </Paper>
  );
}
