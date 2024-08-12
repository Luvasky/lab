import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Box,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import logo from "./LOGO2.png";
import OrdenExitoso from "./OrdenExitosa";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Push from "push.js";
import SolicitudTomada from "../Solicitud/SolicitudTomada";

function GenerarOrden() {
  const navigate = useNavigate();
  const location = useLocation();

  const documento = new URLSearchParams(location.search).get("documento");
  const idSolicitud = new URLSearchParams(location.search).get("solicitud");

  const [bloqCopago, setBloqCopago] = useState(false);
  const [exito, setExito] = useState(false);
  const [paquetesSeleccionados, setPaquetesSeleccionados] = useState([]);
  const [listaTecnicos, setListaTecnicos] = useState([]);
  const [listaExamenes, setListaExamenes] = useState([]);
  const [listaNombreExamenes, setListaNombreExamenes] = useState([]);
  const [listaPaquetes, setListaPaquetes] = useState([]);
  const [hayExamenesSeleccionados, setHayExamenesSeleccionados] =
    useState(false);
  // const [examenesSeleccionados, setExamenesSeleccionados] = useState([]);
  let paquete = [];
  let tecnicos;
  let examenes = [];
  const [cargando, setCargando] = useState(false);
  const [block, setBlock] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    documento: "",
    numerDocumento: "",
    direccion: "",
    descDir: "",
    celular: "",
    tipoDocumento: "",
    fechaExamen: "",
  });

  const [datosSecundario, setDatosSecundario] = useState({
    valorDomicilio: "",
    tipoServicio: "",
    tipoPaciente: "",
    copago: "",
    tecnico: "",
  });
  const [complete, setComplete] = useState(false);

  const [datosrden, setDatosrden] = useState({
    examenes: [],
    paquetes: [],
    amdisionista: documento,
    requisitosExamenes: "",
    valorExamenes: 0,
    valorPaquete: 0,
    valorFactura: 0,
  });

  const estadoTomada = async () => {
    // setCancelado(true);
    await fetch(`http://localhost:3000/apiLNFG/asignarTomada`, {
      method: "PUT", // O el método que estés utilizando
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
        notificacion(id_orden);
        console.log("Respuesta del servidor:", data);
        // Realiza cualquier acción adicional con la respuesta del servidor
        setCancelado(false);
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error al realizar la petición:", error);
        // Maneja el error de alguna manera adecuada para tu aplicación
        // setCancelado(false);
      });

    // setCancelado(false);
  };

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const capturarDatosSecundarios = (e) => {
    const { name, value } = e.target;
    setDatosSecundario((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const capturarPaquetesSeleccionados = async (event, values) => {
    // Obtén los nombres de los paquetes seleccionados
    const nombresPaquetes = values.map((paquete) => paquete.label);

    // Actualiza el estado de paquetesSeleccionados con los nombres de los paquetes
    const listaNombres = nombresPaquetes.join("-");
    setPaquetesSeleccionados(nombresPaquetes);

    // Obtén las descripciones de los paquetes seleccionados
    const descripcionesPaquetes = listaPaquetes
      .filter((paquete) => nombresPaquetes.includes(paquete.label))
      .map((paquete) => paquete.descripcion);

    // Concatena las descripciones en un solo mensaje
    const descripcionPaquete = descripcionesPaquetes.join("-");

    // Actualiza el estado datosrden.descripcionPaquete con el mensaje concatenado
    setDatosrden((prevDatos) => ({
      ...prevDatos,
      descripcionPaquete,
      paquetes: listaNombres,
    }));

    // Luego de actualizar el estado, puedes hacer el llamado a la API para sumar el precio de los paquetes seleccionados si es necesario.
    const requestBody = {
      paqueteReq: nombresPaquetes, // Corrige el nombre de la variable aquí
    };

    await fetch("http://localhost:3000/apiLNFG/sumarPrecioPaquetes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Enviando el objeto JSON
    })
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta.respuesta[0].suma_precios);
        setDatosrden((prevDatos) => ({
          ...prevDatos,
          valorPaquete: respuesta.respuesta[0].suma_precios,
        }));
        console.log(datosrden.valorPaquete);
      })
      .catch((error) => {
        console.log(error);

        setDatosrden((prevDatos) => ({
          ...prevDatos,
          valorPaquete: 0,
        }));
      });
  };

  const capturarExamenesSeleccionados = async (event, values) => {
    const nombresExamenes = values.map((examen) => examen.nombre);

    // En lugar de concatenar los nombres de los exámenes, envía el array directamente
    const examenesSeleccionados = nombresExamenes;
    const listaNombre = nombresExamenes.join("-");

    // Crear un objeto JSON con el campo 'paqueteReq' que contiene el array
    const requestBody = {
      examnesReq: examenesSeleccionados,
    };

    await fetch("http://localhost:3000/apiLNFG/sumarPrecioExamenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Enviando el objeto JSON
    })
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta.respuesta[0]);
        if (respuesta.status === 500) {
          // Si no se han seleccionado exámenes, establece el valor en 0
          setHayExamenesSeleccionados(false); // No hay exámenes seleccionados
          setDatosrden((prevDatos) => ({
            ...prevDatos,
            valorExamenes: 0,
          }));
        } else {
          // Si hay exámenes seleccionados, actualiza el estado
          setHayExamenesSeleccionados(true); // Hay exámenes seleccionados
          setDatosrden((prevDatos) => ({
            ...prevDatos,
            valorExamenes: respuesta.respuesta[0].suma_precios,
          }));

          // Concatenar requisitos de los exámenes seleccionados en un solo mensaje
          let requisitosConcatenados = "";
          examenesSeleccionados.forEach((examenNombre) => {
            const examen = listaExamenes.find(
              (examen) => examen.nombre === examenNombre
            );
            if (examen) {
              requisitosConcatenados += `${examenNombre}: ${examen.requisitos}, `;
            }
          });

          requisitosConcatenados = requisitosConcatenados.slice(0, -2); // Eliminar la última coma y espacio
          setDatosrden((prevDatos) => ({
            ...prevDatos,
            requisitosExamenes: requisitosConcatenados,
            examenes: listaNombre,
          }));
        }
      })
      .catch((error) => {
        console.log(error);

        setDatosrden((prevDatos) => ({
          ...prevDatos,
          valorExamenes: 0,
          requisitosExamenes: "",
        }));
      });
  };

  const tipopacientes = [
    {
      value: "INDEPENDIENTE",
      label: "INDEPENDIENTE",
    },
    {
      value: "PREPAGADA",
      label: "PREPAGADA",
    },
    {
      value: "EPS",
      label: "EPS",
    },
  ];

  const datosPaciente = async () => {
    await fetch(
      `http://localhost:3000/apiLNFG/obtenerPacienteDocumento/${documento}`
    )
      .then((res) => res.json())
      .then((respuesta) => {
        console.log(respuesta);
        setDatos({
          nombre: respuesta.respuesta.nombre,
          segundoNombre: respuesta.respuesta.segundo_nombre,
          primerApellido: respuesta.respuesta.primer_apellido,
          segundoApellido: respuesta.respuesta.segundo_apellido,
          numerDocumento: respuesta.respuesta.documento,
          direccion: respuesta.respuesta.direccion,
          descDir: respuesta.respuesta.desc_dir,
          celular: respuesta.respuesta.celular,
          tipoDocumento: respuesta.respuesta.tipo_documento,
        });
      })
      .catch((error) => console.log(error));
  };

  const datosTecnico = async () => {
    await fetch("http://localhost:3000/apiLNFG/obtenerTecnico")
      .then((res) => res.json())
      .then((respuesta) => {
        tecnicos = respuesta.respuesta.map((tecnico) => ({
          value: tecnico.documento,
          label: `${tecnico.nombre} ${tecnico.segundo_nombre} ${tecnico.primer_apellido} ${tecnico.segundo_apellido} `,
        }));
        setListaTecnicos(tecnicos);
      })
      .catch((error) => console.log(error));
  };

  const datosExamenes = async () => {
    await fetch("http://localhost:3000/apiLNFG/obtenerListaexamenes")
      .then((res) => res.json())
      .then((respuesta) => {
        examenes = respuesta.respuesta.map((examen) => ({
          nombre: examen.nombre,
          value: examen.id_examen,
          precio: examen.precio,
          requisitos: examen.requisitos,
        }));
        setListaExamenes(examenes);
      })
      .catch((error) => console.log(error));
  };

  const datosPaquete = async () => {
    await fetch("http://localhost:3000/apiLNFG/obtenerListaPaquete")
      .then((res) => res.json())
      .then((respuesta) => {
        paquete = respuesta.respuesta.map((paquete) => ({
          value: paquete.id_paquete,
          label: paquete.nombre,
          precio: paquete.precio,
          descripcion: paquete.descripcion,
          examenes: paquete.examenes,
        }));
        setListaPaquetes(paquete);
      })
      .catch((error) => console.log(error));
  };

  const valorFinal = () => {
    switch (datosSecundario.tipoServicio) {
      case "PRESENCIAL":
        switch (datosSecundario.tipoPaciente) {
          case "EPS":
            datosSecundario.copago = 0;
            datosSecundario.valorDomicilio = 0;
            datosrden.valorFactura = 0;
            return 0;
          case "INDEPENDIENTE":
            datosSecundario.valorDomicilio = 0;
            datosSecundario.copago = 0;
            datosrden.valorFactura =
              parseInt(datosrden.valorExamenes, 10) +
              parseInt(datosrden.valorPaquete, 10);
            return (
              parseInt(datosrden.valorExamenes, 10) +
              parseInt(datosrden.valorPaquete, 10)
            );

          case "PREPAGADA":
            datosSecundario.valorDomicilio = 0;
            datosrden.valorFactura = parseInt(datosSecundario.copago);
            return parseInt(datosSecundario.copago, 10);
        }

      case "DOMICILIO":
        switch (datosSecundario.tipoPaciente) {
          case "EPS":
            datosrden.valorFactura = parseInt(datosSecundario.valorDomicilio);
            return parseInt(datosSecundario.valorDomicilio);
          case "INDEPENDIENTE":
            datosSecundario.copago = 0;
            datosrden.valorFactura =
              parseInt(datosrden.valorExamenes, 10) +
              parseInt(datosrden.valorPaquete, 10) +
              parseInt(datosSecundario.valorDomicilio, 10);
            return (
              parseInt(datosrden.valorExamenes, 10) +
              parseInt(datosrden.valorPaquete, 10) +
              parseInt(datosSecundario.valorDomicilio, 10)
            );

          case "PREPAGADA":
            datosrden.valorFactura =
              parseInt(datosSecundario.copago, 10) +
              parseInt(datosSecundario.valorDomicilio, 10);
            return (
              parseInt(datosSecundario.copago, 10) +
              parseInt(datosSecundario.valorDomicilio, 10)
            );
        }

        break;
    }
  };

  const actualizarDireccion = async (documento, direccion, descripcion) => {
    const url = `http://localhost:3000/apiLNFG/actualizarDireccion/${documento}`;
    const data = {
      direccion: direccion,
      descripcion: descripcion,
    };

    try {
      const response = await fetch(url, {
        method: "PUT", // Puedes ajustar el método según tu API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
      } else {
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const crearOrden = async () => {
    setBlock(true);

    if (
      datosSecundario.valorDomicilio === "" ||
      /[^\d.]/.test(datosSecundario.valorDomicilio)
    ) {
      alert(
        "EL VALOR DEL DOMICILIO DEBE SER UN NÚMERO ENTERO Y NO DEBE CONTENER CARACTERES ESPECIALES"
      );
      setBlock(false);
      return;
    }

    if (
      datosrden.examenes === "" ||
      datosrden.paquetes === "" ||
      datosrden.descripcionPaquete === "" ||
      datosrden.requisitosExamenes === "" ||
      datosSecundario.tecnico === "" ||
      datos.numerDocumento === "" ||
      datosrden.valorExamenes === "" ||
      datosrden.valorFactura === "" ||
      datosrden.valorPaquete === "" ||
      datosSecundario.tipoPaciente === "" ||
      datosSecundario.tipoServicio === "" ||
      datos.direccion === "" ||
      datos.descDir === ""
    ) {
      setComplete(false);
      alert(`ESTOS CAMPOS SON OBLIGATORIOS:
        TIPO SERVICIO
        TIPO DOCUEMNTO,
        NUMERO DOCUMENTO
        NOMBRE, SEGUNDO NOMBRE
        PRIMER APELLIDO, SEGUNDO APELLIDO
        DIRECCION
        CELULAR
        EXAMENES, REQUISISTOS EXAMENES
        PAQUETES, REQUISISTOS PAQUETES
        VALOR EXAMENES,
        VALOR PAQUETES,
        VALOR FACTURA

      
      `);
    } else {
      await fetch("http://localhost:3000/apiLNFG/crearOrden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify({
          id_tecnico: datosSecundario.tecnico,
          id_paciente: datos.numerDocumento,
          id_admisionista: "1765689809",
          id_sede: 1000,
          examenes: datosrden.examenes || "NO",
          paquetes: datosrden.paquetes || "NO",
          req_paquetes: datosrden.descripcionPaquete || "NO",
          req_examenes: datosrden.requisitosExamenes || "NO",
          fecha_examen: datos.fechaExamen,
          tipo_servicio: datosSecundario.tipoServicio,
          tipo_paciente: datosSecundario.tipoPaciente,
          estado: "ACTIVA",
          valor_copago: datosSecundario.copago,
          valor_domicilio: datosSecundario.valorDomicilio,
          valor_examenes: datosrden.valorExamenes,
          valor_paquetes: datosrden.valorPaquete,
          valor_factura: datosrden.valorFactura,
        }),
      })
        .then((res) => res.json())
        .then((respuesta) => {
          notificacion();

          estadoTomada();

          console.log(respuesta);
          actualizarDireccion(
            datos.numerDocumento,
            datos.direccion,
            datos.descDir
          );
          setExito(true);
        });
    }

    setBlock(false);
  };

  const notificacion = () => {
    Push.create("LAB. NANCY FLOREZ GARCIA", {
      body: "Orden asignada",
      icon: logo,
      timeout: 4000,
      onClick: function () {
        window.focus();
        this.close();
      },
    });
  };

  useEffect(() => {
    datosTecnico();
    datosPaciente();
    datosExamenes();
    datosPaquete();
    setCargando(true);
    console.log(datosrden.examenes);
  }, []);

  const ObjetoNombre = [
    {
      label: "Tipo Documento",
      iden: "tipoDocumento",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Numero Documento",
      iden: "numerDocumento",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Nombre",
      iden: "nombre",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Nombre",
      iden: "segundoNombre",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Primer Apellido",
      iden: "primerApellido",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Segundo Apellido",
      iden: "segundoApellido",
      block: true,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Direccion",
      iden: "direccion",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Celular",
      iden: "celular",
      block: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
    },
    {
      label: "Descripcion Direccion",
      iden: "descDir",
      block: false,
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
  ];

  const tipoServicios = [
    // {
    //   label: "Presencial",
    //   value: "PRESENCIAL",
    // },
    {
      label: "Domicilio",
      value: "DOMICILIO",
    },
  ];

  return (
    <Box>
      {cargando ? (
        <Box>
          <img src={logo} alt="" />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container lg={8} padding={2}>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  onChange={capturarDatosSecundarios}
                  name="tipoServicio"
                  label="Tipo de Servicio"
                  fullWidth
                  select
                >
                  {tipoServicios.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  disabled={
                    datosSecundario.tipoServicio === "PRESENCIAL" ? true : false
                  }
                  type="number"
                  name="valorDomicilio"
                  fullWidth
                  label="Costo Domicilio"
                  onChange={capturarDatosSecundarios}
                ></TextField>
              </Grid>

              {ObjetoNombre.map((opciones) => (
                <Grid
                  xs={opciones.xs}
                  sm={opciones.sm}
                  md={opciones.md}
                  lg={opciones.lg}
                  padding={2}
                  key={opciones.iden}
                >
                  <TextField
                    disabled={opciones.block}
                    onChange={capturarDatos}
                    fullWidth
                    value={datos[opciones.iden]}
                    label={opciones.label}
                    name={opciones.iden}
                  ></TextField>
                </Grid>
              ))}

              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  name="tecnico"
                  label="Tecnico"
                  fullWidth
                  select
                  onChange={capturarDatosSecundarios}
                >
                  {listaTecnicos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  name="tipoPaciente"
                  label="Tipo paciente"
                  fullWidth
                  select
                  onChange={capturarDatosSecundarios}
                >
                  {tipopacientes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  name="fechaExamen"
                  onChange={capturarDatos}
                  type="date"
                  fullWidth
                  helperText="Ingrese la fecha del examen"
                ></TextField>
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} padding={2}>
                <TextField
                  disabled={
                    datosSecundario.tipoPaciente !== "PREPAGADA" ? true : false
                  }
                  onChange={capturarDatosSecundarios}
                  name="copago"
                  label="Copago"
                  fullWidth
                  type="number" // Set the input type to number for numeric input
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <Autocomplete
                  onChange={capturarExamenesSeleccionados}
                  name="examenes"
                  multiple
                  id="tags-outlined"
                  options={listaExamenes}
                  getOptionLabel={(option) => option.nombre}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      name="examenes"
                      fullWidth
                      multiline
                      rows={4}
                      {...params}
                      label="Seleccione Los examenes"
                      placeholder="Examenes"
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  value={datosrden.requisitosExamenes}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="Requisitos Examenes"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <Autocomplete
                  onChange={capturarPaquetesSeleccionados}
                  name="paquetes"
                  multiple
                  id="tags-outlined"
                  options={listaPaquetes}
                  getOptionLabel={(option) => option.label}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      name="paquetes"
                      fullWidth
                      multiline
                      rows={4}
                      {...params}
                      label="Seleccione Los Paquetes"
                      placeholder="Paquetes"
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} padding={2}>
                <TextField
                  value={datosrden.descripcionPaquete}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="Requisitos Paquetes"
                ></TextField>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  value={datosrden.valorExamenes}
                  name="precio"
                  label="Precio Examenes"
                  fullWidth
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  value={datosrden.valorPaquete}
                  name="precio"
                  label="Precio Paquete"
                  fullWidth
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={2}>
                <TextField
                  value={valorFinal()}
                  name="precioFactura"
                  helperText="Precio Factura"
                  fullWidth
                  // InputProps={{
                  //   readOnly: true, // Make the field read-only so the user can't edit it
                  // }}

                  InputProps={{
                    readOnly: true, // Make the field read-only so the user can't edit it

                    startAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="start">
                          <AttachMoneyIcon></AttachMoneyIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={crearOrden}
                  disabled={block}
                >
                  {block ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Generar Orden"
                  )}
                </Button>
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} padding={1}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <div>Cargando...</div>
      )}

      <OrdenExitoso openProp={exito} link={-1}></OrdenExitoso>
    </Box>
  );
}

export default GenerarOrden;
