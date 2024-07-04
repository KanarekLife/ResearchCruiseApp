import Page from "../Page";
import React, {Dispatch, useEffect, useState} from "react";
import PageSectionsGroup from "../CommonComponents/PageSectionsGroup";
import PageSection from "../CommonComponents/PageSection";
import PageTitleWithNavigation from "../CommonComponents/PageTitleWithNavigation";
import {Cruise} from "../CruisesPage/CruisesPage";
import {useLocation} from "react-router-dom";
import CruiseBasicInfo from "./CruiseDetailsSections/CruiseBasicInfo";
import CruiseDate from "./CruiseDetailsSections/CruiseDate";
import {FieldValues, useForm, UseFormReturn} from "react-hook-form";
import CruiseApplications from "./CruiseDetailsSections/CruiseApplications";
import {Application, ApplicationShortInfo} from "../ApplicationsPage/ApplicationsPage";
import Api from "../../Tools/Api";
import {Time} from "../FormPage/Inputs/TaskInput/TaskInput";
import {fetchApplications} from "../../Tools/Fetchers";
import CruiseManagers from "./CruiseDetailsSections/CruiseManagers";


type CruiseManagersTeam = {
    mainCruiseManagerId: string,
    mainDeputyManagerId: string
}

export type EditCruiseFormValues = {
    date: Time,
    managersTeam: CruiseManagersTeam,
    applicationsIds: string[]
}

type CruiseDetailsPageLocationState = {
    cruise: Cruise
}


export default function CruiseDetailsPage() {
    const location = useLocation()
    const [locationState, _]: [CruiseDetailsPageLocationState, Dispatch<any>]
        = useState(location.state || { })

    const editCruiseForm = useForm<EditCruiseFormValues>({
        defaultValues: {
            date: locationState.cruise.date,
            managersTeam: {
                mainCruiseManagerId: locationState.cruise.mainCruiseManagerId,
                mainDeputyManagerId: locationState.cruise.mainDeputyManagerId
            },
            applicationsIds: locationState.cruise.applicationsShortInfo.map(app => app.id)
        }
    })

    const sendEditCruiseForm = () => {
        console.log(editCruiseForm.getValues())
        Api
            .patch(
                `/api/Cruises/${locationState.cruise.id}`,
                editCruiseForm.getValues()
            )
            .then(_ =>
                console.log("Success")
            )
            .catch(__ =>
                console.log("Error")
            )
    }

    const [sections, __] : [Record<string, string>, Dispatch<any>] = useState({
        "Podstawowe": "Podstawowe informacje o rejsie",
        "Termin": "Termin rejsu",
        "Kierownicy": "Kierownik główny i zastępca kierownika głównego",
        "Zgłoszenia": "Zgłoszenia przypisane do rejsu"
    })

    const [applicationsAddingMode, setApplicationsAddingMode] =
        useState(false)

    const [applications, setApplications] =
        useState<Application[]>([])
    useEffect(() => {
        fetchApplications(locationState.cruise.applicationsShortInfo, setApplications)
    }, []);

    return (
        <Page className="justify-content-center col-12 col-xl-9 bg-white" >
            <div className="d-flex flex-column w-100 h-100" style={{fontSize: "0.8rem"}}>
                <div className="d-flex flex-column align-items-center w-100 h-100 overflow-auto" >
                    <PageTitleWithNavigation
                        title="Szczegóły rejsu"
                        sections={sections}
                        showRequiredSections={false}
                    />

                    <PageSectionsGroup sections={sections}>
                        <PageSection title={sections["Podstawowe"]}>
                            <CruiseBasicInfo cruise={locationState.cruise} />
                        </PageSection>

                        <PageSection title={sections["Termin"]}>
                            <CruiseDate editCruiseForm={editCruiseForm} />
                        </PageSection>

                        <PageSection title={sections["Kierownicy"]}>
                            <CruiseManagers
                                applications={applications}
                                editCruiseForm={editCruiseForm}
                            />
                        </PageSection>

                        <PageSection title={sections["Zgłoszenia"]}>
                            <CruiseApplications
                                editCruiseForm={editCruiseForm}
                                applications={applications}
                                setApplications={setApplications}
                                addingMode={applicationsAddingMode}
                                setAddingMode={setApplicationsAddingMode}
                            />
                        </PageSection>
                    </PageSectionsGroup>
                </div>
                <div className={`d-flex flex-row justify-content-center border-top border-black w-100 bg-white`} style={{zIndex:9999}}>
                    <div className="d-flex col-6 text-center p-2 justify-content-center">
                        <button
                            className="btn btn-primary w-100"
                            style={{fontSize:"inherit"}}
                            onClick={sendEditCruiseForm}
                        >
                            Zapisz zmiany
                        </button>
                    </div>
                    <div className="d-flex col-6 text-center p-2 justify-content-center" >
                        <button className="btn btn-primary w-100" style={{fontSize:"inherit"}}>:)</button>
                    </div>
                </div>
            </div>
        </Page>
    )
}