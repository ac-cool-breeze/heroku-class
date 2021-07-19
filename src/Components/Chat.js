import React from 'react';
import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Cookies from 'js-cookie';
import ShadowScrollbars from './ShadowScrollbars'
import { fontSize } from '@material-ui/system';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    //height: '80vh'
  },
  messageRow:{
    
  },
  messageArea: {
    //height: '80vh',
    overflowY: 'auto'
  },
  lilMargin:{
      margin:"10px"
  },
  paper: {
      marginLeft: "10%",
      marginRight: "10%",
  },
  text:{
      fontSize: "10px",
      color: "#0091ea"
 }
});


const Chat = () => {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [send, setSend] = useState("")
  const [bottom, setBottom] = useState(-1)

  const scrollToBottom=()=>{
      document.getElementById('blank').scrollIntoView({ behavior: "smooth"})
  }

    function sendMessage(){
        // console.log("sending...")
        fetch('https://class-heroku-backend.herokuapp.com/messages/postmessage',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: Cookies.get('username'), message: send })
        })
        setSend("")
    }

  useEffect(() => {
    async function f(){
      //note when accessing from localhost: must have cors access-control-allow-origin response header set
      //this can be easily done with this extension: https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
      await fetch('https://class-heroku-backend.herokuapp.com/messages')
      .then(res => res.json())
      .then((d) => {
        setData(d)
      })
    }

    //console.log("id: " + data.id)
    if(data[data.length-1])
        if(bottom != data[data.length-1].id){
            scrollToBottom()
            setBottom(data[data.length-1].id)
        }

    const timeout = setTimeout(() => {
        f()
    }, 500);

  }, [data])

  return (
      <Paper elevation={3} className={classes.paper}>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    <ShadowScrollbars style={{ height: '80vh' }}>
                    {data.map((element) => (
                        <>
                      <ListItem className={classes.messageRow} dense>
                          <Grid container>



                              <Grid item xs={1}>
                                  <ListItemText align="left" secondary={
                                      <Typography variant="subtitle1" className={classes.text} >
                                          {element.name}
                                        </Typography>
                                      }></ListItemText>
                              </Grid>
                              
                              
                              <Grid item xs={9}><ListItemText align="left" primary={element.message}></ListItemText></Grid>

                              
                              <Grid item xs={2}>
                                  <ListItemText align="right" className={classes.text}>
                                    <Typography variant="subtitle1" className={classes.text} >
                                        {element.created_at}
                                    </Typography>
                                  </ListItemText>
                              </Grid>



                              {/* <Grid item xs={12}>
                                  <ListItemText align="left" primary={element.message}></ListItemText>
                              </Grid> */}




                          </Grid>
                      </ListItem>
                      <Divider />
                      </>
                     ))}
                     </ShadowScrollbars>
                     <ListItem id="blank"></ListItem>
                </List>
                <Divider />
                <Grid container>
                    <Grid item xs={11}>
                        <TextField label="Type Something" fullWidth 
                        value={send}
                        onChange={e => {setSend(e.target.value)}}
                        onKeyPress={e=>{
                            if(e.charCode===13){
                                sendMessage()
                            }
                        }}
                        className={classes.lilMargin}
                        />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" 
                        onClick={()=>{sendMessage()}} className={classes.lilMargin}>
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </Paper>
  );
}

export default Chat;