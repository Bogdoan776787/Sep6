import { AuthenthicateBackground } from "./Style"
import LoginForm from "../../Components/Forms/Login/LoginForm";
import { Auth } from "aws-amplify"
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  let navigate = useNavigate();

  const [loginError, setLoginError] = useState("")
  const signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password)
      navigate("/")
    }
    catch (error) {
      console.log(error)
      setLoginError("Invalid Email or password")
    }
  };
  return <AuthenthicateBackground>
    <LoginForm handleSubmit={signIn} error={loginError}></LoginForm>
  </AuthenthicateBackground>;
};



export default Login;