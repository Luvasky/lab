import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import check from "./done.webp";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "40%" },
  height: { md: "50vh" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 3,

  boxShadow: 24,
  p: 4,
};

export default function Exitoso({ openProp, link, documento }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={openProp}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ widh: "100%" }}>
            <Typography
              variant="h6"
              color="green"
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              CREADO CON EXITO
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={check}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            ></img>
          </Box>

          <Box sx={{ marginTop: "-10%", width: "100%" }}>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={() => {
                navigate(link);
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
