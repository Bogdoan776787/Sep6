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

export const LoginHeaderText = styled.h1 `
width:fit-content;
margin:0 0 30px 0;
padding:0;
`

export const LoginRedirectLink = styled(NavLink)`
    font-size:16px;
    color:blue;
    margin-left:10px;
`


export const LoginErrorMessage = styled.h5`
  color:red;
  text-align:left;
  margin-top:15px;
`



