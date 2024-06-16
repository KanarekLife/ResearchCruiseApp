import {
    Control,
    Controller,
    ControllerRenderProps,
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormReturn
} from "react-hook-form";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import InputWrapper from "./InputWrapper";


export type FormUser = {
    id: string,
    email: string,
    firstName: string,
    lastName: string
}

type Props = {
    className?: string,
    name: string,
    label: string,
    values?: FormUser[]
    //defaultValue?: string,
    form?: UseFormReturn,
    readonly? :boolean
}


function FormUserSelect(props: Props) {
    const [defaultValue, setDefaultValue] = useState("")

    // useEffect(() => {
    //     if(!props.form!.getValues(props.name) && props.defaultValue) {
    //         props.form!.setValue(
    //             props.name,
    //             props.defaultValue[0].Id,
    //             { shouldDirty: true, shouldValidate: true, shouldTouch: true}
    //         );
    //     }
    // });

    function findLabel(field: ControllerRenderProps){
        const item = props.values?.find(item => item.id === field.value)
        if(item)
            return item.firstName + " " + item.lastName + "\n\r(" + item.email + ")"
        return ""
    }


    return (
        <InputWrapper {...props}>
            <Controller
                name={props.name}
                control={props.form!.control}
                rules={{required: 'Wybierz jedną z opcji'}}

                render={({field}) => (
                    <Select
                        minMenuHeight={300}
                        isDisabled={props.readonly ?? false}
                        value={{ label: findLabel(field), value: field.value}}
                        styles={{
                            control: (provided: any) => ({
                                ...provided,
                                cursor: "pointer",
                                whiteSpace: "normal"
                            }),
                            menu: provided => ({
                                ...provided,
                                zIndex: 9999,
                                whiteSpace: "normal"
                            }),
                            option: provided => ({
                                ...provided,
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word"
                            }),
                            singleValue: provided => ({
                                whiteSpace: 'pre-wrap',  // Ensure selected value text wraps
                                display: 'flex',
                                alignItems: 'center',
                                height: 'auto'
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                whiteSpace: 'pre-wrap',  // Ensure value container text wraps
                                display: 'flex',
                                alignItems: 'center',
                                height: 'auto'
                            })
                        }}
                        options={props.values?.map(value => (
                            {
                                label: value.firstName + " " + value.lastName + "\n\r(" + value.email + ")",
                                value: value.id
                            }
                        ))}
                        onChange={(selectedOption: SingleValue<{ label: string, value: string }>) => {
                            props.form!.setValue(
                                props.name,
                                selectedOption?.value,
                                { shouldDirty: true, shouldValidate: true, shouldTouch: true }
                            );
                        }}
                    />
                )}
            />
        </InputWrapper>
    )
}


export default FormUserSelect