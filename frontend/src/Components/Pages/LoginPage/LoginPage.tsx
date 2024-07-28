import React from 'react';
import LoginForm from "./LoginForm";
import Page from "../Page";


function LoginPage(){
    return (
            <Page className={"login-common"}>
                   <LoginForm/>
            </Page>
    )
}
export default LoginPage