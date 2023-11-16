import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./vistas/logueo/Login";
import Administrador from "./vistas/Principal/Administrador";
import Admisionista from "./vistas/Principal/Admisionista";
import Tecnico from "./vistas/Principal/Tecnico";
import Usuario from "./vistas/Principal/Usuario";
import CrearCuenta from "./vistas/logueo/CrearCuenta";
import Exitoso from "./vistas/logueo/Exitoso";
import CrearExamen from "./vistas/Examen/CrearExamen";
import AdministrarExamen from "./vistas/Examen/AdministrarExamen";
import Olvido from "./vistas/logueo/Olvido";
import EditarExamen from "./vistas/Examen/EditarExamen";
import CrearPaciente from "./vistas/Paciente/CrearPaciente";
import AdministrarPaciente from "./vistas/Paciente/AdministrarPaciente";
import EditarPaciente from "./vistas/Paciente/EditarPaciente";
import CrearTrabajador from "./vistas/Trabajador/CrearTrabajador";
import AdministrarTrabajador from "./vistas/Trabajador/AdministrarTrabajador";
import EditarTrabajador from "./vistas/Trabajador/EditarTrabajador";
import CrearSede from "./vistas/Sede/CrearSede";
import AdministrarSede from "./vistas/Sede/AdministrarSede";
import EditarSede from "./vistas/Sede/EditarSede";
import CrearPaquete from "./vistas/Paquete/CrearPaquete";
import AdministrarPaquete from "./vistas/Paquete/AdministrarPaquete";
import EditarPaquete from "./vistas/Paquete/EditarPaquete";
import PacienteExitoso from "./vistas/Paciente/PacienteExitoso";
import GenerarOrden from "./vistas/Orden/GenerarOrden";
import TengoExamen from "./vistas/Tengo_Examen/TengoExamen";
import AdministrarSolicitud from "./vistas/Solicitud/AdministrarSolicitud";
import AdministrarOrden from "./vistas/Orden/AdministrarOrden";
import OrdenBuscar from "./vistas/Orden/OrdenBuscar";
import ExamenesTencnico from "./vistas/ExamenTecnico/ExamenesTecnico";
import SeleccionaExamen from "./vistas/Carrito/SeleccionaExamen";
import SeleccionaTipoCompra from "./vistas/Carrito/SeleccionaTipoCompra";
import SeleccionaPaquete from "./vistas/Carrito/SeleccionaPaquete";
import AdministrarSolicitudesWompi from "./vistas/Carrito/AdministrarSolicitudesWompi";
import ObservarSolicitudWompi from "./vistas/Carrito/ObservarSolicitudWompi";
import CrearEmpresa from "./vistas/Empresa/CrearEmprsa";
import EditarOrden from "./vistas/Orden/EditarOrden";
import IngresarCampos from "./vistas/Reportes/IngresarCampos";
import Imprimir from "./vistas/Reportes/Imprimir";
import VerOrdenTecnico from "./vistas/ExamenTecnico/VerOrdenTecnico";
import CambiarContrasena from "./vistas/Contrasena/CambiarContrasena";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route
            path="/vistaAdministrador"
            element={<Administrador></Administrador>}
          />
          <Route
            path="/vistaAdmisionista"
            element={<Admisionista></Admisionista>}
          />
          <Route path="/vistaTecnico" element={<Tecnico></Tecnico>} />
          <Route path="/vistaUsuario" element={<Usuario></Usuario>} />
          <Route
            path="/vistaCrearCuenta"
            element={<CrearCuenta></CrearCuenta>}
          />
          <Route path="/vistaExitoso" element={<Exitoso></Exitoso>} />
          <Route
            path="/vistaCrearExamen"
            element={<CrearExamen></CrearExamen>}
          />
          <Route
            path="/vistaAdministrarExamen"
            element={<AdministrarExamen></AdministrarExamen>}
          />
          <Route
            path="/vistaEditarExamen"
            element={<EditarExamen></EditarExamen>}
          />

          <Route
            path="/vistaCrearPaciente"
            element={<CrearPaciente></CrearPaciente>}
          />
          <Route
            path="/vistaAdministrarPaciente"
            element={<AdministrarPaciente></AdministrarPaciente>}
          />

          <Route
            path="/vistaEditarPaciente"
            element={<EditarPaciente></EditarPaciente>}
          />

          <Route
            path="/vistaCrearTrabajador"
            element={<CrearTrabajador></CrearTrabajador>}
          />

          <Route
            path="/vistaAdministrarTrabajador"
            element={<AdministrarTrabajador></AdministrarTrabajador>}
          />

          <Route
            path="/vistaEditarTrabajador"
            element={<EditarTrabajador></EditarTrabajador>}
          />

          <Route path="/vistaCrearSede" element={<CrearSede></CrearSede>} />

          <Route
            path="/vistaAdministrarSede"
            element={<AdministrarSede></AdministrarSede>}
          />
          <Route path="/vistaEditarSede" element={<EditarSede></EditarSede>} />

          <Route
            path="/vistaCrearPaquete"
            element={<CrearPaquete></CrearPaquete>}
          />

          <Route
            path="/vistaAdministrarPaquete"
            element={<AdministrarPaquete></AdministrarPaquete>}
          />

          <Route
            path="/vistaEditarPaquete"
            element={<EditarPaquete></EditarPaquete>}
          />

          <Route
            path="/vistaGenerarOrden"
            element={<GenerarOrden></GenerarOrden>}
          />

          <Route
            path="/vistaTengoExamen"
            element={<TengoExamen></TengoExamen>}
          />

          <Route
            path="/vistaAdministrarSolicitud"
            element={<AdministrarSolicitud></AdministrarSolicitud>}
          />

          <Route
            path="/vistaAdministrarOrden"
            element={<AdministrarOrden></AdministrarOrden>}
          />

          <Route
            path="/vistaGenerarOrdenBuscar"
            element={<OrdenBuscar></OrdenBuscar>}
          />

          <Route
            path="/vistaAdmnistrarExamenesTecnico"
            element={<ExamenesTencnico></ExamenesTencnico>}
          />
          <Route
            path="/vistaSeleccionaExamen"
            element={<SeleccionaExamen></SeleccionaExamen>}
          />
          <Route
            path="/vistaSeleccionaPaquete"
            element={<SeleccionaPaquete></SeleccionaPaquete>}
          />
          <Route
            path="/vistaSeleccionaTipoCompra"
            element={<SeleccionaTipoCompra></SeleccionaTipoCompra>}
          />

          <Route
            path="/vistaAdministrarSolicitudesWompi"
            element={
              <AdministrarSolicitudesWompi></AdministrarSolicitudesWompi>
            }
          />

          <Route
            path="/vistaObservarSolicitudWompi"
            element={<ObservarSolicitudWompi></ObservarSolicitudWompi>}
          />

          <Route
            path="/vistaCrearEmpresa"
            element={<CrearEmpresa></CrearEmpresa>}
          />

          <Route path="/vistaOlvido" element={<Olvido></Olvido>} />

          <Route
            path="/vistaEditarOrden"
            element={<EditarOrden></EditarOrden>}
          />

          <Route
            path="/vistaIngresarCampo"
            element={<IngresarCampos></IngresarCampos>}
          />

          <Route path="/vistaImprimir" element={<Imprimir></Imprimir>} />

          <Route
            path="/vistaVerOrdenTecnico"
            element={<VerOrdenTecnico></VerOrdenTecnico>}
          />

          <Route
            path="/vistaCambiarContrasena"
            element={<CambiarContrasena></CambiarContrasena>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
