import React from "react";
import {FormSectionType, SectionWrapper} from "../../../Wrappers/FormASections";
import {
    AcceptablePeriodField,
    CruiseDaysField,
    CruiseHoursField,
    DifferentShipUsageField,
    OptimalPeriodField,
    PeriodNotesField,
    ShipUsageField
} from "./TimeSectionFields";

export const timeSectionFieldNames = {
    acceptablePeriod:"acceptablePeriod",
    optimalPeriod:"optimalPeriod",
    cruiseHours:"cruiseHours",
    periodNotes:"periodNotes",
    shipUsage:"shipUsage",
    differentUsage:"differentUsage"

}

const TimeSectionFields = () =>
    (
        <>
            <AcceptablePeriodField/>
            <OptimalPeriodField/>
            <CruiseDaysField/>
            <CruiseHoursField/>
            <PeriodNotesField/>
            <ShipUsageField/>
            <DifferentShipUsageField/>
        </>
    )

export const TimeSection = () => SectionWrapper(
    {
        shortTitle: "Czas",
        longTitle: "Czas trwania zgłaszanego rejsu",
        sectionFieldNames: timeSectionFieldNames,
        children: <TimeSectionFields/>
    }
)