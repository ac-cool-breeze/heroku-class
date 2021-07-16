import './App.css';
import Login from './login'
import Chat from './chat'
import PrivateRoute from './PrivateRoute'
import Cookies from 'js-cookie'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const isAuth = {
  isAuthenticated: false,
}

let route = <Route path="/login" component={login}><Login /></Route>

function App() {


  const setAuth=()=>{
    if(Cookies.get('username')){
      isAuth.isAuthenticated = true
      route =  <Route path="/chat"><Chat /></Route>
    } else {
      isAuth.isAuthenticated = false
      route =  <Route path="/login"><Login /></Route>
    }
  }

  setAuth()

  return (
    <>
      <Router>
        {route}
      </Router>
    </>
  );
}

export default App;