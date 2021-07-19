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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    //height: '80vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
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
        //console.log("id:",d[d.length-1].id)
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
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Chat</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    {data.map((element) => (
                        <>
                      <ListItem>
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary={element.created_at}></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary={element.name}></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" primary={element.message}></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <Divider />
                      </>
                     ))}
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
                        />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" 
                        onClick={()=>{sendMessage()}}>
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default Chat;