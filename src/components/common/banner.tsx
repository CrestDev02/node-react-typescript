import { Alert, AlertColor, Snackbar } from "@mui/material";
import { FC } from "react";
import { BannerProps } from "../../types/banner";

export const Notification: FC<BannerProps> = ({open, message, handleClose, status}) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:"top", horizontal:"center"}}>
      <Alert severity={status as AlertColor} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
