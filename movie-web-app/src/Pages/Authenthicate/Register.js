import { useState, useEffect } from "react"

import { AuthenthicateBackground } from "./Style"
import RegisterForm from "../../Components/Forms/Register/RegisterForm";
import ConfirmCodeForm from "../../Components/Forms/Register/ConfirmCode/ConfirmCodeForm";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { Auth } from "aws-amplify"
import { Navigate } from "react-router-dom";



const Register = () => {
  const [registrationStep, setRegistrationStep] = useState("signUp");
  const [userName, setUsername] = useState("")
  const [codeError, setCodeError] = useState("")
  const [userNameError, setUserNameError] = useState("")

  const signUp = async (username, email, password) => {
    try {
      setUsername(username);
      const res = await Auth.signUp({ username, password, attributes: { email } })
      console.log(res)
      setRegistrationStep("confirmationCode")
    }
    catch (error) {
        setUserNameError("Username Already exists")
    }
  }
  const confirmCode = async (code) => {
    try {
      const res = await Auth.confirmSignUp(userName, code)
      console.log(res)
      setRegistrationStep("signUp")
      Navigate("/")
    } catch (error) {
        setCodeError("Invalid code")
    }

  }


  return <AuthenthicateBackground>
    {registrationStep == "signUp" && <RegisterForm handleSubmit={signUp} error={userNameError}></RegisterForm>}
    {registrationStep == "confirmationCode" && <ConfirmCodeForm handleSubmit={confirmCode} error={codeError}></ConfirmCodeForm>}
  </AuthenthicateBackground>;
};



export default Register;