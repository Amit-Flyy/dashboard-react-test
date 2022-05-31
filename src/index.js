import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"
// // using redux for now, move to redux toolkit
// import {createStore} from 'redux';

// //STORE -> globalizd state (jwt token)

// //ACTION authorize
// const authorize = async () => {
//     return {
//         type: 'AUTHORIZE'
//     }
// }

// //REDUCER

// //DISPATCH

ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
    document.getElementById("root"));
