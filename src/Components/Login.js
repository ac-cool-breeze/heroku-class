import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Collapse from '@material-ui/core/Collapse';

const styles = {
    button:{
        margin: "8px",
        color: "#FFFFFF",
        width: "51%"
    }
}

const Login = () => {

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [signup, setSignUp] = React.useState(false);

    const Handler = (e) =>{
        e.preventDefault();
        if(signup){
            let requestOptions ={
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
                    if(res.status === 401){
                        setOpen3(true)
                        return console.log('invalid new user')
                    }
                    if(res.status === 200){
                        setOpen2(true)
                        return window.location.href = '/'
                    }
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
                    if(res.status === 401){
                        setOpen1(true)
                        return console.log('invalid credentials')
                    }
                    if(res.status === 200){
                        return window.location.href = '/'
                    }
                })
        }
    }

    return(
        <div>
            <Collapse in={open1}>
                <Alert severity="error" >Invalid Credentials</Alert>
            </Collapse>
            <Collapse in={open2}>
                <Alert severity="success" >Signed Up, you may now login</Alert>
            </Collapse>
            <Collapse in={open3}>
                <Alert severity="error" >Invalid New User (username likely taken)</Alert>
            </Collapse>
            <Grid container justify="center" >
                <form onSubmit={Handler}>
                    <Grid item xs={12}>
                        <TextField id="username" label="Username" />
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
            </Grid>
        </div>
    )
}

export default Login;