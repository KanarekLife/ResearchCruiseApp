import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from "./LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom"
import Home from "./HomePage/Home";
import LoggedInRoute from "./Tools/LoggedInRoute";
import NotLoggedInRoute from "./Tools/NotLoggedInRoute";
import PageHeader from "./PageHeader/PageHeader";
import useToken from "./Tools/useToken";

function GetUsername(userToken:string){

    return "sss";
}
function App() {
    const {token, setToken} = useToken()
    return (
        <div className={`vh-100`}>
            <PageHeader title={token ? GetUsername(token): null}></PageHeader>
            <Routes>
                <Route element={<LoggedInRoute userToken={token} redirectPath={"/login"} />}>
                    <Route path="/*" element={<Home setUserToken={setToken}/>}/>
                </Route>
                <Route element={<NotLoggedInRoute userToken={token} redirectPath={"/"} />}>
                    <Route path="/login" element={<LoginPage className={" justify-content-center justify-content-md-end"} setUserToken={setToken} />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;