import { useState } from "react"

import { AuthenthicateBackground } from "./Style"
import RegisterForm from "../../components/Forms/Register/RegisterForm";
import ConfirmCodeForm from "../../components/Forms/Register/ConfirmCode/ConfirmCodeForm";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { Auth } from "aws-amplify"
import { useNavigate } from "react-router-dom";



const Register = () => {
  let navigate = useNavigate();

  const [registrationStep, setRegistrationStep] = useState("signUp");
  const [userName, setUsername] = useState("")
  const [codeError, setCodeError] = useState("")
  const [userNameError, setUserNameError] = useState("")

  const signUp = async (username, email, password) => {
    try {
      await Auth.signUp({ username, password, attributes: { email } })
      setUsername(username);
      setRegistrationStep("confirmationCode")

    }
    catch (error) {
        setUserNameError("Username Already exists")
    }
  }
  const confirmCode = async (code) => {
    try {
      await Auth.confirmSignUp(userName, code)
      setRegistrationStep("signUp")
      navigate("/login")

    } catch (error) {
        
        setCodeError("Invalid code")
    }
  }
  const resendCode = async () => {
      await Auth.resendSignUp(userName)
  }


  return <AuthenthicateBackground>
    {registrationStep === "signUp" && <RegisterForm handleSubmit={signUp} error={userNameError}></RegisterForm>}
    {registrationStep === "confirmationCode" && <ConfirmCodeForm handleSubmit={confirmCode} error={codeError} resendCode = {resendCode}></ConfirmCodeForm>}
  </AuthenthicateBackground>;
};



export default Register;