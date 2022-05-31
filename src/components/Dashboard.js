import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from 'react-redux'
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { LogoutAuthAction } from "../redux/actions/authAction";
// const Dashboard = ({ setAuth }) => {
function Dashboard(props) {
  const { auth, token, logout} = props;
  const history = useHistory();
    // console.log("DASHBOARD PROPS :", props);
  let username = '';
  const [name, setName] = useState('')
  const getProfile = async () => {
    try {
      // console.log("jwtToken : ", token);
  
      const parseData = (await (axios.post("/authentication/getusername"))).data;

      // const parseData = await res.json();
      // setName(parseData.username);
      console.log(parseData.username, "dashboard try block");
      username = parseData["username"];
      // console.log("printing username ", username, "  ", Date.now());
      greetUser()
    } catch (err) {
      console.log("printing username error ", username);

      console.error(err.message);
    }
  };
  
  const greetUser = () => {
    setName(username);
    console.log(`greetuser ${username}`);
  }

  const getCSRFToken =async () => {
    const response = await axios.get('/getCSRFToken');
    // console.log(response.data.CSRFToken);
    console.log("In dashboard.js", response.data.CSRFToken);

    axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
    
    
  };
  
  
  
  useEffect(() => {
    getProfile();
    // getCSRFToken();
  }, []);


  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name} </h2>
      <button onClick={e => {
        e.preventDefault();
        // setName('amit')
        // console.log(`setname ${name}`);
        logout(history);
      }} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state,
    // token: state.user.jwtToken
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      
      console.log("in Dashboard Dispatch, logging out: ");
      dispatch(LogoutAuthAction(history));

    }
    // register: (inputs) => {
    //   // dispatch()
    //   // console.log(inputs);
    //   dispatch(RegisterAuthAction(inputs))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


// export default Dashboard;
