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

    const [open, setOpen] = React.useState(false);

    const Handler = (e) =>{
        console.log("hello world")
        console.log(e.target.username.value)
        e.preventDefault();
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
                    setOpen(true)
                    return console.log('invalid credentials')
                }
                if(res.status === 200){
                    return window.location.href = '/'
                }
            })
    }

    return(
        <div>
            <Collapse in={open}>
                <Alert severity="error" >Invalid Credentials</Alert>
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
                        <Button  id="sign-in" variant="contained" color="primary" type="submit" style={styles.button}>Sign In</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button  id="sign-up" variant="contained" color="secondary" href="/signup" style={styles.button}>Sign Up</Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default Login;