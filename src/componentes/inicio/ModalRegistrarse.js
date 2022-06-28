import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Registrarse from "./Registrarse";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "rgb(55, 32, 43, 0.5)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalRegistrarse({ handleRegistrar }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        className="boton boton-centrar"
        color="primary"
        onClick={handleOpen}
      >
        Registrarse
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        id="modalRegistrarse"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="modal columna">
            <Registrarse
              id="modalRegistrarse"
              handleRegistrar={handleRegistrar}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
