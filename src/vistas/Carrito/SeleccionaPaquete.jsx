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
} from "@mui/material";
import blood from "./blood-test.jpg";
import logo from "./LOGO2.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, useLocation } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";

function SeleccionaPaquete() {
  const precio = 10000;
  const [examen, setExamen] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [contador, setContador] = useState(0);
  const [estado, setEstado] = useState(true);
  const [cartItems, setCartItems] = useState([]); // State to hold the added items
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const [countClcik, setCountClcik] = useState(0);

  const documento = new URLSearchParams(location.search).get("documento");
  console.log(documento);

  const [dataRequest, setDataRequest] = useState({
    idwompi_solicitud: "",
    documentoSolicitud: "",
    fecha_ingreso: "",
    examenes: "",
    paquetes: "",
  });

  const addContent = (nombre, precio) => {
    setContador(contador + 1);
    setEstado(false);
    const newItem = { nombre, precio }; // Create a new item object
    const updatedCart = [...cartItems, newItem]; // Add the new item to the existing cart
    setCartItems(updatedCart); // Update the cart state
    setTotalPrice(totalPrice + parseInt(precio));
  };

  const quitarItem = (index) => {
    const removedItem = cartItems[index];
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    setContador(contador - 1); // Decrease contador by 1
    setTotalPrice(totalPrice - parseInt(removedItem.precio));
  };

  const generatePaymentReference = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newReference = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newReference += characters.charAt(randomIndex);
    }
    setPaymentReference(newReference);
    return newReference;
  };

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

  const handleOpenCart = async () => {
    setOpenCart(true);

    setCountClcik(countClcik + 1);
    console.log(cartItems);

    if (countClcik > 1) {
      await generatePaymentReference();
    }
    // Wait for payment reference generation
    console.log(paymentReference);
    requestTableWompy();
  };
  const handleCloseCart = () => setOpenCart(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataProduct, setDataProduct] = useState({});
  const [paymentReference, setPaymentReference] = useState("");

  const catchFeature = (data) => {
    setDataProduct(data);
  };
  const InitialRequire = async () => {
    await fetch(
      "https://apilnfg-production.up.railway.app/apiLNFG/obtenerListaPaqueteSinNo"
    )
      .then((res) => res.json())
      .then((respuesta) => {
        setExamen(respuesta.respuesta);

        setCargando(true);
      });
  };

  const requestTableWompy = async (e) => {
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
          fecha_ingreso: "sjsjs",
          examenes: joinedCartItems,
          paquetes: "NO",
        }),
      }
    );
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
    generatePaymentReference();
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
          onClick={() => handleOpenCart()}
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
                // onClick={() => navigate(opciones.link)}
                key={examen.id_examen}
                sx={{
                  marginLeft: "auto",
                  height: 300,
                  maxHeight: 500,
                  width: "100%",
                  backgroundColor: "red",
                }}
              >
                <CardMedia component="img" height="150" image={blood} />
                <CardContent sx={{ backgroundColor: "gold", height: 300 }}>
                  <Box>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {dataProduct.nombre}
            </Typography>
          </Box>

          <Box marginBottom="2%">
            <Typography variant="h5" color="orange">
              Examenes
            </Typography>
          </Box>

          <Box marginBottom="2%">
            <Typography>{dataProduct.examenes}</Typography>
          </Box>

          <Box marginBottom="2%">
            <Typography variant="h5" color="orange">
              Descripcion
            </Typography>
          </Box>

          <Box marginBottom="2%">
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              {dataProduct.descripcion}
            </Box>

            <Box marginBottom="2%">
              <Typography color="orange" variant="h6">
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
        onClose={handleCloseCart}
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
            <Box sx={{ marginBottom: "2%" }}>$ {totalPrice}</Box>
            <Box>
              <form action="https://checkout.wompi.co/p/" method="GET">
                <input
                  type="hidden"
                  name="public-key"
                  value="pub_test_jGZdlZTIT9P3LU2IKMYQfuT3JDyqpm0A"
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
                  value="test_integrity_1SCRqtCbDBQmfJH0tmGOJtoZsDx8e98T"
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<PaidIcon></PaidIcon>}
                >
                  Pagar con Wompi
                </Button>
              </form>
              <Box>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  sx={{ marginTop: "2%" }}
                  onClick={() => {
                    handleCloseCart();
                    requestDelete();
                  }}
                >
                  CANCELAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SeleccionaPaquete;
