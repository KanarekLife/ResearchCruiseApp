import React, {createContext, ReactElement, useEffect, useState} from 'react';
import Page from "../../Page";
import {useForm, UseFormReturn} from "react-hook-form";
import FormTitleWithNavigation from "../../CommonComponents/FormTitleWithNavigation";
import {FormSectionType} from "./FormASections";
import {BottomOptionBar} from "../../../Tools/FormBottomOptionBar";
import {FormAInitValues} from "../FormTypes";
import Api from "../../../Tools/Api";
import {useLocation} from "react-router-dom";
import api from "../../../Tools/Api";


type Props = {
    type: string,
    readOnly?:boolean,
    sections:FormSectionType[],
    initValues?:FormAInitValues
    BottomOptionBar?:React.JSXElementConstructor<any>
}

export type ExtendedUseFormReturn = UseFormReturn & {
    type:string,
    readOnly?:boolean,
    setReadOnly: (state:boolean) => void,
    sections:FormSectionType[],
    initValues?:FormAInitValues
}


export const FormContext = createContext<ExtendedUseFormReturn | null>(null)
export const ReadOnlyContext = createContext<boolean>(false)
export const FormSections = (props:{sections:FormSectionType[]}) => (
    <div className="form-page-content" id={"form"}>
        {props.sections.map((section:FormSectionType, index) =>
            <section.Content key={index} index={index + 1}/>)}
    </div>
)

function FormTemplate(props: Props) {

    const location = useLocation()

    const [defaultValues, setDefaultValues] = useState(undefined)

    useEffect(() => {
        console.log(location.state)

        if(location.state.cruiseApplicationId && !defaultValues && location.state?.formType == 'A') {
            Api.get(`/api/CruiseApplications/${location.state?.cruiseApplicationId}/form${location.state?.formType}`)
                .then(response => {
                    setDefaultValues(response.data)
                    form.reset(response.data)
                })
                    }
    }, []);



    const [formInitValues, setFormInitValues] = useState<any>(undefined)
    useEffect(() => {
        api
            .get('/Forms/InitValues/A')
            .then(response => {
                setFormInitValues(response.data)
            })

    },[]);

    const form = useForm({
        mode: 'onBlur',
        defaultValues: defaultValues,
        shouldUnregister: false,
        reValidateMode:"onBlur"
    })

    const [readOnly, setReadOnly] = useState(location.state.readOnly)

    const formContext = {
        resetField:form.resetField,
        clearErrors:form.clearErrors,
        trigger:form.trigger,
        formState:form.formState,
        handleSubmit:form.handleSubmit,
        getValues:form.getValues,
        reset:form.reset,
        control:form.control,
        setValue:form.setValue,
        defaultValues:defaultValues,
        setReadOnly:setReadOnly,
        type:props.type, readOnly:readOnly, sections:props.sections, initValues:formInitValues };

    console.log(formContext.formState.errors)


    return (
        <Page className="form-page">
            <FormContext.Provider value={formContext}>
                <ReadOnlyContext.Provider value={formContext.readOnly}>
                    <FormTitleWithNavigation/>
                    <FormSections sections={props.sections}/>
                    {props.BottomOptionBar ? <props.BottomOptionBar/> : <BottomOptionBar/>}
                </ReadOnlyContext.Provider>
            </FormContext.Provider>

        </Page>
    )
}


export default FormTemplate