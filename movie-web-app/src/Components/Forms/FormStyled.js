import styled from "styled-components";


export const SubmitButton = styled.input`
    width:180px;
    height:35px;
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
margin-bottom:25px
`