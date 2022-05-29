import FieldInputController from "../../../Controller/FieldInputController";
import { InvalidInputText } from "./../RegisterFormStyled";
import {SubmitButton,InputWrapper} from "./../../FormStyled"
import {Form,ConfirmCodeHeaderTExt,ResendCodeText,ConfirmCodeHelperText} from "./ConfirmCodeStyled"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  code:yup.string().required().min(6,"Invalid code")
}).required();

const ConfirmCodeForm = (props) => {

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    props.handleSubmit(data.code);
  };

  const resendCode = () =>
  {
    props.resendCode();
  }

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <ConfirmCodeHeaderTExt >
      Confirm Code
    </ConfirmCodeHeaderTExt>
    <ConfirmCodeHelperText>Please insert Confirmation Code received in the provided email</ConfirmCodeHelperText>
    <InputWrapper>
    <FieldInputController
      name="code"
      control={control}
      rules={{ required: true }}
      id="outlined-basic"
      label="Confirm Code"
      variant="outlined"
      type="input"
      value={register('code')}
      error={errors.code}
    />
    <InvalidInputText>{errors.code?.message || props.error}</InvalidInputText>
    <ResendCodeText onClick={resendCode}>Resend code</ResendCodeText>
    </InputWrapper>

    <SubmitButton type="submit"/>
  </Form>;
};



export default ConfirmCodeForm;