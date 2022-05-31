import axios from "axios";
import { toast } from "react-toastify";

const AuthActionType = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAIL: "LOGOUT_FAIL"
};


const getCSRFToken =async () => {
  const response = await axios.get('/getCSRFToken');
  console.log(response.data.CSRFToken);
  axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
};



const RegisterAuthAction = (inputs, history) => {
    return async (dispatch) => {
        try {
          // await getCSRFToken();
            const body = inputs;

            const parseRes = (await axios.post("/authentication/register", inputs)).data
      
            if (parseRes.username) {
            //   localStorage.setItem("token", parseRes.jwtToken);
              // setAuth(true);
              toast.success("Register Successfully");
              dispatch({type: AuthActionType.REGISTER_SUCCESS, payload: parseRes});
              history.push("/dashboard");
            } else {
              // setAuth(false);
              toast.error("errrorrr");
              console.log(parseRes, "Register Auth Action else");
              dispatch({type: AuthActionType.REGISTER_FAIL, payload: {} });
            }
          } catch (err) {
            console.error(err.message);
            dispatch({type: AuthActionType.REGISTER_FAIL, payload: {} });

          }
    };
};

const LoginAuthAction = (inputs, history) => {
  return async (dispatch) => {

    try {
      // axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'true';
      // axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';


      axios.defaults.withCredentials = true;
      // const body = { username, password };
      await getCSRFToken();
      const body = inputs;
      const parseRes = (await axios.post("/authentication/login", inputs)).data
      console.log(parseRes);
      if (parseRes.username) {
        // localStorage.setItem("token", parseRes.jwtToken);
        // setAuth(true);
        toast.success("Logged in Successfully");
        dispatch({type: AuthActionType.LOGIN_SUCCESS, payload: parseRes})
        history.push("/dashboard");

      } else {
        // setAuth(false);
        toast.error(parseRes);
        dispatch({type: AuthActionType.LOGIN_FAIL, payload: {} })
      }
    } catch (err) {
      console.error(err.message);
      dispatch({type: AuthActionType.LOGIN_FAIL, payload: {} })
    }
  };
};

const LogoutAuthAction = (history) => {
  return async (dispatch) => {
      try {
          
          const parseRes = (await axios.post("/authentication/logout")).data

          dispatch({type: AuthActionType.LOGOUT_SUCCESS, payload: parseRes.message})
          toast.success("Logged out Successfully");
          history.push("/login");

        } catch (error) {
          if (error.response) {
            dispatch({
              type: AuthActionType.LOGOUT_FAIL,
              payload: error.response.data.message,
            });
          }
        }
  };
};




export { LoginAuthAction, RegisterAuthAction, LogoutAuthAction, AuthActionType};