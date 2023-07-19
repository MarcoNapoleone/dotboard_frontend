import React from "react";
import {useTheme} from "@mui/material/styles";
import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
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
  title: string,
  subtitle: string,
  isLoading?: boolean,
  editMode?: boolean,
  onEdit?: () => void,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
  {
    title,
    subtitle,
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
      sx={{
        height: '100%',
        overflow: 'hidden',
        '&:hover': {
          overflowY: 'auto',
        },
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
        '&::-webkit-scrollbar': {
          width: 0,
          height: 0,
        },
      }}
    >
      {editMode
        && <Box sx={{position: 'absolute', top: '8px', right: '8px', zIndex: 1}}>
          <IconButton size="small" onClick={onEdit}>
            <EditOutlined/>
          </IconButton>
        </Box>}
        <CardContent>
          <Typography variant="h5" gutterBottom component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{__html:subtitle.replace(/\n/g, "<br/>")}}></Typography>
        </CardContent>
    </Card>
  )
}

export default TextBoardItem;