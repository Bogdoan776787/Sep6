import styled from "styled-components";
import { Typography } from "@material-ui/core";


export const SubmitButton = styled.input`
    width:180px;
    height:35px;
    margin-top:20px;
    margin-bottom:20px;
    border-radius:15px;
    background-color:rgba(137, 171, 245, 0.37);
    color:white;
    border:none;
    &:hover{
        background-color:white;
        border:3px solid rgba(137, 171, 245, 0.37);
        color:rgba(137, 171, 245, 0.37);
        padding:0;
    }
    `

export const InputWrapper = styled.div`
margin-bottom:25px
`

export const TextRedirectHelper = styled(Typography)
`
color:black;
`