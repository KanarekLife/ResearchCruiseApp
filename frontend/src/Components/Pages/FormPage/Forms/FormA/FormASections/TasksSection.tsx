import React from "react";
import {SectionWrapper} from "../../../Wrappers/FormASections";
import {TasksField} from "./TasksSectionFields";

export const researchTasksSectionFieldNames = {
    researchTasks:"researchTasks",
}

export const TasksSection = () => SectionWrapper(
    {
        shortTitle: "Zadania",
        longTitle: "Zadania do zrealizowania w trakcie rejsu",
        sectionFieldNames: researchTasksSectionFieldNames,
        children: <TasksField/>
    }
)