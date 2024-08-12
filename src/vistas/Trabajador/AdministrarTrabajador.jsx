import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import logo from "./LOGO2.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function AdministrarTrabajador() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const [datos, setdatos] = useState();
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const columns = [
    { field: "tipo_documento", headerName: "TIPO DOCUMENTO", width: 200 },
    { field: "documento", headerName: "DOCUMENTO", width: 200 },
    { field: "nombre", headerName: "NOMBRE", width: 200 },
    {
      field: "segundo_nombre",
      headerName: "SEGUNDO NOMBRE",

      width: 200,
    },
    {
      field: "primer_apellido",
      headerName: "PRIMER APELLIDO",
      width: 200,
    },
    {
      field: "segundo_apellido",
      headerName: "SEGUNDO APELLIDO",
      width: 200,
    },

    {
      field: "email",
      headerName: "EMAIL",
      width: 200,
    },
    {
      field: "celular",
      headerName: "CELULAR",
      width: 200,
    },
    {
      field: "fecha_nacimiento",
      headerName: "FECHA NACIMIENTO",
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
      },
    },
    {
      field: "sexo",
      headerName: "SEXO",
      width: 200,
    },
    {
      field: "edad",
      headerName: "EDAD",
      width: 200,
    },
    {
      field: "rol",
      headerName: "ROL",
      width: 200,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      width: 200,
    },

    {
      field: "contrasena",
      headerName: "CONTRASEÑA",
      width: 200,
    },

    {
      field: "administrar",
      headerName: "ADMINISTRAR",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            handleAdministrar(params.row.documento);
          }}
        >
          Administrar
        </Button>
      ),
    },
    // {
    //   field: "inhabilitar",
    //   headerName: "INHABILITAR",
    //   width: 200,
    //   renderCell: (params) => (
    //     <Button variant="contained" color="error">
    //       INHABILITAR
    //     </Button>
    //   ),
    // },
    // {
    //   field: "habilitar",
    //   headerName: "HABILITAR",
    //   width: 200,
    //   renderCell: (params) => (
    //     <Button variant="contained" color="success">
    //       INHABILITAR
    //     </Button>
    //   ),
    // },
  ];

  const handleAdministrar = (documento) => {
    console.log("documento:", documento);
    navigate(`/vistaEditarTrabajador?documento=${documento}`);
  };
  const peticion = async () => {
    // setCargando(true);

    const url = "http://localhost:3000/apiLNFG/obtenerTrabajadores";

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setdatos(data);
        console.log(data);
        setCargando(false);
        // Realizar cualquier otra acción necesaria con los datos
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        // Manejar el error de la solicitud
      });
  };

  const inhabilitar = async () => {
    // URL for the PUT request
    const url = "http://localhost:3000/apiLNFG/inhabilitar";

    // Data to be sent in the request body (if needed)
    const data = {
      // Add your data properties here
      // For example:
      key1: "value1",
      key2: "value2",
    };

    // Configure the request
    const options = {
      method: "PUT", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON if you are sending JSON data
        // You can add other headers if needed
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    // Make the PUT request
    fetch(url, options)
      .then((response) => {
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          return response.json(); // Parse the response body as JSON
        } else {
          throw new Error("Request failed"); // Handle errors for non-successful responses
        }
      })
      .then((data) => {
        // Handle the data from the successful response
        console.log("Success:", data);
      })
      .catch((error) => {
        // Handle errors that occurred during the fetch
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    peticion();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {cargando ? (
        <div>
          <p>Cargando datos</p>
        </div>
      ) : (
        <>
          <Box
            sx={{
              // backgroundColor: "red",
              width: { xs: "70%", sm: "40%", md: "40%", lg: "40%" },
            }}
          >
            <img src={logo} style={{ width: "100%" }} />
          </Box>
          <DataGrid
            rows={datos.respuesta[0]}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            getRowId={(row) => row.documento} // Especifica el identificador único
          />
          <Box
            sx={{
              marginTop: "1%",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/vistaAdministrador")}
            >
              Volver
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
