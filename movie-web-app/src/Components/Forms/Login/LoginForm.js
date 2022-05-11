import { useForm } from "react-hook-form";
import { Form, LoginHeaderText,LoginRedirectLink,LoginErrorMessage } from "./LoginFormStyled";
import {SubmitButton,InputWrapper} from "../FormStyled"
import FieldInputController from "../../Controller/FieldInputController";
import {Typography} from "@mui/material"


const LoginForm = (props) => {
  const { handleSubmit, formState: { errors }, control } = useForm(
    {
      defaultValues:
      {
        email: "",
        password: ""
      }
    }
  );
  const onSubmit = data => {
    props.handleSubmit(data.email,data.password);
  }

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <LoginHeaderText >
      Login
    </LoginHeaderText>
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