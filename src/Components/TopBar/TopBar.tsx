import React, {useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {useTheme} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/SearchRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuItem from '@mui/material/MenuItem';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Card,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputBase,
  ListItemIcon,
  ListItemText, makeStyles,
  Menu,
  Slide,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  Zoom
} from "@mui/material";
import {AccountCircleOutlined, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Providers/Authorization/Authorization.provider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {deleteCookie, getCookie, setCookie} from "../../services/connectors/cookies";
import {getReasonAlert} from "../../utils/requestAlertHandler";
import {useAlert} from "../Providers/Alert/Alert.provider";
import {Id} from "../../entities/entities";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import jwt_decode from "jwt-decode";
import {getUserByUsername} from "../../services/users.services";

const SearchBar = () => {
  let textInput = useRef(null);
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.text.secondary, 0.10),
        transition: 'all 0.5s ease',
        '&:hover': {
          backgroundColor: alpha(theme.palette.text.secondary, 0.15),
        }
      }}
    >
      <ButtonBase onClick={() => {
        setTimeout(() => { // @ts-ignore
          textInput.current.focus()
        }, 100)
      }}>
        <Container>
          <Grid container alignItems="center">
            <Grid item>
              <InputBase
                placeholder="Search…"
                inputRef={textInput}
                fullWidth
                endAdornment={
                  <SearchIcon/>
                }
                inputProps={{'aria-label': 'search'}}
              />
            </Grid>
          </Grid>
        </Container>
      </ButtonBase>
    </Card>
  );
}

type TopBarProps = {
  onMenuClick: () => void,
  isOpen: boolean,
  title?: string,
}

const TopBar: React.FC<TopBarProps> = ({onMenuClick, isOpen, title}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"))
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {loggedUser, setLoggedUser} = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElCompany, setAnchorElCompany] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorElUser);
  const {setAlertEvent} = useAlert();
  const openCompanyMenu = Boolean(anchorElCompany);

  const fetchUser = async () => {
    const token = getCookie("token");

    const decoded: any = jwt_decode(token)
    const _user = await getUserByUsername(decoded?.sub)
    setLoggedUser(_user)
  }

  const logout = async () => {
    deleteCookie("token")
    navigate("/login")
    setLoggedUser(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    setLoading(true)
    fetchUser()
      .then(r => setLoading(false))
      .catch(err => {
        setLoading(false)
        setAlertEvent(getReasonAlert(err));
      })
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const trigger = useScrollTrigger(
    {
      disableHysteresis: true,
      threshold: 20,
    }
  );

  return (
    <>
      <Slide
        in={!trigger}
        direction="down"
        style={{transitionDuration: '200ms'}}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          py={2} px={2}
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            background: `linear-gradient(180deg, ${theme.palette.background.default}, #00000000)`,
            zIndex: theme => theme.zIndex.appBar,
          }}
        >
          <Grid item xs={6} container justifyContent="flex-start" alignItems="center" spacing={2}>
            <Grid item>
              <Zoom in={!isOpen} style={{transitionDelay: '200ms'}}>
                <IconButton
                  sx={{borderRadius: '8px'}}
                  size="small"
                  value="check"
                  onClick={onMenuClick}
                >
                  <MenuOutlinedIcon/>
                </IconButton>
              </Zoom>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
              <Grid item>
                {isMobile
                  ? <Tooltip TransitionComponent={Zoom} title="Cerca" arrow>
                    <IconButton onClick={() => {
                    }}>
                      <SearchIcon/>
                    </IconButton>
                  </Tooltip>
                  : <SearchBar/>
                }
              </Grid>
              <Grid item>
                {isMobile &&
                  <Tooltip TransitionComponent={Zoom} title="Aziende" arrow>
                    <IconButton >
                      <MoreVertOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                }
              </Grid>
              <Grid item>
                <IconButton sx={{borderRadius: '16px'}} disableRipple>
                  <Badge variant="dot" overlap="rectangular" color="secondary">
                    <Avatar variant="rounded" sx={{borderRadius: '8px'}} onClick={handleOpenUserMenu}
                            alt="User profile picture"
                            src="https://mui.com/static/images/avatar/1.jpg"/>
                  </Badge>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Slide>
      <Menu
        anchorEl={anchorElUser}
        open={openUserMenu}
        onClose={handleCloseUserMenu}
        TransitionComponent={Zoom}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >{
        loading
          ? <Stack sx={{width: '194px', height: '164px'}} justifyContent="center" alignItems="center" px={2}>
            <CircularProgress size={32}/>
          </Stack>
          : <Box>
            <MenuItem key={1} onClick={() => navigate('/Account')}>
              <ListItemIcon>
                <AccountCircleOutlined
                  fontSize="small"/>
              </ListItemIcon>
              <ListItemText>{loggedUser?.username}</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <NotificationsOutlinedIcon/>
              </ListItemIcon>
              <ListItemText>Notifications</ListItemText>
            </MenuItem>
            <Divider/>
            <MenuItem key={3} onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small"/>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
      }
      </Menu>
    </>
  );
};


export default TopBar;