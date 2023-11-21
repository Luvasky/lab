import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function Imprimir() {
  const [cargando, setCargando] = useState(true);
  const location = useLocation();
  const datosBusqueda = location.state;
  const [datos, setDatos] = useState([]);
  const [datosMostrar, setDatosMostrar] = useState([]);

  const datosOrdenes = async () => {
    try {
      const nuevosDatosMostrar = []; // Nuevo array para almacenar datos de cada iteración

      const response = await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/ImprimirOrden/${datosBusqueda.documento}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fecha_examen: datosBusqueda.fecha }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta exitosa:", data.respuesta);
      setDatos(data.respuesta);

      // Realizar solicitudes para cada elemento en datos
      for (const orden of data.respuesta) {
        const datosPacienteRespuesta = await datosPaciente(orden.id_paciente);
        nuevosDatosMostrar.push({
          ...orden,
          datosPaciente: datosPacienteRespuesta,
        });
      }

      setDatosMostrar(nuevosDatosMostrar);
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      // Aquí puedes realizar acciones adicionales después de completar todas las solicitudes
      setCargando(false);
    }
  };

  const datosPaciente = async (idPaciente) => {
    try {
      const response = await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/obtenerPacienteDocumento/${idPaciente}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Puedes incluir otras cabeceras según sea necesario
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      console.log("Respuesta Mia", data);
      return data; // Retornar los datos del paciente
    } catch (error) {
      console.error("Error en la solicitud:", error);
      return {}; // Retornar un objeto vacío en caso de error
    }
  };

  const generarPDF = () => {
    const pdf = new jsPDF();
    let yPosition = 20; // Inicializa la posición Y
    let currentPage = 1;

    pdf.text("ORDENES DEL DIA", 70, yPosition);
    datosMostrar.forEach((item, index) => {
      const lineHeight = 5; // Ajusta este valor según tus necesidades
      const maxWidth = 100; // Ajusta este valor según tus necesidades

      // Verifica si hay espacio suficiente en la página actual
      if (yPosition + 80 > pdf.internal.pageSize.height) {
        // Cambia a una nueva página
        pdf.addPage();
        yPosition = 20; // Reinicia la posición Y en la nueva página
        currentPage++;
      }

      pdf.setFontSize(8); // Ajusta este valor según tus necesidades

      // Función para agregar texto con salto de línea
      const addTextWithWrap = (text, x, y, lineHeight, maxWidth) => {
        const words = pdf.splitTextToSize(text, maxWidth);
        words.forEach((word, i) => {
          pdf.text(word, x, y + i * lineHeight);
        });
        return words.length * lineHeight;
      };

      pdf.text(`Id Orden: ${item.id_orden}`, 130, yPosition + lineHeight + 4);
      const fecha = new Date(item.fecha_examen);
      pdf.text(
        `Fecha: ${new Date(
          fecha.getTime() + 24 * 60 * 60 * 1000
        ).toLocaleDateString()}`,
        130,
        yPosition + 3 * lineHeight
      );

      pdf.text(
        `Documento: ${item.datosPaciente.respuesta.documento}`,
        130,
        yPosition + 4 * lineHeight
      );

      const pacienteHeight = addTextWithWrap(
        `Paciente: ${item.datosPaciente.respuesta.nombre} ${item.datosPaciente.respuesta.segundo_nombre} ${item.datosPaciente.respuesta.primer_apellido} ${item.datosPaciente.respuesta.segundo_apellido}`,
        20,
        yPosition + 2 * lineHeight,
        lineHeight,
        maxWidth
      );

      pdf.text(
        `Celular : ${item.datosPaciente.respuesta.celular}`,
        130,
        yPosition + 4 * lineHeight + pacienteHeight
      );

      pdf.text(
        `Valor Copago: $ ${item.valor_copago}`,
        130,
        yPosition + 5 * lineHeight + pacienteHeight
      );

      pdf.text(
        `Valor Examenes: $ ${item.valor_examenes}`,
        130,
        yPosition + 6 * lineHeight + pacienteHeight
      );

      pdf.text(
        `Valor Paquetes: $ ${item.valor_paquetes}`,
        130,
        yPosition + 7 * lineHeight + pacienteHeight
      );

      pdf.text(
        `Valor Domicilio: $ ${item.valor_domicilio}`,
        130,
        yPosition + 8 * lineHeight + pacienteHeight
      );

      pdf.text(
        `Valor Factura: $ ${item.valor_factura}`,
        130,
        yPosition + 9 * lineHeight + pacienteHeight
      );

      const examenesHeight = addTextWithWrap(
        `Examenes: ${item.examenes}`,
        20,
        yPosition + 2 * lineHeight + pacienteHeight,
        lineHeight,
        maxWidth
      );

      const paquetesHeight = addTextWithWrap(
        `Paquetes: ${item.paquetes}`,
        20,
        yPosition + 3 * lineHeight + pacienteHeight + examenesHeight,
        lineHeight,
        maxWidth
      );

      const descripcionHeight = addTextWithWrap(
        `Descripcion: ${item.datosPaciente.respuesta.desc_dir}`,
        20,
        yPosition + 7 * lineHeight + pacienteHeight + examenesHeight,
        lineHeight,
        maxWidth
      );

      pdf.text(
        `Direccion: ${item.datosPaciente.respuesta.direccion}`,
        20,
        yPosition + 6 * lineHeight + pacienteHeight + examenesHeight
      );

      // Agrega más información según sea necesario

      // Agrega una línea separadora entre cada entrada
      pdf.line(
        20,
        yPosition +
          10 * lineHeight +
          pacienteHeight +
          examenesHeight +
          descripcionHeight,
        190,
        yPosition +
          10 * lineHeight +
          pacienteHeight +
          examenesHeight +
          descripcionHeight
      );

      // Incrementa la posición Y para la próxima entrada
      yPosition +=
        11 * lineHeight +
        pacienteHeight +
        examenesHeight +
        descripcionHeight +
        paquetesHeight; // Ajusta este valor según tus necesidades
    });

    // Guarda el PDF con el nombre y extensión
    pdf.save(`OrdenesDelDia_Pagina${currentPage}.pdf`);
  };

  useEffect(() => {
    datosOrdenes();
  }, []);
  console.log(datosMostrar);

  return (
    <div>
      <Box>
        <Grid
          xs={10}
          sx={{ display: "flex", justifyContent: "center" }}
          padding={2}
        >
          <Button onClick={generarPDF} variant="contained" color="primary">
            Descargar PDF
          </Button>
        </Grid>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: "5%",
          }}
        >
          <Typography variant="h5">ORDENES DEL DIA</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container lg={8} padding={2}>
            {datosMostrar.map((item) => (
              <Grid container key={item.id_orden}>
                <Typography>
                  ******************************************************************************************************************************
                </Typography>
                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "red" }}
                >
                  <Box>
                    Fecha:{" "}
                    {new Date(
                      new Date(item.fecha_examen).getTime() +
                        24 * 60 * 60 * 1000
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Box>
                </Grid>

                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    Documento: {item.datosPaciente.respuesta.documento}
                  </Box>
                </Grid>
                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box>
                    {` Paciente: ${item.datosPaciente.respuesta.nombre} ${item.datosPaciente.respuesta.segundo_nombre} ${item.datosPaciente.respuesta.primer_apellido} ${item.datosPaciente.respuesta.segundo_apellido} `}
                  </Box>
                </Grid>
                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    Valor Factura : $ {item.valor_factura}
                  </Box>
                </Grid>
                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box>Examenes: {item.examenes}</Box>
                </Grid>

                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    Paquetes: {item.paquetes}
                  </Box>
                </Grid>
                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box>Direccion: {item.datosPaciente.respuesta.direccion}</Box>
                </Grid>

                <Grid
                  padding={2}
                  item
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                  // sx={{ backgroundColor: "blue" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    Descripcion: {item.datosPaciente.respuesta.desc_dir}
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {cargando && <p>Cargando...</p>}

      {/* Contenido adicional basado en los datos obtenidos */}
    </div>
  );
}

export default Imprimir;
