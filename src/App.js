import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ChartsTrial from "./components/ChartsTrial";

toast.configure();

function App(props) {
  const {isAuthenticated, token} = props;

  const checkAuthenticated = async () => {
    // console.log("jwtToken : ", token);
    if(isAuthenticated){
      try {
        const parseRes = (await axios.post("/authentication/verify")).data
        
      } catch (err) {
        console.error(err.message);

      }
    }
  };


const getCSRFToken =async () => {
  const response = await axios.get('/getCSRFToken');
  console.log("In app.js", response.data.CSRFToken);
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
  
  checkAuthenticated();
};


useEffect(() => {
  getCSRFToken();
  }, []);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setAuth = boolean => {
  //   setIsAuthenticated(boolean);
  // };


  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props}  /> // {..props for convernience}
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...[props]}/>
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} />
                  // <ChartsTrial {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isLoggedIn
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     register: (inputs, history) => {
//       // dispatch()
//       // console.log(inputs);
//       dispatch(RegisterAuthAction(inputs, history))
//     }
//   }
// }

export default connect(mapStateToProps)(App);

// export default App;

