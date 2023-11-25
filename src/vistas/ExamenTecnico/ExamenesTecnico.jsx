import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box, Button, CircularProgress } from "@mui/material";
import logo from "./LOGO2.png";
import { useNavigate } from "react-router-dom";

export default function ExamenesTencnico() {
  const documento = new URLSearchParams(location.search).get("documento");

  const navigate = useNavigate();
  const [datoProp, setDatoProp] = useState();
  const [examenes, setExamenes] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cargando, setCargando] = React.useState(false);
  const [lista, setLista] = useState(false);

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
    { field: "tipo_paciente", headerName: "TIPO PACIENTE", width: 400 },
    {
      field: "valor_factura",
      headerName: "VALOR FACTURA",
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
      field: "valor_examenes",
      headerName: "VALOR EXAMENES",
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
      field: "valor_paquetes",
      headerName: "VALOR PAQUETES",
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
      field: "valor_copago",
      headerName: "VALOR COPAGO",
      width: 400,
      valueFormatter: (params) => {
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(params.value);
      },
    },

    { field: "estado", headerName: "ESTADO", width: 400 },
    {
      field: "accion",
      headerName: "ACCIÓN",
      width: 400,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleAdministrar(params.row)}
          >
            VER ORDEN
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => realizada(params.row.id_orden)}
          >
            TOMADA
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => rechazada(params.row.id_orden)}
          >
            RECHAZADA
          </Button>
        </Box>
      ),
    },
  ];

  const peticion = async () => {
    setCargando(true);
    try {
      const resul = await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/obtenerListaOrdenTecnico/${documento}`,
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
    // console.log("ID del examen seleccionado:", idExamen);
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
      valor_examenes,
      valor_copago,
      tipo_paciente,
    } = row;
    // setDatoProp(idExamen);
    navigate(`/vistaVerOrdenTecnico?documento=${row}`, {
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
        valor_examenes,
        valor_copago,
        tipo_paciente,
      },
    });
  };

  useEffect(() => {
    peticion();
  }, []);

  const realizada = async (id_orden) => {
    setLista(true);
    // setCancelado(true);
    await fetch(`https://apilnfg-production.up.railway.app/apiLNFG/realizada`, {
      method: "PUT", // O el método que estés utilizando
      headers: {
        "Content-Type": "application/json",
        // Agrega cualquier otra cabecera necesaria aquí
      },
      // Puedes incluir un cuerpo de datos si es necesario
      body: JSON.stringify({ idOrden: id_orden }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLista(false);
        console.log(examenes.id_orden);
        // notificacion(id_orden);
        console.log("Respuesta del servidor:", data);
        // Realiza cualquier acción adicional con la respuesta del servidor
        // setCancelado(false);
        window.location.reload(); // Recarga la página después de la navegación
      })
      .catch((error) => {
        console.log(examenes);
        console.error("Error al realizar la petición:", error);
        // Maneja el error de alguna manera adecuada para tu aplicación
        // setCancelado(false);
      });

    // setCancelado(false);
    setLista(false);
  };

  const rechazada = async (id_orden) => {
    setLista(true);
    // setCancelado(true);
    await fetch(`https://apilnfg-production.up.railway.app/apiLNFG/rechazada`, {
      method: "PUT", // O el método que estés utilizando
      headers: {
        "Content-Type": "application/json",
        // Agrega cualquier otra cabecera necesaria aquí
      },
      // Puedes incluir un cuerpo de datos si es necesario
      body: JSON.stringify({ idOrden: id_orden }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLista(false);
        console.log(examenes.id_orden);
        // notificacion(id_orden);
        console.log("Respuesta del servidor:", data);
        // Realiza cualquier acción adicional con la respuesta del servidor
        // setCancelado(false);
        window.location.reload(); // Recarga la página después de la navegación
      })
      .catch((error) => {
        console.log(examenes);
        console.error("Error al realizar la petición:", error);
        // Maneja el error de alguna manera adecuada para tu aplicación
        // setCancelado(false);
      });

    // setCancelado(false);
    setLista(false);
  };

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
        <Button
          variant="contained"
          onClick={() => navigate(`/vistaTecnico?documento=${documento}`)}
        >
          Volver
        </Button>
      </Box>
    </Paper>
  );
}
