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
  title: string,
  caption: string,
  isLoading?: boolean,
  onClick?: () => void
}

const TextBoardItem: React.FC<CompanyCardProps> = (
    {
      title,
      caption,
      isLoading,
      onClick
    }
) => {

  const theme = useTheme();

  return (
      <BaseBoardItem
          isLoading={isLoading}
          onClick={onClick}
          children={
            <Container>
              <Typography gutterBottom variant="h4" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {caption}
              </Typography>
            </Container>
          }
      />
  )
}

export default TextBoardItem;