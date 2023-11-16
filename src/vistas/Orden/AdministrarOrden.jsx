import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Button, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";

export default function AdministrarOrden() {
  const navigate = useNavigate();
  const [datoProp, setDatoProp] = useState();
  const [examenes, setExamenes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cargando, setCargando] = React.useState(false);

  const columns = [
    { field: "id_orden", headerName: "ID", width: 200 },
    {
      field: "fecha_examen",
      headerName: "FECHA",
      width: 300,

      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },

    { field: "id_paciente", headerName: "DOCUMENTO", width: 400 },
    { field: "examenes", headerName: "EXAMENES", width: 400 },
    { field: "req_examenes", headerName: "REQUISITOS EXAMENES", width: 400 },
    { field: "paquetes", headerName: "PAQUETES", width: 400 },
    { field: "req_paquetes", headerName: "REQUISITOS PAQUETES", width: 400 },
    {
      field: "valor_factura",
      headerName: "VALOR",
      width: 400,

      valueFormatter: (params) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(params.value);
      },
    },
    { field: "tipo_servicio", headerName: "TIPO DE SERVICIO", width: 400 },
    { field: "id_tecnico", headerName: "TECNICO", width: 400 },
    { field: "estado", headerName: "ESTADO", width: 400 },
    {
      field: "valor_domicilio",
      headerName: "VALOR DOMICILIO",
      width: 400,

      valueFormatter: (params) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(params.value);
      },
    },

    {
      field: "accion",
      headerName: "ACCIÓN",
      width: 300,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleAdministrar(params.row)}
        >
          ADMINISTRAR
        </Button>
      ),
    },
  ];

  const peticion = async () => {
    setCargando(true);
    try {
      const resul = await fetch(
        "http://localhost:3000/apiLNFG/obtenerListaOrden",
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

  const handleAdministrar = (row) => {
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
    } = row;
    console.log("ID del examen seleccionado:", id_orden);

    // Assuming `navigate` supports passing state
    navigate(`/vistaEditarOrden?documento=${row}`, {
      state: {
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
      },
    });
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
            getRowId={(row) => row.id_orden} // Especifica el identificador único
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
