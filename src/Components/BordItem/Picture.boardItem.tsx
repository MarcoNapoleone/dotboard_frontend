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
  Grid,
  Skeleton,
  Typography
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {getFormattedDate} from "../../utils/dateHandler";
import {Board} from "../../services/boards.services";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BaseBoardItem from "./Base.boardItem";

type CompanyCardProps = {
  caption: string,
  picture: string,
  isLoading?: boolean,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
    {
      picture,
      caption,
      isLoading,
      onClick
    }
) => {

  const theme = useTheme();

  return (
      <BaseBoardItem
          isLoading={isLoading}
          children={
            <CardMedia
                //component="img"
                image={picture}
                sx={{height: 50}}
                title={caption}
            />
          }
          usePadding={false}
          onClick={onClick}/>
  )
}

export default TextBoardItem;