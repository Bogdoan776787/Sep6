import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Form = styled.form`
    width:400px;
    height:450px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    border-radius:50px;
    padding-top:20px;
`

export const LoginText = styled.h1 `
width:fit-content;
margin:0 0 30px 0;
padding:0;
`

export const LoginRedirectLink = styled(NavLink)`
    font-size:16px;
    color:blue;
    margin-left:10px;
`

export const SubmitButton = styled.input`
    width:150px;
    height:30px;
    margin-top:20px;
    margin-bottom:20px;
    border-radius:15px;
    background-color:var(--background);
    border:none;
    &:hover{
        background-color:white;
        border:3px solid var(--background)
    }
    `

export const InputWrapper = styled.div`
margin-bottom:30px
`

export const LoginErrorMessage = styled.h5`
  color:red;
  text-align:left;
  margin-top:15px;
`



