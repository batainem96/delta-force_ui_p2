import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Principal } from '../dtos/principal';
import { logout } from '../remote/auth-service';

import { alpha, makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Drawer, Divider, List, ListItem, ListItemText, Button, TextField, ListItemSecondaryAction } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ArticleQuery } from '../models/acticle-query';
import { addFavorite, removeFavorite } from '../remote/user-service';


interface INavbarProps {
  currentUser: Principal | undefined,
  setCurrentUser: (nextUser: Principal | undefined) => void,

  searchQuery: ArticleQuery | undefined,
  setSearchQuery: (nextQuery: ArticleQuery | undefined) => void
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'white'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      favoriteButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
      },
  }),
);

export default function PrimarySearchAppBar(props: INavbarProps) {
  const classes = useStyles();

  // For adding user faves
  const [faveData, setFaveData] = useState({
    topic:''
  });

  async function updateFavorites() {
    if(!faveData.topic)
    {
      console.log("it's blank");
    }

    try{
      if(props.currentUser?.id){
        await addFavorite(props.currentUser?.id,faveData.topic);
        userFaves?userFaves.push(faveData.topic): console.log('aw geez');
      }else{
        console.log("User shouldn't have access to this function if the ID is null, but TS is finicky.");
      }

    }catch(e :any){
      console.log(e);
    }
  }

  async function removeFave(favorite : String){
    try{
      if(props.currentUser?.id){
        await removeFavorite(props.currentUser?.id, favorite);

        let index = userFaves?.indexOf(favorite);
        if(index != undefined){
          userFaves?userFaves.splice(index, 1):console.log('aw geez');
        }

      }else{
        console.log("User shouldn't have access to this function if the ID is null, but TS is finicky.");
      }
    }catch(e:any){
      console.log(e);
    }
  }

  let handleChange = ( e: any) =>{
    const {name, value} = e.target;
    setFaveData({...faveData, [name]: value});
  }

  // For sidebar
  const userFaves: String[] | undefined = props.currentUser?.favTopics;
  const articleCategories: string[] = ['Business','Entertainment','General','Health','Science','Sports','Technology'];

  // For sidebar and search bar
  function setQuery(queryType: string, query: string){
    let articleQuery = {queryType: queryType, query: query};
    console.log(articleQuery);
    props.setSearchQuery(articleQuery);
  }

  // For logging out :)
  function doLogout() {
        logout(props.setCurrentUser);
    }

  // For user profile button
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // For Drawer/Hamburger Sidebar
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {props.currentUser? // If User is logged in display these options.
      <div>
        {props.currentUser.role==='admin'?
        <MenuItem component={Link} to={'/admin-dashboard'} onClick={handleMenuClose}>Admin Dashboard</MenuItem>:
        <></>}
        <MenuItem component={Link} to={'/userProfile'} onClick={handleMenuClose}>My Profile</MenuItem>
        <MenuItem component={Link} to={'/'} onClick={() =>{doLogout(); handleMenuClose();}}>Log out</MenuItem>
      </div>
      :                   // If User is not logged in, display these options.
      <div>
        <MenuItem component={Link} to={'/login'}onClick={handleMenuClose}>Login</MenuItem>
        <MenuItem component={Link} to={'/register'} onClick={handleMenuClose}>Register</MenuItem>
      </div>
    }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap
          component={Link} to={'/dashboard'}
          >
            DeltaForce News
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          <Typography variant='h6' align='center'>
              Saved Topics
          </Typography>
        <Divider />
        <List>
          {userFaves? userFaves.map((text, index) => (
            <>
              <ListItem button onClick={() =>{setQuery('search',`${text}`)}} key={index}>
                <ListItemText primary={text} />
                <ListItemSecondaryAction>
                  <Button onClick={() => {removeFave(text)}}>x</Button>
                </ListItemSecondaryAction>
              </ListItem>
            </>
          ))
          : 
          <Typography variant="subtitle2" align="center">Sign in to access saved topics!</Typography>
          }
        </List>
        <TextField id="topic-input" label="New Favorite" name="topic" type="text" onChange={handleChange}/>
          <br/>
          <Button
            id="topic-button"
            onClick={updateFavorites}
            variant="contained"
            color="primary"
            size="small"
            >Add Favorite</Button>
            <br/>
        <Divider />
          <Typography variant='h6' align='center'>
              Top Articles
          </Typography>
        <Divider />
        <List>
          {articleCategories.map((text, index) => (
            <ListItem button onClick={() =>{setQuery('category',`${text}`)}} key={index}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      {renderMenu}
      </main>
    </div>
  );
}
