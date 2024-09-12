import React, {useContext} from "react";
import {FormSectionType} from "../FormPage/Wrappers/FormASections";
import {FormContext} from "../FormPage/Wrappers/FormTemplate";

function FormTitleWithNavigation(props:{title?:string}){
    const formContext = useContext(FormContext)


    function scrollSmoothTo(elementId: string){
        var element = document.getElementById(elementId);
        element?.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    const FormTitle = () => (
        <div className={"form-page-title"}>
            {["A","B","C"].includes(formContext!.type) && `Formularz ${formContext!.type}` }
            {formContext!.type == "0" && `Szczegóły zgłoszenia` }
            {formContext!.type == "1" && ''}
        </div> )

    const showRequiredSections = !formContext?.readOnly

    const isValidSection = (section:FormSectionType) => Object.values(section.sectionFieldNames)
        .some((fieldName)=>formContext?.formState.errors[fieldName])

    const SectionLink = (props:{section:FormSectionType, index:number} ) => (
        <div className={"form-page-navigation-button"} onClick={() => scrollSmoothTo(props.section.id)}>
            {props.index + 1 + ". "}{props.section.shortTitle}{showRequiredSections && (!isValidSection(props.section) ? "" : "*")}
        </div>
    )

    const SectionLinks = () => (
        <div className={"form-page-navigation"}>
            {formContext!.sections.map((section, index) =>
                <SectionLink key={index} section={section} index={index} /> )}
        </div>
    )

    return (
        <div className={"form-title-with-navigation"}>
            <SectionLinks/>
            <FormTitle/>
        </div>
    )
}


export default FormTitleWithNavigation