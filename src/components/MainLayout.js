import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Avatar, Badge, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../images/roselogo.png";
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircle from "@mui/icons-material/AccountCircle";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AppRoute from "../AppRoutes/AppRoute";
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create("margin", {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginLeft: 0,
                },
            },
        ],
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: "center",
}));
const MainLayout = () => {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const theme = useTheme();
    const [open, setOpen] = useState(true);
    useEffect(() => {
        setSelectedIndex(0);
        navigate(items[0].path);
    }, []);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const items = [
        {
            text: "Checklist",
            icon: <ChecklistIcon />,
            path: "/checklist"
        },
        {
            text: "Classes",
            icon: <EventNoteIcon />,
            path: "/classes"
        },
        {
            text: "Live Events",
            icon: <CalendarTodayIcon />,
            path: "/live-events"
        },
        {
            text: "$10k Month Bootcamp",
            icon: <PlayArrowOutlinedIcon />,
            path: "/10k-month-bootcamp"
        },
        {
            text: "$10k Month Checklist",
            icon: <AdUnitsIcon />,
            path: "/10k-month-checklist"
        },
        {
            text: "Work With Us 1:1",
            icon: <PeopleAltOutlinedIcon />,
            path: "/work-with-us-1-1"
        },
        {
            text: "Share your Wins",
            icon: <StarBorderPurple500OutlinedIcon />,
            path: "/share-your-wins"
        },
        {
            text: "Get the FEA App",
            icon: <FavoriteBorderOutlinedIcon />,
            path: "/get-the-fea-app"
        },
        {
            text: "FEA Create",
            icon: <EditCalendarOutlinedIcon />,
            path: "/fea-create"
        }
    ];
    const handleItemClick = (index, path) => {
        setSelectedIndex(index); // Set selected index
        navigate(path); // Navigate to the selected item's path
    };

    const pages = ["LEARN", "MINGLE", "option"];
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    sx={{ backgroundColor: "#FDFDFD" }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: "none" },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page}>
                                        <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                //   onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                sx={{ display: { xs: "block", md: "none" } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page}>
                                        <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages.map((page) => (
                                <Button key={page} sx={{ color: "#000000" }}>
                                    {page}
                                    <KeyboardArrowDownIcon />
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Badge color="error">
                                    <MailIcon sx={{ color: "black" }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <Badge color="error">
                                    <NotificationsIcon sx={{ color: "black" }} />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle sx={{ color: "black" }} />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            background: "linear-gradient(180deg, #F4DBDB 30%, #E1B7B7 100%)",
                            boxSizing: "border-box",
                            padding: "16px",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <img src={logo} alt="logo" width="100%" height="auto" />
                    <List>
                        {items.map((item, index) => (
                            <Link to={item.path} style={{ textDecoration: 'none' }}>
                                <ListItem key={index} disablePadding >
                                    <ListItemButton onClick={() => handleItemClick(index, item.path)} sx={{
                                        '&:hover': {
                                            background: "#DCAE96", borderRadius: "10px"
                                        },
                                        background: selectedIndex === index ? "#DCAE96" : "transparent", borderRadius: selectedIndex === index ? "10px" : ""

                                    }}>
                                        <ListItemIcon sx={{ minWidth: "35px !important" }}>{item.icon}</ListItemIcon>
                                        <Typography className="menu-item" >{item.text}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />


                    <AppRoute />

                </Main>
            </Box >

        </>
    );
};

export default MainLayout;
