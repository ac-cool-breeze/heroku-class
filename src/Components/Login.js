import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert'; //only works on edge...
import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import { Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

const styles = {
    button:{
        margin: "8px",
        color: "#FFFFFF",
        width: "51%"
    },
    paper:{
        width:"50%",
        margin:"20px",
        display: "flex"
    },
    form:{
        margin:"auto",
        justify: "center"
    },
    img:{
        width:"auto",
        height: "150px"
    },
    alignItemsAndJustifyContent: {
        width: 500,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
      },
}

const Login = () => {

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [signup, setSignUp] = React.useState(false);

    const Handler = (e) =>{
        e.preventDefault();
        if(signup){
            let requestOptions = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: e.target.username.value,
                    password: e.target.password.value
                })
            }
            fetch('http://backend.ionizing.space/users/newuser', requestOptions)
                .then( res=>{
                    console.log(res)
                    if(res.status === 500){
                        setOpen3(true)
                        return console.log('invalid new user')
                    }
                    if(res.status === 200)
                        setOpen2(true)
                })
        }else{
            let requestOptions ={
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: e.target.username.value,
                    password: e.target.password.value
                })
            }
            fetch('http://backend.ionizing.space/users/login', requestOptions)
                .then( res=>{
                    console.log(res)
                    if(res.status === 502){
                        setOpen1(true)
                        return console.log('invalid credentials')
                    }
                    if(res.status === 200)
                        return window.location.href = '/'
                })
        }
    }

    return(
        <div>
            <Collapse in={open1}>
                <Alert 
                severity="error"
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen1(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                    Invalid Credentials
                </Alert>
            </Collapse>
            <Collapse in={open2}>
                <Alert 
                severity="success" 
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen2(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                    Signed Up, you may now login
                </Alert>
            </Collapse>
            <Collapse in={open3}>
                <Alert 
                severity="error"
                action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen3(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  } 
                >
                    Invalid New User (username likely taken)
                </Alert>
            </Collapse>
            <Grid container justify="center" >
                <Paper style={styles.paper}>
                    <form onSubmit={Handler} style={styles.form}>
                        <Grid item xs={12}>
                            <img alt="unsecure chat logo" src="logo.png" style={styles.img}></img>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="username" label="Username"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="password" type="password" label="Password" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button  id="sign-in" variant="contained" color="primary" type="submit" style={styles.button} onClick={()=>setSignUp(false)}>Sign In</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button  id="sign-up" variant="contained" color="secondary" type="submit" style={styles.button} onClick={()=>setSignUp(true)}>Sign Up</Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

        </div>
    )
}

export default Login;