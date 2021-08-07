import React, { useState } from "react";
import clsx from "clsx";
import logo from "../img/logo.svg";
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
  Tooltip,
} from "@material-ui/core";
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
  LocalCarWash,
  LocalCarWashOutlined,
  BarChart,
  BarChartOutlined,
  ExitToAppOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  titleMM: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "20pt",
    fontWeight: "bold",
    lineHeight: "28px",
    display: "flex",
    color: "#199479",
  },
  sucursalTitle: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "15pt",
    fontWeight: "bold",
    lineHeight: "8px",
    color: "#787878",
    position: "fixed",
    right: "0",
    marginRight: "10pt",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff",
  },
  appBarShift: {
    marginLeft: drawerWidth,
  },
  menuButton: {
    color: "#787878",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    "@global": {
      "*::-webkit-scrollbar": {
        width: "0pt",
      },
      "*::-webkit-scrollbar-thumb:active": {
        backgroundColor: "transparent",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
        borderRadius: "5px",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "transparent",
        boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.2)",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
        borderRadius: "5px",
      },
      "*::-webkit-scrollbar-track:hover , body::-webkit-scrollbar-track:active":
        {
          backgroundColor: "transparent",
        },
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  logoDrawer: {
    width: "40pt",
    height: "40pt",
    marginLeft: "20pt",
  },
  content: {
    flexGrow: 1,
  },
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  iconDrawer: {
    marginLeft: "5pt",
    color: "#787878",
  },
  drawerList: {
    marginTop: "6pt",
  },
  iconDrawerSelect: {
    marginLeft: "5pt",
    color: "#199479",
  },
  pageSelectedText: {
    color: "#199479",
  },
  pageText: {
    color: "#787878",
  },
  separator: {
    width: "50%",
  },
  exitText: {
    color: "#EE6754",
  },
  exitIcon: {
    marginLeft: "5pt",
    color: "#EE6754",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const user = useUser();

  const handleStateDrawer = () => {
    setOpen(!open);
  };

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
          <img className={classes.logoDrawer} src={logo} alt="logo" />
          <h1 className={classes.titleMM}>MULTISERVICIOS MUNDIAL</h1>
          <div className={classes.separator} />
          {user.rifSucursal && (
            <h4 className={classes.sucursalTitle}>{user.nombreSucursal}</h4>
          )}
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
          {props.page === "inicio" ? (
            <Tooltip title="Inicio">
              <ListItem button selected>
                <ListItemIcon>
                  <Home className={classes.iconDrawerSelect} />
                </ListItemIcon>
                <ListItemText
                  primary="Inicio"
                  className={classes.pageSelectedText}
                />
              </ListItem>
            </Tooltip>
          ) : (
            <Tooltip title="Inicio">
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeOutlined className={classes.iconDrawer} />
                </ListItemIcon>
                <ListItemText primary="Inicio" className={classes.pageText} />
              </ListItem>
            </Tooltip>
          )}
          {user.rifSucursal && (
            <div>
              {props.page === "estadisticas" ? (
                <Tooltip title="Estadísticas">
                  <ListItem button selected>
                    <ListItemIcon>
                      <BarChart className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Estadísticas"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Estadísticas">
                  <ListItem button component={Link} to="/estadisticas">
                    <ListItemIcon>
                      <BarChartOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Estadísticas"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "solicitudes" ? (
                <Tooltip title="Solicitudes de servicio">
                  <ListItem button selected>
                    <ListItemIcon>
                      <LocalCarWash className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Solicitudes de servicio"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Solicitudes de servicio">
                  <ListItem button component={Link} to="/solicitudes">
                    <ListItemIcon>
                      <LocalCarWashOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Solicitudes de servicio"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "facturas" ? (
                <Tooltip title="Facturas">
                  <ListItem button selected>
                    <ListItemIcon>
                      <MonetizationOn className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Facturas"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Facturas">
                  <ListItem button component={Link} to="/facturas">
                    <ListItemIcon>
                      <MonetizationOnOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Facturas"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "servicios" ? (
                <Tooltip title="Servicios">
                  <ListItem button selected>
                    <ListItemIcon>
                      <Build className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Servicios"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Servicios">
                  <ListItem button component={Link} to="/servicios">
                    <ListItemIcon>
                      <BuildOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Servicios"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "clientes" ? (
                <Tooltip title="Clientes">
                  <ListItem button selected>
                    <ListItemIcon>
                      <Group className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Clientes"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Clientes">
                  <ListItem button component={Link} to="/clientes">
                    <ListItemIcon>
                      <GroupOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Clientes"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "vehiculos" ? (
                <Tooltip title="Vehículos">
                  <ListItem button selected>
                    <ListItemIcon>
                      <DirectionsCar className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Vehículos"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Vehículos">
                  <ListItem button component={Link} to="/vehiculos">
                    <ListItemIcon>
                      <DirectionsCarOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Vehículos"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "reservaciones" ? (
                <Tooltip title="Reservaciones">
                  <ListItem button selected>
                    <ListItemIcon>
                      <CalendarToday className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Reservaciones"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Reservaciones">
                  <ListItem button component={Link} to="/reservaciones">
                    <ListItemIcon>
                      <CalendarTodayOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Reservaciones"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "personal" ? (
                <Tooltip title="Personal">
                  <ListItem button selected>
                    <ListItemIcon>
                      <PermContactCalendar
                        className={classes.iconDrawerSelect}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Personal"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Personal">
                  <ListItem button component={Link} to="/personal">
                    <ListItemIcon>
                      <PermContactCalendarOutlined
                        className={classes.iconDrawer}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Personal"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "inventario" ? (
                <Tooltip title="Inventario">
                  <ListItem button selected>
                    <ListItemIcon>
                      <Assignment className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Inventario"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Inventario">
                  <ListItem button component={Link} to="/inventario">
                    <ListItemIcon>
                      <AssignmentOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Inventario"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "tienda" ? (
                <Tooltip title="Tienda">
                  <ListItem button selected>
                    <ListItemIcon>
                      <LocalGroceryStore className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Tienda"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Tienda">
                  <ListItem button component={Link} to="/tienda">
                    <ListItemIcon>
                      <LocalGroceryStoreOutlined
                        className={classes.iconDrawer}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Tienda"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
              {props.page === "proveedores" ? (
                <Tooltip title="Proveedores">
                  <ListItem button selected>
                    <ListItemIcon>
                      <Work className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Proveedores"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Proveedores">
                  <ListItem button component={Link} to="/proveedores">
                    <ListItemIcon>
                      <WorkOutlineOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Proveedores"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
            </div>
          )}
          {user.tipoEmpleado === "dueño" && (
            <div>
              {props.page === "sucursales" ? (
                <Tooltip title="Sucursales">
                  <ListItem button selected>
                    <ListItemIcon>
                      <Store className={classes.iconDrawerSelect} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sucursales"
                      className={classes.pageSelectedText}
                    />
                  </ListItem>
                </Tooltip>
              ) : (
                <Tooltip title="Sucursales">
                  <ListItem button component={Link} to="/sucursales">
                    <ListItemIcon>
                      <StoreOutlined className={classes.iconDrawer} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Sucursales"
                      className={classes.pageText}
                    />
                  </ListItem>
                </Tooltip>
              )}
            </div>
          )}
          <Tooltip title="Cerrar Sesión">
            <ListItem
              button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              <ListItemIcon>
                <ExitToAppOutlined className={classes.exitIcon} />
              </ListItemIcon>
              <ListItemText
                primary="Cerrar Sesión"
                className={classes.exitText}
              />
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    </div>
  );
}
