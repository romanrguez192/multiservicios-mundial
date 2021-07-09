import React, {useState} from 'react';
import clsx from 'clsx';
import logo from '../img/logo.svg';
import {
  makeStyles,
  useTheme,
  Drawer,
  AppBar,
  List,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import {
  MenuOutlined,
  HomeOutlined,
  Home,
  MonetizationOnOutlined,
  MonetizationOn,
  BuildOutlined,
  Build,
  GroupOutlined,
  Group,
  DirectionsCar,
  DirectionsCarOutlined,
  CalendarToday,
  CalendarTodayOutlined,
  PermContactCalendar,
  PermContactCalendarOutlined,
  Assignment,
  AssignmentOutlined,
  Store,
  StoreOutlined,
  LocalGroceryStore,
  LocalGroceryStoreOutlined,
  Work,
  WorkOutlineOutlined,
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  titleMM: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '20pt',
    fontWeight: 'bold',
    lineHeight: '16px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#199479',
},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
  },
  appBarShift: {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: 36,
    color: '#787878'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  logoDrawer: {
    width: '40pt',
    height: '40pt',
    marginLeft: '20pt',
  },
  content: {
    flexGrow: 1,
  },
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  iconDrawer: {
    marginLeft: '5pt',
    color: '#787878',
  },
  drawerList: {
    marginTop: '6pt',
  },
  iconDrawerSelect: {
    marginLeft: '5pt',
    color: '#199479',
  },
  pageSelectedText: {
    color: '#199479',
  },
  pageText: {
    color: '#787878',
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleStateDrawer = () => {
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleStateDrawer}
            edge="start"
            className={classes.menuButton}
          >
            <MenuOutlined />
          </IconButton>
          <img className={classes.logoDrawer} src={logo} alt="logo"/>
          <Typography className={classes.titleMM}>
            MULTISERVICIOS MUNDIAL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleStateDrawer}>
            <MenuOutlined />
          </IconButton>
        </div>
        <List className={classes.drawerList}>
          {props.page==="inicio" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Home className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Inicio" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <HomeOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Inicio" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="facturas" ? 
            <ListItem button selected>
              <ListItemIcon>
                <MonetizationOn className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Facturas" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <MonetizationOnOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Facturas" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="servicios" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Build className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Servicios" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <BuildOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Servicios" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="clientes" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Group className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Clientes" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <GroupOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Clientes" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="vehiculos" ? 
            <ListItem button selected>
              <ListItemIcon>
                <DirectionsCar className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Vehículos" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <DirectionsCarOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Vehículos" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="reservaciones" ? 
            <ListItem button selected>
              <ListItemIcon>
                <CalendarToday className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Reservaciones" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <CalendarTodayOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Reservaciones" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="personal" ? 
            <ListItem button selected>
              <ListItemIcon>
                <PermContactCalendar className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Personal" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <PermContactCalendarOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Personal" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="inventario" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Assignment className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Inventario" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <AssignmentOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Inventario" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="sucursales" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Store className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Sucursales" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <StoreOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Sucursales" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="tienda" ? 
            <ListItem button selected>
              <ListItemIcon>
                <LocalGroceryStore className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Tienda" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <LocalGroceryStoreOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Tienda" className={classes.pageText}/>
            </ListItem>
          }
          {props.page==="proveedores" ? 
            <ListItem button selected>
              <ListItemIcon>
                <Work className={classes.iconDrawerSelect}/>
              </ListItemIcon>
              <ListItemText primary="Proveedores" className={classes.pageSelectedText}/>
            </ListItem>
            :
            <ListItem button>
              <ListItemIcon>
                <WorkOutlineOutlined className={classes.iconDrawer}/>
              </ListItemIcon>
              <ListItemText primary="Proveedores" className={classes.pageText}/>
            </ListItem>
          }
        </List>
      </Drawer>
    </div>
  );
}