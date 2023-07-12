import React from "react";
import {alpha, Chip} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import {useTheme} from "@mui/material/styles";

const SyncButton = (
  props: { updatedTime: string, onClick: () => void }
) => {
  const theme = useTheme();
  return (
    <Chip
      icon={<SyncIcon/>}
      sx={{
        borderRadius: theme.spacing(1),
        backgroundColor: alpha(theme.palette.text.secondary, 0.10),
        "&:hover": {
          backgroundColor: alpha(theme.palette.text.secondary, 0.15),
        },
      }}
      size="small"
      label={"Aggiornato alle " + props.updatedTime}
      onClick={props.onClick}
    />
  );
}

export default SyncButton;

