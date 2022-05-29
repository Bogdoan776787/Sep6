import FieldInputController from "../../Controller/FieldInputController";
import { Form, RegisterHeaderText, InvalidInputText, RegisterRedirectLink } from "./RegisterFormStyled";
import { SubmitButton, InputWrapper,TextRedirectHelper } from "./../FormStyled"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  username: yup.string().required("Username is required").min(6, "Username must be at least 6 characters")
  .matches(/^([^a-zA-Z]*[A-Za-z]){4}/
  ,"Username must contain at least 4 letters"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
  .matches(/[a-z]+/, "Password must contain one lowercase character")
  .matches(/[A-Z]+/, "Password must contain one uppercase character")
  .matches(/\d+/, "Password must contain one number"),
  confirmPassword: yup.string().required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Confirm password does not match")
}).required();

const RegisterForm = (props) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    props.handleSubmit(data.username,data.email,data.password)
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <RegisterHeaderText >
      Register
    </RegisterHeaderText>
    <InputWrapper>
      <FieldInputController
        name="email"
        control={control}
        rules={{ required: true }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="input"
        error={errors.email}
        value={register('email')}
      />
      <InvalidInputText>{errors.email?.message}</InvalidInputText>
    </InputWrapper>
    <InputWrapper>
      <FieldInputController
        name="username"
        control={control}
        rules={{ required: true }}
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        type="input"
        error={errors.username}
        value={register('username')}
      />
      <InvalidInputText>{errors.username?.message || props.error}</InvalidInputText>
    </InputWrapper>
    <InputWrapper>
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
      <InvalidInputText>{errors.password?.message}</InvalidInputText>
    </InputWrapper>
    <FieldInputController
      name="confirmPassword"
      control={control}
      rules={{ required: true }}
      id="outlined-password-input"
      label="Confirm Password"
      variant="outlined"
      type="password"
      error={errors.confirmPassword}
      value={register('confirmPassword')}
    />
    <InvalidInputText>{errors.confirmPassword?.message}</InvalidInputText>

    <SubmitButton type="submit" value = "Register"/>

    <TextRedirectHelper>Already Registered? <RegisterRedirectLink to="/login">LogIn</RegisterRedirectLink></TextRedirectHelper>
  </Form>;
};



export default RegisterForm;