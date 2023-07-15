import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent, CardMedia,
  Chip,
  Container,
  Grid, IconButton,
  Skeleton,
  Typography
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BaseBoardItem from "./Base.boardItem";
import {EditOutlined} from "@mui/icons-material";

type CompanyCardProps = {
  src?: string,
  title?: string,
  isLoading?: boolean,
  editMode?: boolean,
  onEdit?: () => void,
  onClick?: () => void
}

const IframeBoardItem: React.FC<CompanyCardProps> = (
  {
    src,
    title,
    isLoading,
    editMode,
    onEdit,
    onClick
  }
) => {

  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{height: '100%'}}
    >
      {editMode
        && <Box sx={{position: 'absolute', top: '8px', right: '8px', zIndex: 1}}>
          <IconButton size="small" onClick={onEdit}>
            <EditOutlined/>
          </IconButton>
        </Box>}
      <CardActionArea
        sx={{
          height: '100%',
        }}
        onClick={onClick}
        disabled={!Boolean(onClick) || editMode}
        disableRipple={!Boolean(onClick) || editMode}
      >
        <iframe
          height={'100%'}
          width={'100%'}
          style={{border: 'none'}}
          src={src} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen/>
      </CardActionArea>
    </Card>
  )
}

export default IframeBoardItem;