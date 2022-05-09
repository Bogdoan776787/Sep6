import { Controller, useForm } from "react-hook-form";
import { Form, LoginText,SubmitButton,LoginRedirectLink, InputWrapper,LoginErrorMessage } from "./LoginFormStyled";
import FieldInputController from "../Controller/FieldInputController";
import {Typography} from "@mui/material"


const LoginForm = () => {
  const { handleSubmit, formState: { errors }, control } = useForm(
    {
      defaultValues:
      {
        email: "",
        password: ""
      }
    }
  );
  const onSubmit = data => console.log(data);

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <LoginText >
      Login
    </LoginText>
    <InputWrapper>
    <FieldInputController
      name="email"
      control={control}
      rules={{ required: true }}
      id="outlined-basic"
      label="Email"
      variant="outlined"
      type="input"
    />
    </InputWrapper>
    <FieldInputController
      name="password"
      control={control}
      rules={{ required: true }}
      id="outlined-password-input"
      label="Password"
      variant="outlined"
      type="password"
    />
    <LoginErrorMessage>Wrong Email or Password</LoginErrorMessage>
    
    <SubmitButton type="submit"/>
    <Typography>
      Don't have an account? 
      <LoginRedirectLink to="/register">SignUp</LoginRedirectLink>
    </Typography>



  </Form>;
};



export default LoginForm;