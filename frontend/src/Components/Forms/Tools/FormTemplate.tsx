import React, {useState} from 'react';
import Page from "../../Tools/Page";
import {useNavigate} from "react-router-dom";
import useCustomEvent from "../../Tools/useCustomEvent";
import savedFormPage from "../../SavedFormsPage/SavedFormPage";
import Api from "../../Tools/Api";


type Props = {
    children?: React.ReactElement<any, string | React.JSXElementConstructor<HTMLElement>>[]
    form,
    loadValues?,
    type:string
}



function FormTemplate(props: Props) {
    const { dispatchEvent } = useCustomEvent('busy');

    const navigate = useNavigate();
    const saveValues = () => {
        dispatchEvent("Trwa zapisywanie")

        var data = localStorage.getItem('formData');
        var formData = []
        // Jeśli nie ma jeszcze żadnych danych w localStorage, utwórz nową tablicę
        if (data) {
            formData = JSON.parse(data);
        }

        // Dodaj nowy formularz do tablicy

        formData.push({type:props.type, id:Math.random(), date:new Date().toString(), data:props.form.getValues()});

        // Zapisz zaktualizowane dane w localStorage
        localStorage.setItem('formData', JSON.stringify(formData));





        setTimeout(()=>{
            navigate("/savedForms")
            dispatchEvent(null)
        },5000);
    };

    React.useEffect(() => {
        if (props.loadValues) {
            Object.entries(props.loadValues).forEach(([key, value]) => {
                props.form.setValue(key, value, {shouldDirty:true, shouldValidate:true, shouldTouch:true});
            });
        }
    }, [props.form.setValue]);

    const handleSubmit = () => {
        console.log(props.form.getValues()); console.log(props.form.formState.errors); console.log(props.form.formState.touchedFields)
        Api.post('/forms', props.form.getValues()).then(r => console.log(r))
    }

    return (
        <>
            <Page className="justify-content-center col-12 col-xl-9 bg-white">
                <div className="d-flex flex-column w-100 h-100" style={{fontSize: "0.8rem"}}>
                    <div className="d-flex flex-column align-items-center w-100 h-100 overflow-auto">
                        {props.children}
                    </div>
                    <div className="d-flex flex-row justify-content-center border-top border-black w-100 bg-white" style={{zIndex:9999}}>
                        <div className="d-flex col-6 text-center p-2 justify-content-center">
                            <button onClick={saveValues} className="btn btn-info w-100" style={{fontSize:"inherit"}}>Zapisz</button>
                        </div>
                        <div className="d-flex col-6 text-center p-2 justify-content-center" >
                            <button onClick={handleSubmit} className="btn btn-info w-100" style={{fontSize:"inherit"}}>Wyślij</button>
                        </div>
                    </div>
                </div>
            </Page>

        </>
    )
}


export default FormTemplate