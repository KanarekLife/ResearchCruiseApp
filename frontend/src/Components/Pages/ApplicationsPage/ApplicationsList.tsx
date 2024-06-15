import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import ReadOnlyTextInput from "../../CommonComponents/ReadOnlyTextInput";
import LinkWithState from "../../CommonComponents/LinkWithState";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Application} from "./ApplicationsPage";
import {useNavigate} from "react-router-dom";
import useCustomEvent from "../../Tools/useCustomEvent";
import {addPlugins} from "workbox-precaching";
import Api from "../../Tools/Api";
import app from "../../App";

type Props = {
    // Only defined if the component is called from the cruise's details page.
    // It then contains the applications already assigned to a cruise
    boundApplications?: Application[]

    // Callback to the function in the parent component that updates the applications
    // assigned to a cruise
    setBoundApplications?: Dispatch<SetStateAction<Application[]>> | ((applications: Application[]) => void)

    // Indicates if the list should allow adding an application to a cruise
    addingMode?: boolean,

    // Indicated if the list should allow deleting applications from a cruise
    deletionMode?: boolean
}


export default function ApplicationsList(props: Props) {
    const navigate = useNavigate()

    // const generateApplications = () => {
    //     const records: Application[] = [];
    //     for (let i = 1; i <= 100; i++) {
    //         const record: Application = {
    //             id: (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString(),
    //             date: `2024-${Math.floor(Math.random() * 2 + 10)}-${Math.floor(Math.random() * 10 + 20)}`,
    //             number: `2024/${i}`,
    //             year: 2025 + Math.floor(Math.random() * 3),
    //             cruiseManagerFirstName: i % 3 == (Math.floor(Math.random() * 3)) ? "Sławomir" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Mieczysław" : "Trzebiesław"),
    //             cruiseManagerLastName: i % 3 == (Math.floor(Math.random() * 3)) ? "Kiędonorski" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Adamczykowski" : "Sokołogonogonogonogonowski"),
    //             deputyManagerFirstName: i % 3 == (Math.floor(Math.random() * 3)) ? "Maciej" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Paweł" : "Sławomir"),
    //             deputyManagerLastName: i % 3 == (Math.floor(Math.random() * 3)) ? "Domorowicz" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Międzypodczas" : "Golałchowski"),
    //             formAId: (i * 100).toString(),
    //             formBId: i % 2 === 0 ? null : (i * 1000).toString(),
    //             formCId:  null,
    //             status: "Nowe",
    //             points: (Math.floor(Math.random() * 300) + 1).toString(),
    //             pointsDetails: [{}, {}]
    //         };
    //         records.push(record);
    //     }
    //     console.log(records)
    //     return records;
    // };

    const [applications, setApplications]: [Application[], Dispatch<any>]
        = useState([])
    useEffect(() => {
        Api
            .get(
                '/Applications',)
            .then(response =>
                setApplications(response.data)
            )
            .catch(() => {
            })
        },[]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(
        () => {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        },
        []
    );

    const [sortAscending, setSortAscending] = useState(true)

    const sortApplicationsByPoints = () => {
        setApplications(
            applications?.sort((a: Application, b: Application): number =>
                (parseInt(a.points) - parseInt(b.points)) * (sortAscending ? -1 : 1)
            )
        )
        setSortAscending(!sortAscending)
    }

    const sortApplicationsByDate = () => {
        setApplications(
            applications?.sort((a: Application, b: Application): number =>
                (Date.parse(a.date) - Date.parse(b.date)) * (sortAscending ? -1 : 1)
            )
        )
        setSortAscending(!sortAscending)
    }

    const sortApplicationsByYear = () => {
        setApplications(
            applications?.sort((a: Application, b: Application): number =>
                (a.year - b.year) * (sortAscending ? -1 : 1)
            )
        )
        setSortAscending(!sortAscending)
    }

    const { dispatchEvent } = useCustomEvent('busy')

    const getRowBackground = (index: number) => {
        return index % 2 == 0 ? "bg-light" : "bg-white"
    }

    return (
        <div className="table-striped w-100 overflow-auto">
            {props.addingMode &&
                <div className="text-white text-center bg-primary w-100">
                    <div className="d-flex justify-content-center align-items-center p-2">
                        <b>Dołączanie zgłoszenia</b>
                    </div>
                </div>
            }
            <div className={`text-white text-center w-100 ${props.addingMode ? "bg-secondary" : "bg-primary"}`}>
                <div className="d-flex flex-row center">
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "14%", cursor: "pointer"}}
                         onClick={sortApplicationsByDate}
                    >
                        <b>Numer<br/>data</b>
                        <div className="btn btn-sm btn-dark px-1 py-0 ms-2">
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "9%", cursor: "pointer"}}
                         onClick={sortApplicationsByYear}
                    >
                        <b>Rok rejsu</b>
                        <div className="btn btn-sm btn-dark px-1 py-0 ms-2">
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "22%"}}>
                        <b>Kierownik</b>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "12%"}}>
                        <b>Formularze</b>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "12%", cursor: "pointer"}}
                         onClick={sortApplicationsByPoints}
                    >
                        <b>Punkty</b>
                        <div className="btn btn-sm btn-dark px-1 py-0 ms-2">
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "15%"}}>
                        <b>Status</b>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "16%"}}>
                        <b>Akcje</b>
                    </div>

                    <div className="d-flex d-xl-none justify-content-center p-2 col-12">
                        <b>Zgłoszenia</b>
                    </div>
                </div>
            </div>
            <div className="w-100 bg-light">
                {!applications.length &&
                    <div className="d-flex flex-row bg-light p-2 justify-content-center border-bottom">
                        <div className={"text-center"}>Brak zgłoszeń</div>
                    </div>
                }
                {(props.deletionMode ? props.boundApplications : applications)!.map((row: Application, index: number) => (
                    (
                        (
                            // if the application is not already assigned to the cruise
                            props.addingMode &&
                            !props.boundApplications!.filter(application => application.number == row.number).length
                        ) ||
                        (
                            // if this list does not enable adding applications to a cruise
                            !props.addingMode
                        )
                    ) &&
                    <div
                        key={index}
                        className={`d-flex flex-wrap flex-row justify-content-center border-bottom ${getRowBackground(index)}`}
                    >
                        <div className="d-flex flex-wrap justify-content-center align-content-center p-2"
                             style={{width: windowWidth >= 1200 ? "14%" : "100%"}}
                        >
                            <div className="col-12 d-flex d-xl-none justify-content-center">Numer i data:</div>
                            <ReadOnlyTextInput
                                value={row.number}
                                className={`mb-1 ${getRowBackground(index)}`}
                            />
                            <ReadOnlyTextInput
                                value={row.date}
                                className={getRowBackground(index)}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2"
                             style={{width: windowWidth >= 1200 ? "9%" : "100%"}}
                        >
                            <div className="col-12 d-flex d-xl-none justify-content-center">Rok rejsu:</div>
                            <ReadOnlyTextInput
                                value={row.year.toString()}
                                className={getRowBackground(index)}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-content-center p-2"
                             style={{width: windowWidth >= 1200 ? "22%" : "100%"}}
                        >
                            <div className="col-12 d-flex d-xl-none justify-content-center">Kierownik:</div>
                            <ReadOnlyTextInput
                                value={row.cruiseManagerFirstName}
                                className={`mb-1 ${getRowBackground(index)}`}
                            />
                            <ReadOnlyTextInput
                                value={row.cruiseManagerLastName}
                                className={getRowBackground(index)}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                             style={{width: windowWidth >= 1200 ? "12%" : "100%"}}
                        >
                            <LinkWithState
                                to={row.formAId ? "/Form" : ""}
                                state={{
                                    formType: "A",
                                    formId: row.formAId ?? undefined,
                                    readonly: true
                                }}
                                label="Formularz A"
                                className={`col-12 d-flex justify-content-center ${!row.formAId ? "text-muted text-decoration-none" : ""}`}
                                style={!row.formAId ? {cursor: "default"} : undefined}
                            />
                            <LinkWithState
                                to={row.formBId ? "/Form" : ""}
                                state={{
                                    formType: "B",
                                    formId: row.formBId ?? undefined,
                                    readonly: true
                                }}
                                label="Formularz B"
                                className={`col-12 d-flex justify-content-center ${!row.formBId ? "text-muted text-decoration-none" : ""}`}
                                style={!row.formBId ? {cursor: "default"} : undefined}
                            />
                            <LinkWithState
                                to={row.formCId ? "/Form" : ""}
                                state={{
                                    formType: "C",
                                    formId: row.formCId ?? undefined,
                                    readonly: true
                                }}
                                label="Formularz C"
                                className={`col-12 d-flex justify-content-center ${!row.formCId ? "text-muted text-decoration-none" : ""}`}
                                style={!row.formCId ? {cursor: "default"} : undefined}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                             style={{width: windowWidth >= 1200 ? "12%" : "100%"}}
                        >
                            <div className="col-12 d-flex d-xl-none justify-content-center">Punkty:</div>
                            <ReadOnlyTextInput
                                value={row!.points}
                                className={`col-12 d-flex justify-content-center ${getRowBackground(index)}`}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                             style={{width: windowWidth >= 1200 ? "15%" : "100%"}}
                        >
                            <div className="col-12 d-flex d-xl-none justify-content-center">Status:</div>
                            <div className="col-4 d-flex justify-content-center">
                                <i>{row!.status}</i>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                             style={{width: windowWidth >= 1200 ? "16%" : "100%"}}
                        >
                            <div className="btn-group-vertical">
                                <LinkWithState
                                    className="btn btn-info"
                                    to="/ApplicationDetails"
                                    label="Szczegóły"
                                    state={{application: row}}
                                />

                                {props.deletionMode &&
                                    // Show only if the component represents a cruise's applications
                                    <a
                                        className="btn btn-danger"
                                        style={{fontSize: "inherit"}}
                                        onClick={() => {
                                            // Remove the application from the list
                                            const updatedApplications = props.boundApplications!.filter((_, i) => i != index)
                                            props.setBoundApplications!(updatedApplications)
                                        }}
                                    >
                                        Usuń
                                    </a>
                                }
                                {props.addingMode &&
                                    // Show only if the component enables adding applications to a cruise
                                    <a
                                        className="btn btn-outline-success"
                                        style={{fontSize: "inherit"}}
                                        onClick={() => {
                                            // Add the application to the list
                                            const updatedApplications = [...props.boundApplications!, row]
                                            props.setBoundApplications!(updatedApplications)
                                        }}
                                    >
                                        Dołącz
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}