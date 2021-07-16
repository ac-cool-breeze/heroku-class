// import React from 'react';
// import {useState, useEffect} from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import Fab from '@material-ui/core/Fab';
// import SendIcon from '@material-ui/icons/Send';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   chatSection: {
//     width: '100%',
//     height: '80vh'
//   },
//   headBG: {
//       backgroundColor: '#e0e0e0'
//   },
//   borderRight500: {
//       borderRight: '1px solid #e0e0e0'
//   },
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });


// const App = () => {
//   const classes = useStyles();
//   const [data, setData] = useState([])

//   useEffect(() =>{
//     async function f(){
//       await fetch('https://class-heroku-backend.herokuapp.com/messages')
//       .then(res => res.json())
//       .then((data) => {
//         setData(data)
//       })
//       console.log("useEffect: " + data)
//     }

//     f()
//   }, [])

//   return (
//       <div>
//         <Grid container>
//             <Grid item xs={12} >
//                 <Typography variant="h5" className="header-message">Chat</Typography>
//             </Grid>
//         </Grid>
//         {/* Sidebar */}
//         <Grid container component={Paper} className={classes.chatSection}>
//             <Grid item xs={3} className={classes.borderRight500}>
//                 <List>
//                     <ListItem button key="AndrewPham">
//                         <ListItemIcon>
//                         <Avatar/>
//                         </ListItemIcon>
//                         <ListItemText primary="Andrew Pham"></ListItemText>
//                     </ListItem>
//                 </List>
//                 <Divider />
//                 <Grid item xs={12} style={{padding: '10px'}}>
//                     <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
//                 </Grid>
//                 <Divider />
//                 <List>
//                     <ListItem button key="AndrewPham">
//                         <ListItemIcon>
//                             <Avatar/>
//                         </ListItemIcon>
//                         <ListItemText primary="Andrew Pham">Andrew Pham</ListItemText>
//                         <ListItemText secondary="you" align="right"></ListItemText>
//                     </ListItem>
//                     <ListItem button key="AlexColter">
//                         <ListItemIcon>
//                             <Avatar/>
//                         </ListItemIcon>
//                         <ListItemText primary="Alex Colter">Alex Colter</ListItemText>
//                     </ListItem>
//                 </List>
//             </Grid>
//             {/* Messages */}
//             <Grid item xs={9}>
//                 <List className={classes.messageArea}>
//                     {data.map((element) => (
//                       <ListItem>
//                           <Grid container>
//                               <Grid item xs={12}>
//                                   <ListItemText align="right" primary={element.message}></ListItemText>
//                               </Grid>
//                               <Grid item xs={12}>
//                                   <ListItemText align="right" secondary={element.created_at}></ListItemText>
//                               </Grid>
//                           </Grid>
//                       </ListItem>
//                      ))}
//                 </List>
//                 <Divider />
//                 <Grid container style={{padding: '20px'}}>
//                     <Grid item xs={11}>
//                         <TextField id="outlined-basic-email" label="Type Something" fullWidth />
//                     </Grid>
//                     <Grid xs={1} align="right">
//                         <Fab color="primary" aria-label="add"><SendIcon /></Fab>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Grid>
//       </div>
//   );
// }

// export default App;


import './App.css';
import Login from './Components/Login'
import Chat from './chat'
import PrivateRoute from './PrivateRoute'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const isAuth = {
  isAuthenticated: false,
}

let conditionalRender = <Login />

function App() {

  const setAuth=()=>{
    if(Cookies.get('username')){
      isAuth.isAuthenticated = true
      conditionalRender =  <Chat />
    } else {
      isAuth.isAuthenticated = false
      conditionalRender =  <Login />
    }
  }

  setAuth()

  return (
    <>
      <Router>
       <Route path="/login"><Login /></Route>
      </Router>
      {conditionalRender}
    </>
  );
}

export default App;