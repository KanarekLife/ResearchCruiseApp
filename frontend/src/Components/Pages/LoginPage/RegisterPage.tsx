import React from 'react';
import RegisterForm from "./RegisterForm";
import Page from "../Page";


function RegisterPage(){
    return (
            <Page className={"login-common"}>
                   <RegisterForm/>
            </Page>
    )
}
export default RegisterPage