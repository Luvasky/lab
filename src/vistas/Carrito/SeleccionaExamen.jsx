import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Modal,
  Checkbox,
} from "@mui/material";
import blood from "./blood-test.jpg";
import logo from "./LOGO2.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, useLocation } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import PaidIcon from "@mui/icons-material/Paid";
import Pay from "./Pay";

function SeleccionaExamen() {
  const navigate = useNavigate();
  const [dataRequest, setDataRequest] = useState({
    idwompi_solicitud: "",
    documentoSolicitud: "",
    fecha_ingreso: "",
    examenes: "",
    paquetes: "",
  });
  const [countClcik, setCountClcik] = useState(0);
  const [deacuerdo, setDeacuerdo] = useState(false);
  const [examen, setExamen] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [contador, setContador] = useState(0);
  const [estado, setEstado] = useState(true);
  const [cartItems, setCartItems] = useState([]); // State to hold the added items
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const [cargandoDeacuerdo, setcargandoDeacuerdo] = useState(false); // State to hold the

  const documento = new URLSearchParams(location.search).get("documento");
  console.log(documento);

  const referencia = "";
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 500,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCart = async () => {
    setOpenCart(true);

    // setCountClcik(countClcik + 1);
    // console.log(cartItems);

    // if (countClcik >= 2) {
    //   // Only generate a new reference when the count is 2 or more
    //   const newReference = await generatePaymentReference();
    //   setPaymentReference(newReference);
    // }

    // // Wait for payment reference generation
    // console.log(paymentReference);
    // // requestTableWompy();
  };

  const handleCloseCart = () => {
    setOpenCart(false);
    requestDelete();
  };
  const [dataProduct, setDataProduct] = useState({});
  const [paymentReference, setPaymentReference] = useState("");

  const ImOk = () => {
    setDeacuerdo(!deacuerdo);
  };

  const catchFeature = (data) => {
    setDataProduct(data);
  };

  const generatePaymentReference = async () => {
    return new Promise((resolve) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let newReference = "";
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newReference += characters.charAt(randomIndex);
      }
      setPaymentReference(newReference);
      resolve(newReference);
    });
  };

  const addContent = (nombre, precio) => {
    setContador(contador + 1);
    const newItem = { nombre, precio }; // Create a new item object
    const updatedCart = [...cartItems, newItem]; // Add the new item to the existing cart
    setCartItems(updatedCart); // Update the cart state
    setEstado(false);
    setTotalPrice(totalPrice + parseInt(precio));
  };

  const quitarItem = (index) => {
    const removedItem = cartItems[index];
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    setContador(contador - 1); // Decrease contador by 1
    setTotalPrice(totalPrice - parseInt(removedItem.precio));
  };

  const InitialRequire = async () => {
    await fetch(
      "https://apilnfg-production.up.railway.app/apiLNFG/obetenerListaExamenesSinNo"
    )
      .then((res) => res.json())
      .then((respuesta) => {
        setExamen(respuesta.respuesta);

        setCargando(true);
      });
  };

  const requestTableWompy = async (e) => {
    setCountClcik(countClcik + 1);
    console.log(cartItems);

    if (countClcik >= 2) {
      // Only generate a new reference when the count is 2 or more
      const newReference = await generatePaymentReference();
      setPaymentReference(newReference);
      console.log("ESTOY ENTRNDO");
    }

    // Wait for payment reference generation
    console.log(paymentReference);
    // requestTableWompy();

    setcargandoDeacuerdo(true);

    const cartItemsString = cartItems.map((item) => item.nombre);

    // Join the items into a single comma-separated string
    const joinedCartItems = cartItemsString.join(",");

    await fetch(
      "https://apilnfg-production.up.railway.app/apiLNFG/crearSolicitudWompi",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idwompi_solicitud: paymentReference,
          documento: documento,
          examenes: joinedCartItems,
          paquetes: "NO",
        }),
      }
    ).then((res) => {
      res.json().then((respuesta) => {
        console.log(respuesta);
        setcargandoDeacuerdo(false);
      });
    });
    setcargandoDeacuerdo(false);
  };

  const requestDelete = async () => {
    try {
      const response = await fetch(
        `https://apilnfg-production.up.railway.app/apiLNFG/borrarSolicitud/${paymentReference}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // Handle non-successful responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Process the response or perform any additional tasks
      console.log("Request successful");
    } catch (error) {
      // Handle any network or fetch-related errors
      console.error("Error during fetch operation:", error.message);
    }
  };
  useEffect(() => {
    InitialRequire();

    generatePaymentReference().then((reference) => {
      setPaymentReference(reference); // Almacena la referencia generada en el estado
    });

    // // Deshabilitar el botón de retroceso
    // const disableBackButton = (event) => {
    //   event.preventDefault();
    //   window.history.forward(); // Navegar hacia adelante
    // };

    // // Deshabilitar el botón de recarga
    // const disableReloadButton = (event) => {
    //   event.preventDefault();
    // };

    // window.history.pushState(null, "", window.location.pathname);

    // // Deshabilitar el botón de ir hacia adelante del navegador por defecto
    // window.addEventListener("popstate", disableBackButton);

    // // Deshabilitar el botón de recargar la página
    // window.addEventListener("beforeunload", disableReloadButton);

    // return () => {
    //   window.removeEventListener("popstate", disableBackButton);
    //   window.removeEventListener("beforeunload", disableReloadButton);
    // };
  }, []);

  return !cargando ? (
    <Box>Cargando</Box> // This could be an empty fragment or any other component
  ) : (
    <Box>
      <Box
        sx={{
          // backgroundColor: "blue",
          width: { sm: "100%", xs: "100%", md: "100%", lg: "100%" },
          height: { md: "15%" },
          marginTop: { sm: "5%", md: "2%" },
          marginBottom: { md: "5%" },
          marginLeft: { sm: "0%", md: "0%" },
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "inherit" } }}>
          <img src={logo} />
        </Box>

        <Button
          variant="contained"
          sx={{
            height: { sm: 40, md: 40, lg: 40 },
            width: { xs: "100%", sm: 200 },
          }}
          onClick={() => {
            handleOpenCart();
          }}
          startIcon={<ShoppingCartIcon></ShoppingCartIcon>}
        >
          {contador}
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid container xs={10} sm={12} md={12} lg={12}>
          {examen.map((examen) => (
            <Grid
              xs={10}
              sm={6}
              md={6}
              lg={3}
              padding={2}
              key={examen.id_examen}
            >
              <Card
                key={examen.id_examen}
                sx={{
                  marginLeft: "auto",
                  height: 300,
                  maxHeight: 500,
                  width: "100%",
                  backgroundColor: "red",
                  overflow: "hidden", // Oculta el contenido que sobresale
                }}
              >
                <CardMedia component="img" height="150" image={blood} />
                <CardContent
                  sx={{
                    backgroundColor: "gold",
                    height: 300,
                    overflowY: "auto", // Habilita el scroll vertical si el contenido es más largo que la altura especificada
                  }}
                >
                  <Box
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    <Typography variant="h7">{examen.nombre}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="h7">${examen.precio}</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={() => addContent(examen.nombre, examen.precio)}
                      sx={{ marginBottom: "2%" }}
                    >
                      agregar
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        handleOpen();
                        catchFeature(examen);
                      }}
                    >
                      Ver detalles
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h3" color="orange">
              DETALLES
            </Typography>
          </Box>
          <Box>
            <img src={blood} style={{ width: "30%", heigt: "30%" }}></img>

            <Typography id="modal-modal-title" variant="h3" component="h2">
              {dataProduct.nombre}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="orange">
              Descripcion
            </Typography>
            <Box
              id="modal-modal-description"
              sx={{ mt: 2, marginBottom: "2%" }}
            >
              {dataProduct.requisitos}
            </Box>
            <Box>
              <Typography variant="h6" color="orange">
                Precio
              </Typography>
            </Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ${dataProduct.precio}
            </Typography>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openCart}
        // onClose={handleCloseCart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h4" color="orange">
              PRODUCTOS
            </Typography>
          </Box>
          <Box>
            <Box>
              {cartItems.map((product, index) => (
                <Box key={index}>
                  <img style={{ width: 50, height: 50 }} src={blood}></img>

                  <Box>{product.nombre}</Box>
                  <Box>${product.precio}</Box>
                  <Button
                    disabled={deacuerdo}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => quitarItem(index)}
                  >
                    Quitar
                  </Button>
                  <Typography>
                    --------------------------------------------------------------------
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ marginBottom: "2%" }}>TOTAL A PAGAR</Box>
            <Box sx={{ marginBottom: "2%" }}>$ {totalPrice} </Box>
            <Button
              disabled={deacuerdo}
              fullWidth
              variant="contained"
              sx={{ display: deacuerdo ? "none" : "blokc" }}
              onClick={() => {
                setDeacuerdo(true);
                requestTableWompy();
              }}
            >
              ESTOY DE ACUERDO CON MI COMPRA !
            </Button>
            <Box sx={{ display: deacuerdo ? "block" : "none" }}>
              <form
                action="https://checkout.wompi.co/p/"
                method="GET"
                onSubmit={requestTableWompy}
              >
                <input
                  type="hidden"
                  name="public-key"
                  value="pub_prod_IQ3EspNkdMIX50SFcqkTGKQSY7dxAu6H"
                />
                <input type="hidden" name="currency" value="COP" />
                <input
                  type="hidden"
                  name="amount-in-cents"
                  value={totalPrice * 100}
                />
                <input
                  type="hidden"
                  name="reference"
                  value={paymentReference}
                />
                <input
                  type="hidden"
                  name="data-signature:integrity"
                  value="prod_integrity_Pv5nJFBaTpAIJnthkWZPIMkjqTSeFwlL"
                />

                <input
                  type="hidden"
                  name="redirect-url"
                  value={`http://localhost:5173/`}
                />

                <Button
                  // disabled={deacuerdo}
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<PaidIcon></PaidIcon>}
                >
                  Pagar con Wompi
                </Button>
              </form>
            </Box>
            <Box>
              <Button
                fullWidth
                color="error"
                variant="contained"
                sx={{ marginTop: "2%" }}
                onClick={() => {
                  handleCloseCart();
                  requestDelete();
                  setDeacuerdo(false);
                }}
              >
                CANCELAR
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SeleccionaExamen;
