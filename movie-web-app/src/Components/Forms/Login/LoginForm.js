import { Form, LoginHeaderText, LoginRedirectLink, LoginErrorMessage } from "./LoginFormStyled";
import { SubmitButton, InputWrapper,TextRedirectHelper } from "../FormStyled"
import FieldInputController from "../../Controller/FieldInputController";
import { Typography } from "@mui/material"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
  username: yup.string().required("Invalid Username or password"),
  password: yup.string().required("Invalid Username or Password")
}).required();


const LoginForm = (props) => {
  const { register,handleSubmit, formState: { errors }, control } = useForm(
    {
      resolver: yupResolver(schema)
    }
  );
  const onSubmit = data => {
    props.handleSubmit(data.username, data.password);
  }

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <LoginHeaderText >
      Login
    </LoginHeaderText>
    <InputWrapper>
      <FieldInputController
        name="username"
        control={control}
        rules={{ required: true }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        type="input"
        error={errors?.username}
        value={register('username')}

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
      error={errors.password}
      value={register('password')}

    />
    <LoginErrorMessage>{errors.username?.message || errors.password?.message  || props.error}</LoginErrorMessage>

    <SubmitButton type="submit" />
    <TextRedirectHelper>
      Don't have an account?
      <LoginRedirectLink to="/register">SignUp</LoginRedirectLink>
    </TextRedirectHelper>



  </Form>;
};



export default LoginForm;