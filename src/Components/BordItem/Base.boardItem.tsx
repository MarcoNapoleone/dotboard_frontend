import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip, CircularProgress,
  Container,
  Grid,
  Skeleton,
  Typography, Zoom
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Avatar from "@mui/material/Avatar";

type BaseItemProps = {
  //react component props
  children?: React.ReactNode,
  isLoading?: boolean;
  onClick?: () => void;
  usePadding?: boolean;
  editMode?: boolean;
}

const BaseBoardItem: React.FC<BaseItemProps> = (
    {
      children,
      isLoading,
      onClick,
      usePadding = true,
      editMode
    }
) => {

  const theme = useTheme();

  return (
      <div>
        {isLoading
            ? <Skeleton variant="rectangular" width="100%" animation="wave" sx={{borderRadius: '16px'}}>

            </Skeleton>
            : <Card variant="outlined">
              <CardActionArea onClick={onClick} disableRipple={!Boolean(onClick)}>
                {usePadding
                    ? <CardContent>
                      {children}
                    </CardContent>
                    : children
                }
              </CardActionArea>
            </Card>
        }
      </div>
  )
}

export default BaseBoardItem;