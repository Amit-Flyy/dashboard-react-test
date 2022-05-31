import axios from "axios";
import { AuthActionType } from "../actions/authAction";

const authState = {
    isLoggedIn: false,
    user: {
        username: "",
        email: "",
        expires_at:""
    }
};

// const getCSRFToken =async () => {
//     const response = await axios.get('/getCSRFToken');
//     axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
// };

const getAuthState = () => {
    const auth = localStorage.getItem('auth');
    if(auth == null){
        return authState;
    }
    try {
        const authobj = JSON.parse(auth);
        // const {jwtToken} = authobj.user;
        // axios.defaults.headers.common['jwtToken'] = jwtToken;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        return authobj;
    } catch (error) {
        // console.error(error);
        return authState;
    }
}

console.log("getAuthState", getAuthState());

const newAuth = getAuthState();

const authreducer = (state = newAuth, action) => {
    axios.defaults.withCredentials = true;
    switch (action.type) {
        case AuthActionType.REGISTER_SUCCESS: 
            // getCSRFToken()
            const newAuthState = {
            isLoggedIn: true,
                user: action.payload
            };
            localStorage.setItem("auth", JSON.stringify(newAuthState));
            axios.defaults.withCredentials = true;
            // axios.defaults.headers.common['jwtToken'] = action.payload.jwtToken;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.jwtToken}`;
            return newAuthState;
        case AuthActionType.REGISTER_FAIL:
            return state;
        case AuthActionType.LOGIN_SUCCESS: 
            // getCSRFToken();
            const newAuthLoginState = {
                isLoggedIn: true,
                user: action.payload
            };
            // console.log("LOGIN SUCCESS", newAuthLoginState);
            localStorage.setItem("auth", JSON.stringify(newAuthLoginState));
            axios.defaults.withCredentials = true;
            // axios.defaults.headers.common['jwtToken'] = action.payload.jwtToken;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.jwtToken}`;
            return newAuthLoginState;
        case AuthActionType.REGISTER_FAIL:
            return state;
        case AuthActionType.LOGIN_FAIL:
            return state;
        case AuthActionType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;

        case AuthActionType.LOGOUT_FAIL:
            return authState;
            
        default:
            console.log("Default Auth Reducer");
            return state;
    }
};


export default authreducer;