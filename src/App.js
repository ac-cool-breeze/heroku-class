import './App.css';
import Login from './Login'
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