import React from "react";
import {Controller, useFieldArray} from "react-hook-form";
import Style from "./BlockListInput.module.css"
import CSSModules from "react-css-modules";
import ErrorCode from "../../../LoginPage/ErrorCode";


type Props = {
    className: string,
    label: string,
    name,
    form?
}


const data= [
    "Katedra Biologii Morza i Biotechnologii",
    "Stacja Morska im. Profesora Krzysztofa Skóry",
    "asddasds",
    "sadasdd"
]

function BlockListInput(props: Props){
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control: props.form.control,
        name: props.form.name,
    });

    // const disabled = !Array.from({ length: data.length }, (_, index) => index)
    //     .some(item => (!fields.map((field)=>field.form.label)
    //         .includes(item)))

    // const isSubFormDirty = fields.every(
    //     (field, index) => props.dirtyFields[`${props.name}[${index}].value`]
    // );
    // console.log(isSubFormDirty)

    return (
        <div className={props.className + " p-3 d-flex flex-column justify-content-center"}>
            <table className="table-striped w-100">
                <thead className="text-white text-center" style={{"backgroundColor":"#052d73"}}>
                    <tr className="d-flex flex-row center align-items-center w-100">
                        <th className="text-center p-2 w-100">{props.label}</th>
                    </tr>
                </thead>

                <tbody>
                    {!fields.length &&
                        <tr className="d-flex flex-row bg-light p-2 justify-content-center">
                            <th colSpan={3} className={"text-center"} >Nie dodano żadnej jednostki</th>
                        </tr>
                    }
                    {fields.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <tr className="d-flex flex-row justify-content-center align-items-center border bg-light">
                                <th className="w-25 text-center p-2 border-end ">{index}</th>
                                <th className="w-75 text-center p-2">
                                    {/*<text>   {data[item.label]}</text>*/}
                                    <Controller name={`${props.name}[${index}].value`}
                                                control={props.form.control}
                                                rules={{
                                                    required: "Pole nie może być puste",
                                                    validate: (value) =>
                                                        value.length < 10 || 'Pole nie może mieć wartości 0.'
                                                }}
                                                render={({ field }) => (
                                                    <input {...field}
                                                           type="text"
                                                           className="w-100"
                                                           onBlur={(e)=> {
                                                               props.form.setValue(
                                                                   `${props.name}[${index}].value`,
                                                                   e.target.value,
                                                                   { shouldDirty: false }
                                                               )
                                                               props.form.setValue(
                                                                   `${props.name}[${index}].value`,
                                                                   e.target.value,
                                                                   { shouldValidate: true }
                                                               )
                                                           }}
                                                    />
                                                )}
                                    />
                                </th>
                                <th className="d-inline-flex p-2">
                                    <button type="button"
                                            className="btn btn-primary"
                                            onClick={() => {remove(index)}}
                                    >
                                        -
                                    </button>
                                </th>
                            </tr>
                            <tr className="bg-light">
                                <th>
                                    {props.form.formState.errors[props.name] &&
                                        props.form.formState.errors[props.name][index] &&
                                        <ErrorCode code=
                                                       {props.form.formState.errors[props.name][index]["value"].message}
                                        />
                                    }
                                </th>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-primary"
                    type="button"
                    onClick={() => { append({value: "" })} }
                    // disabled={disabled}
            >
                +
            </button>
        </div>
    )
}


export default  CSSModules(BlockListInput, Style)