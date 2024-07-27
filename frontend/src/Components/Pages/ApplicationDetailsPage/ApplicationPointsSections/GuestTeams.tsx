import React, {useEffect, useState} from "react";
import {GuestsTeam} from "../../FormPage/Inputs/GuestTeamsInput/GuestTeamsInput";
import useWindowWidth from "../../../CommonComponents/useWindowWidth";

type Props = {
    guestTeams: GuestsTeam[],
}


export default function GuestTeams(props: Props){
    const windowWidth = useWindowWidth();

    return (
        <div className="table-striped w-100 p-3">
            <div className="text-white text-center bg-primary">
                <div className="d-flex flex-row center">
                    <div className="w-100 p-2">
                        <b>Uczestnictwo gości spoza UG</b>
                    </div>
                </div>
            </div>

            <div className="text-white text-center bg-secondary">
                <div className="d-flex flex-row center">
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2 border-end" style={{width: "10%"}}>
                        <b>Lp.</b>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2 border-end" style={{width: "69%"}}>
                        <b>Jednostka</b>
                    </div>
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2 border-end" style={{width: "21%"}}>
                        <b>Liczba pracowników</b>
                    </div>
                </div>
            </div>
            {!props.guestTeams.length &&
                <div className="d-flex flex-row bg-light p-2 justify-content-center border">
                    <div className={"text-center"}>Nie dodano żadnej instytucji</div>
                </div>
            }
            {props.guestTeams && props.guestTeams.map((item: GuestsTeam, index: number) => (
                <div className="d-flex flex-wrap flex-row justify-content-center border bg-light"
                     key={index}
                >
                    <div className="d-none d-xl-flex justify-content-center align-items-center p-2 border-end"
                         style={{width: windowWidth >= 1200 ? "10%" : "100%"}}
                    >
                        {index + 1}.
                    </div>
                    <div className="d-flex d-xl-none justify-content-center align-items-center p-2 col-12">
                        <b>Jednostka {index + 1}.</b>
                    </div>

                    <div className="d-flex justify-content-center align-items-center p-2 border-end text-center"
                         style={{width: windowWidth >= 1200 ? "69%" : "100%"}}
                    >
                        <span>{item.institution}</span>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center align-items-center p-2 border-end text-center"
                         style={{width: windowWidth >= 1200 ? "21%" : "100%"}}
                    >
                        <div className="col-12 d-flex d-xl-none justify-content-center">Liczba osób</div>
                        <input
                            className="text-center placeholder-glow w-100 p-1 form-control bg-light"
                            disabled
                            value={item.noOfPersons}
                        />
                    </div>
                </div>))}

        </div>)
}
