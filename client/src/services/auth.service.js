import axios from "axios";

const signUp = () => {
  return axios.get(process.env.REACT_APP_BASE_URL + "/api/signup");
};

const AuthService = {
  signUp,
};

export default AuthService;
