import { AuthenthicateBackground } from "./Style"
import LoginForm from "../../components/Forms/Login/LoginForm";
import { Auth } from "aws-amplify"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux'
import {setUser} from "./../../userAccount"



const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();


  const [loginError, setLoginError] = useState("")
  const signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password)
      
      dispatch(setUser(user.username));
      navigate("/")
    }
    catch (error) {
      
      setLoginError("Invalid Email or password")
    }
  };
  return <AuthenthicateBackground>
    <LoginForm handleSubmit={signIn} error={loginError}></LoginForm>
  </AuthenthicateBackground>;
};



export default Login;