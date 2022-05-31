import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { LoginAuthAction } from "../redux/actions/authAction";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import '../stylesheets/loginRegister.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const Login = ({ setAuth }) => {
function Login(props) {

  const {user, login} = props;
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  let history = useHistory()
  const { username, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    login(inputs, history)
    // try {
    //   // const body = { username, password };
    //   const body = inputs;

    //   const response = await fetch(
    //     "http://localhost:5000/authentication/login",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/json"
    //       },
    //       body: JSON.stringify(body)
    //     }
    //   );

    //   const parseRes = await response.json();

    //   if (parseRes.jwtToken) {
    //     localStorage.setItem("token", parseRes.jwtToken);
    //     setAuth(true);
    //     toast.success("Logged in Successfully");
    //   } else {
    //     setAuth(false);
    //     toast.error(parseRes);
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  return (
    <div className="loginBackground">
      <div className="loginDiv">
        <h1 className="mt-5 text-center">Flyy</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
        
          
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <button className="btn btn-block btn-primary subButton">Login</button>
        </form>
        <Link to="/register" >register</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (inputs, history) => {
      
      console.log("in Login Dispatch, logging in: ", inputs);
      dispatch(LoginAuthAction(inputs, history))
    }
    // register: (inputs) => {
    //   // dispatch()
    //   // console.log(inputs);
    //   dispatch(RegisterAuthAction(inputs))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);



// export default Login;
