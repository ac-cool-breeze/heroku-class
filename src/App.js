import './App.css';
import Login from './Components/Login'
import Chat from './Components/Chat'
import PrivateRoute from './PrivateRoute'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
    "palette": {
      type: 'dark',
      primary: {
        main: "rgba(0, 0, 0, 0.26)",
        contrastText: "#0091ea",
      },
      secondary: {
        main: "#0091ea"
      },
      typography: {
        subtitle1: {
          fontSize: 10,
      }},
      primary1Color: "rgba(0, 0, 0, 0.26)",
      accent2Color: "#0091ea",
      accent1Color: "#0091ea",
      accent3Color: "#0091ea",
      primary3Color: "#0091ea",
  }
})

const isAuth = {
  //isAuthenticated: true,  //DEV
  isAuthenticated: false,   //PRODUCTION

}

//let conditionalRender = <Chat />  //DEV
let conditionalRender = <Login/> //PRODUCTION

function App() {

  const setAuth=()=>{
    if(Cookies.get('username')){
      isAuth.isAuthenticated = true
      conditionalRender =  <Chat/>
    } else {
      isAuth.isAuthenticated = false
      conditionalRender =  <Login/>
    }
  }

  setAuth()   //PRODUCTION

  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
       <Route path="/login"><Login /></Route>
      </Router>
      {conditionalRender}
    </ThemeProvider>
    </>
  );
}

export default App;