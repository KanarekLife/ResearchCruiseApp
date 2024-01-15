import React from 'react';
import Page from "../Tools/Page";

function NewFormPage(props:{className?: string}){
    return (
        <>
            <Page className={props.className + " d-flex justify-content-center bg-white"}>
                <div className="  d-flex flex-column pb-1 m-2 center align-self-start justify-content-center  w-100">
                    <p>Wybierz formularz</p>
                    <a href={"/formA"}> formularz A</a>
                    <a href={"/formB"}> formularz B</a>
                    <a href={"/formC"}> formularz C</a>
                </div>
            </Page>
        </>
    )
}

export default NewFormPage;