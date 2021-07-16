import { Route } from "react-router"
import { Redirect } from "react-router"

function PrivateRoute({ children, isAuth, ...rest }) {
    return (
      <Route {...rest} render={({ location }) => {
        return isAuth.isAuthenticated === true
          ? children
          : <Redirect to={{
              pathname: '/login',
              state: { from: location }
            }}
   />
      }} />
    )
  }

  export default PrivateRoute