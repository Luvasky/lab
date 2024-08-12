import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Button, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";

export default function AdministrarSolicitudesWompi() {
  const navigate = useNavigate();
  const [datoProp, setDatoProp] = useState();
  const [examenes, setExamenes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cargando, setCargando] = React.useState(false);

  const columns = [
    { field: "idwompi_solicitud", headerName: "REFERNCIA DE PAGO", width: 200 },
    { field: "documento", headerName: "DOCUMENTO", width: 300 },

    {
      field: "fecha_ingreso",
      headerName: "FECHA DE PAGO",
      width: 400,

      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    { field: "examenes", headerName: "EXAMENES", width: 400 },
    { field: "paquetes", headerName: "PAQUETES", width: 400 },
    { field: "estado", headerName: "ESTADO", width: 400 },
    {
      field: "accion",
      headerName: "ACCIÓN",
      width: 300,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            onClick={() => handleAdministrar(params.row.idwompi_solicitud)}
          >
            Administrar
          </Button>
          <Button
            onClick={() =>
              wompiTomada(params.row.estado, params.row.idwompi_solicitud)
            }
            variant="contained"
            color="success"
            sx={{ marginLeft: "20px" }}
          >
            TOMADA
          </Button>
        </Box>
      ),
    },
  ];

  const wompiTomada = async (estado, idSolicitud) => {
    if (estado === "TOMADA") {
      alert("LA SOLICITUD YA FUE TOMADA");
      return;
    }

    await fetch(`http://localhost:3000/apiLNFG/wompiTomada`, {
      method: "POST", // O el método que estés utilizando
      headers: {
        "Content-Type": "application/json",
        // Agrega cualquier otra cabecera necesaria aquí
      },
      // Puedes incluir un cuerpo de datos si es necesario
      body: JSON.stringify({ idOrden: idSolicitud }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // notificacion(id_orden);
        console.log("Respuesta del servidor:", data);
        // Realiza cualquier acción adicional con la respuesta del servidor
        // setCancelado(false);
        window.location.reload(); // Recarga la página después de la navegación
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
        // Maneja el error de alguna manera adecuada para tu aplicación
        // setCancelado(false);
      });
  };

  const peticion = async () => {
    setCargando(true);
    try {
      const resul = await fetch(
        "http://localhost:3000/apiLNFG/obtenerListaSolicitudWompi",
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
    navigate(`/vistaObservarSolicitudWompi?Ref=${idExamen}`);
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
            getRowId={(row) => row.idwompi_solicitud} // Especifica el identificador único
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
