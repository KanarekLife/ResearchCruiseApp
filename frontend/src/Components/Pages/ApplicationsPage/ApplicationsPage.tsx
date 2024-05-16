import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Page from "../Page";
import Api from "../../Tools/Api";
import DataTable from 'react-data-table-component';
import useCustomEvent from "../../Tools/useCustomEvent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ReadOnlyTextInput from "../../CommonComponents/ReadOnlyTextInput";
import PageTitle from "../PageTitle";


type Props = {
    className?: string
}


function ApplicationsPage(props: Props) {
    type ApplicationOverview = {
        id: string,
        date: string,
        number: string,
        year: string,
        cruiseManagerFirstName: string,
        cruiseManagerLastName: string,
        formAId: string | null,
        formBId: string | null,
        formCId: string | null,
        points: string,
        status: string
    }

    const generateLogicalCruises = () => {
        const records: ApplicationOverview[] = [];
        for (let i = 1; i <= 100; i++) {
            const record: ApplicationOverview = {
                id: (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString() + "-" + (Math.floor(Math.random() * 1000)).toString(),
                date: `2024-${Math.floor(Math.random() * 2 + 10)}-${Math.floor(Math.random() * 10 + 20)}`,
                number: `2024/${i}`,
                year: (2025 + Math.floor(Math.random() * 3)).toString(),
                cruiseManagerFirstName: i % 3 == (Math.floor(Math.random() * 3)) ? "Sławomir" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Mieczysław" : "Trzebiesław"),
                cruiseManagerLastName: i % 3 == (Math.floor(Math.random() * 3)) ? "Kiędonorski" : (i % 3 == (Math.floor(Math.random() * 3)) ? "Adamczykowski" : "Sokołogonogonogonogonowski"),
                formAId: (i * 100).toString(),
                formBId: i % 2 === 0 ? null : (i * 1000).toString(),
                formCId:  null,
                points: (Math.floor(Math.random() * 300) + 1).toString(),
                status: i % 2 === 0 ? "Odrzucone" : "Nowe"
            };
            records.push(record);
        }
        return records;
    };

    const [applications, setApplications]: [ApplicationOverview[], Dispatch<any>]
        = useState(generateLogicalCruises())

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
            applications?.sort((a: ApplicationOverview, b: ApplicationOverview): number =>
                (parseInt(a.points) - parseInt(b.points)) * (sortAscending ? -1 : 1)
            )
        )
        setSortAscending(!sortAscending)
    }

    const { dispatchEvent } = useCustomEvent('busy')

    // const fetchData = async () => {
    //     return  Api.get(
    //         '/Users',)
    //         .then(response => {
    //             return response.data;
    //         })
    //         .then(response => setUserList(response))
    //         .finally(() => dispatchEvent(null))
    //         .catch(()=>{})
    //
    // }

    return (
        <>
            <Page className="justify-content-center col-12 col-xl-9 bg-white">
                <div className="d-flex flex-column w-100 h-100" style={{fontSize: "0.8rem"}}>
                    <div className="d-flex flex-column align-items-center w-100 h-100 overflow-auto">
                        <PageTitle title="Zgłoszenia" />
                        <div className="table-striped w-100 overflow-y-scroll">
                            <div className="text-white text-center bg-primary">
                                <div className="d-flex flex-row center">
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "14%"}}>
                                        <b>Numer, data</b>
                                    </div>
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "9%"}}>
                                        <b>Rok rejsu</b>
                                    </div>
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "32%"}}>
                                        <b>Kierownik</b>
                                    </div>
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "18%"}}>
                                        <b>Formularze</b>
                                    </div>
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2" style={{width: "12%", cursor: "pointer"}}
                                         onClick={sortApplicationsByPoints}
                                    >
                                        <b>Punkty</b>
                                        <div className="p-0 ms-2">
                                            {sortAscending ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                                        </div>
                                    </div>
                                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2 border-end" style={{width: "15%"}}>
                                        <b>Status</b>
                                    </div>
                                    <div className="d-flex d-xl-none justify-content-center p-2 col-12">
                                        <b>Zgłoszenia</b>
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 bg-light">
                                {!applications.length &&
                                    <div className="d-flex flex-row bg-light p-2 justify-content-center border">
                                        <div className={"text-center"}>Brak rejsów</div>
                                    </div>
                                }
                                {applications.map((row: ApplicationOverview, index: number) => (
                                    <div key={index}
                                         className={`d-flex flex-wrap flex-row justify-content-center border-bottom ${index % 2 == 0 ? "bg-light" : "bg-white"}`}
                                    >
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2"
                                             style={{width: windowWidth >= 1200 ? "14%" : "100%"}}
                                        >
                                            <div className="col-12 d-flex d-xl-none justify-content-center">Numer i data:</div>
                                            <ReadOnlyTextInput value={row.number} className="mb-1" />
                                            <ReadOnlyTextInput value={row.date} />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2"
                                             style={{width: windowWidth >= 1200 ? "9%" : "100%"}}
                                        >
                                            <div className="col-12 d-flex d-xl-none justify-content-center">Rok rejsu:</div>
                                            <ReadOnlyTextInput value={row.year} />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2"
                                             style={{width: windowWidth >= 1200 ? "32%" : "100%"}}
                                        >
                                            <div className="col-12 d-flex d-xl-none justify-content-center">Kierownik:</div>
                                            <ReadOnlyTextInput value={row.cruiseManagerFirstName} className="mb-1"/>
                                            <ReadOnlyTextInput value={row.cruiseManagerLastName} />
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                                             style={{width: windowWidth >= 1200 ? "18%" : "100%"}}
                                        >
                                            <Link
                                                className={`col-12 d-flex justify-content-center ${!row.formAId ? "text-muted text-decoration-none" : ""}`}
                                                to={row.formAId ? `/${row.formAId}` : "#"}
                                                style={!row.formAId ? {cursor: "default"} : {}}
                                            >
                                                Formularz A
                                            </Link>
                                            <Link
                                                className={`col-12 d-flex justify-content-center ${!row.formBId ? "text-muted text-decoration-none" : ""}`}
                                                to={row.formBId ? `/${row.formBId}` : "#"}
                                                style={!row.formBId ? {cursor: "default"} : {}}
                                            >
                                                Formularz B
                                            </Link>
                                            <Link
                                                className={`col-12 d-flex justify-content-center ${!row.formCId ? "text-muted text-decoration-none" : ""}`}
                                                to={row.formCId ? `/${row.formCId}` : "#"}
                                                style={!row.formCId ? {cursor: "default"} : {}}
                                            >
                                                Formularz C
                                            </Link>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                                             style={{width: windowWidth >= 1200 ? "12%" : "100%"}}
                                        >
                                            <div className="col-12 d-flex d-xl-none justify-content-center">Punkty:</div>
                                            <Link
                                                className={`col-12 d-flex justify-content-center`}
                                                to={"/ApplicationPoints/" + row.id}
                                            >
                                                {row!.points}
                                            </Link>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center align-items-center p-2 text-center"
                                             style={{width: windowWidth >= 1200 ? "15%" : "100%"}}
                                        >
                                            <div className="col-12 d-flex d-xl-none justify-content-center">Status:</div>
                                            <div className="col-4 d-flex justify-content-center">
                                                <i>{row!.status}</i>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        </>
    )
}


export default ApplicationsPage