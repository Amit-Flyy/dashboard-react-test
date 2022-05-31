import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { RegisterAuthAction } from "../redux/actions/authAction";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// const Register = ({ setAuth }) => {
function Register(props) {
  const { user, register } = props;
  // console.log({ user, register });
  let history = useHistory()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: ""
  });

  const { email, password, username } = inputs;
  // console.log(inputs);
  const onChange = e => {
    
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const onSubmitForm = async e => {
    e.preventDefault();
    register(inputs, history)
    // try {
    //   const body = { email, password, username };
    //   const response = await fetch(
    //     "http://localhost:5000/authentication/register",
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
    //     // setAuth(true);
    //     toast.success("Register Successfully");
    //   } else {
    //     // setAuth(false);
    //     toast.error(parseRes);
    //   }
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  return (
    <div className="loginBackground">
      <div className="loginDiv">
        <h1 className="mt-5 text-center">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <button className="btn btn-block btn-primary subButton">Submit</button>
        </form>
        <Link to="/login">login</Link>  
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
    register: (inputs, history) => {
      // dispatch()
      // console.log(inputs);
      dispatch(RegisterAuthAction(inputs, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
