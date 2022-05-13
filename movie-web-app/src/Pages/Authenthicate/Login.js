import {AuthenthicateBackground} from "./Style"
import LoginForm from "../../Components/Forms/Login/LoginForm";
import {Auth} from "aws-amplify"
import { useState } from "react";



const Login = () => {
  const [loginError,setLoginError] = useState("")
  const signIn = async (username,password) => {
    try{
    const user =  await Auth.signIn(username, password).catch(error=>
      {
        setLoginError("Invalid Email or password")
        console.log(error)
      });
    console.log(user)
    }
    catch(error)
    {
      setLoginError("Invalid Email or password")
    }
  };
  return <AuthenthicateBackground>
      <LoginForm handleSubmit={signIn} error={loginError}></LoginForm>
  </AuthenthicateBackground>;
};



export default Login;