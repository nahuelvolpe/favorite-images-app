import { FC, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

interface NotiSnackbarProps {
  open: boolean;
  handleClose: (_event: React.SyntheticEvent | Event, reason?: string) => void;
  severity: AlertColor;
  message: string;
}

/**
 * Componente funcional que representa un Snackbar de notificación con diversos estados.
 *
 * @param {boolean} open - Indica si el Snackbar está abierto o cerrado.
 * @param {Function} handleClose - Función para cerrar el Snackbar.
 * @param {string} severity - Nivel de gravedad de la notificación (p. ej., 'success', 'error').
 * @param {string} message - Mensaje de la notificación.
 * @returns {ReactNode} Componente de React que representa el Snackbar de notificación.
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotiSnackbar: FC<NotiSnackbarProps> = ({
  open,
  handleClose,
  severity,
  message,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotiSnackbar;
