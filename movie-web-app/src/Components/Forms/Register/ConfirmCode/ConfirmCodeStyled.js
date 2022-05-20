import styled from "styled-components";
import { Typography } from "@mui/material";


export const Form = styled.form`
    width:550px;
    height:400px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    border-radius:50px;
    padding-top:20px;
`

export const ConfirmCodeHeaderTExt = styled.h1`
width:fit-content;
margin:0 0 10px 0;
padding:0;
font-size:16px;
`

export const ConfirmCodeHelperText = styled(Typography)`
width:420px;
font-weight:normal;
margin-bottom:20px!important;

`

export const ResendCodeText = styled(Typography)
`
text-align:right;
color: blue;
text-decoration:underline;
margin-top:10px
`

