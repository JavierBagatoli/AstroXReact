import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckSVG from "../../svg/check.svg";
import lapizEditar from "../../svg/lapizEditar.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TarjetaInfo({ tarea, funcionBoton, funcionBotonDos }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const creacionEntrada = new Date(tarea.fechaCreacion);
  const creacion = creacionEntrada.toLocaleDateString();

  let completado = 0;
  if (tarea.fechaCompletado !== 0) {
    const completadoEntrada = new Date(tarea.fechaCompletado);
    completado = completadoEntrada.toLocaleDateString();
  } else {
    completado = "Sin completar";
  }

  let limite = 0;
  if (isNaN(tarea.fechaLimite)) {
    limite = "Sin fecha limite";
  } else {
    const limiteEntrada = new Date(tarea.fechaLimite + 86400000);
    limite = limiteEntrada.toLocaleDateString();
  }

  const cierreProximo = (fecha) => {
    const estilosDefault = "fila-tarea item-tarea";
    const diaHoy = Date.now();
    if (fecha === null) {
      return estilosDefault;
    }
    const fechaMax = fecha - diaHoy;

    if (fechaMax < 86400000 * 0.3) {
      return estilosDefault + " rojo-alerta";
    } else if (fechaMax < 86400000 * 3) {
      return estilosDefault + " rojo";
    } else if (fechaMax < 86400000 * 7) {
      return estilosDefault + " amarillo";
    } else {
      return estilosDefault;
    }
  };
  //

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className={cierreProximo(tarea.fechaLimite)}
      >
        <p className="tarea-estilo">{tarea.titulo}</p>
        <div className="container item2">
          <button
            onClick={() => funcionBoton(tarea)}
            className="boton-tarea"
            title="Completará la tarea"
          >
            <img
              className="svg"
              src={CheckSVG}
              alt="Terminar"
              title="Terminar"
            ></img>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              funcionBotonDos();
            }}
            className="boton-tarea"
            title="Completará la tarea"
          >
            <img
              className="svg"
              src={lapizEditar}
              alt="Editar"
              title="Editar"
            ></img>
          </button>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} color="primary" className="modal">
            <Typography id="transition-modal-title" variant="h4" component="h2">
              {tarea.titulo}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              {tarea.descripcion}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha creación: {creacion}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha completado: {completado}
            </Typography>
            <Typography id="transition-modal-fecha-finalizacion" sx={{ mt: 2 }}>
              Fecha límite: {limite}
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => handleClose()}
            >
              cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
