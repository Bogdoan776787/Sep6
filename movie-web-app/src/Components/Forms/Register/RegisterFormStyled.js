import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";

export const Form = styled.form`
    width:500px;
    height:700px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    border-radius:50px;
    padding-top:20px;
`

export const RegisterHeaderText = styled.h1`
width:fit-content;
margin:0 0 30px 0;
padding:0;
`


export const InvalidInputText = styled(Typography)`
    color:red;
    width:300px;
    padding-top:4px;
    min-height:20px;
`

export const RegisterRedirectLink = styled(NavLink)`
    font-size:16px;
    color:blue;
    margin-left:10px;
`