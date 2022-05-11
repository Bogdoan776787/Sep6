import {AuthenthicateBackground} from "./Style"
import LoginForm from "../../Components/Forms/Login/LoginForm";
import {Auth} from "aws-amplify"


const Login = () => {
  const signIn = async (username,password) => {
    try{
    await Auth.signIn(username, password);
    }
    catch(error)
    {
      console.error(error)
    }
  };
  return <AuthenthicateBackground>
      <LoginForm handleSubmit={signIn}></LoginForm>
  </AuthenthicateBackground>;
};



export default Login;