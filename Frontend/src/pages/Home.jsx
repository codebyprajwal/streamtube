import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import  AddShoppingCartIcon  from '@mui/icons-material/AddShoppingCartOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import VideoPlayer from './VideoPlayer';
import { Grid } from '@mui/material';
import MediaCard from '../Components/Common/Card';
import axios from 'axios';
import { useQuery } from "react-query";
import { async } from 'regenerator-runtime';
import { useRef, useState } from "react";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const appId = 'b33eac7c-24bc-4812-95b6-e91cea215262';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const drawerWidth = 240;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  zIndex:1000,
  pt: 2,
  px: 4,
  pb: 3,
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



function Home() {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openModel, setModelOpen] = React.useState(false);
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const [click, setClick] = useState(true);
  const [search, setSearch] = useState("Science");
  const commands = [
    {
      command: "*",
      callback: (result) => {
        if (result.trim().length>0)
        window.location.href = `/search/${result}`; 
      },
    }
  ]
  
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const handleOpen = () => {
    setModelOpen(true);
  };
  const handleClose = () => {
    setModelOpen(false);
  };

  if (!playerRef.current) {

  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


const options = {
  method: 'GET',
  url: `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${search}`,
  params: {
      maxResults: 100,
    },
  headers: {
    'X-RapidAPI-Key': 'a2230a8303mshde8a8f5f71d3cb2p1ba868jsn1aa10cceb3e4',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};


const getData = async () => {
      const response = await axios.request(options);
      return response.data.items;
}

const {data, status} = useQuery("video-data", getData)

if (status == "loading")
  return <h1>Loading....</h1>

if (status == "error")
  return <h1>Error</h1>

  
  // Recording 


      document.addEventListener('keydown', function(event){
        if (event.code == "Space") {
          handleOpen();
          if (isListening) {
            stopHandle();
          } else {
            handleListing()
          }
        }
      }
    )

      
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
          <div className="mircophone-container">
            Browser is not Support Speech Recognition.
          </div>
        );
      }
      const handleListing = () => {
        setIsListening(true);
        // microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
          continuous: false,
        });
      };
      const stopHandle = () => {
        setIsListening(false);
        // microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
        console.log("done")
      };
      const handleReset = () => {
        stopHandle();
        resetTranscript();
      };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" noWrap component="div">
            Streamtube
          </Typography>
          <IconButton color="primary" aria-label="add to shopping cart">
  <AddShoppingCartIcon />
</IconButton>
        </Toolbar>
      </AppBar>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={openModel}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          
        <div className="microphone-wrapper">
            <div className="mircophone-container">
              <div className="microphone-status"  style={{  textAlign : "center", fontWeight : "600", fontSize:"2rem" }}>
                {isListening ? "Listening..." : ""}
              </div>
            </div>
            {transcript && (
              <div className="microphone-result-container" style={{ height: "70px", textAlign : "center", marginTop:"10px", textTransform:"capitalize", fontSize:"1.3rem" }}>
                <div className="microphone-result-text" >Result: {transcript}</div>
   
              </div>
            )}
          </div>
        </Box>
      </Modal>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
                  data.map((values, index) => (
                        <Grid item  xs={3} key={index}>
                              <MediaCard data={values} />
                        </Grid>
                  ))
            }
      </Grid>
      </Box>
    </Box>
  );
}


export default Home;