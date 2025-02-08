export type FormAPerson = { id: string; email: string; firstName: string; lastName: string };
export type FormAResearchArea = { id: string; name: string };
export type FormAResearchTask = {
  type: string;
  title?: string;
  magazine?: string;
  author?: string;
  institution?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  financingAmount?: string;
  financingApproved?: string;
  description?: string;
  securedAmount?: string;
  MinisterialPoints?: string;
};
export type FormAHistoricalContract = {
  category: string;
  institutionName: string;
  institutionUnit: string;
  institutionLocalization: string;
  description: string;
  scan: FormAFile;
};
export type FormAFile = {
  name: string;
  content: string;
};
export type FormAUGUnit = {
  id: string;
  name: string;
};
export type FormASpubTask = {
  name: string;
  yearFrom: string;
  yearTo: string;
};
export type FormAPublicationDto = {
  id: string;
  category: string;
  doi: string;
  authors: string;
  title: string;
  magazine: string;
  year: string;
  MinisterialPoints: string;
};
export type FormAInitialState = {
  cruiseManagers: FormAPerson[];
  deputyManagers: FormAPerson[];
  years: string[];
  shipUsages: string[];
  researchAreas: FormAResearchArea[];
  cruiseGoals: string[];
  historicalResearchTasks: FormAResearchTask[];
  historicalContracts: FormAHistoricalContract[];
  unitGroups: FormAUGUnit[];
  historicalGuestInstructions: string[];
  historicalSpubTasks: FormASpubTask[];
  historicalPublications: FormAPublicationDto[];
};
export type FormAPermissionDto = {
  description: string;
  executive: string;
  scan?: FormAFile;
};
export type FormADto = {
  id?: string;
  cruiseManagerId: string;
  deputyManagerId: string;
  year: string;
  acceptablePeriod: number[];
  optimalPeriod: number[];
  cruiseHours: number;
  periodNotes: string;
  shipUsage: number;
  differentShipUsage: string;
  permissions: FormAPermissionDto[];
  researchAreaId: string;
  researchAreaInfo: string;
  cruiseGoal: string;
  cruiseGoalDescription: string;
  researchTasks: FormAResearchTask[];
};

export type FormATaskType =
  | 'Praca licencjacka'
  | 'Praca magisterska'
  | 'Praca doktorska'
  | 'Przygotowanie projektu naukowego'
  | 'Realizacja projektu krajowego (NCN, NCBiR, itp.)'
  | 'Realizacja projektu zagranicznego (ERC, Programy ramowe UE, fundusze norweskie, itp)'
  | 'Realizacja projektu wewnętrznego UG'
  | 'Realizacja innego projektu naukowego'
  | 'Realizacja projektu komercyjnego'
  | 'Dydaktyka'
  | 'Realizacja własnego zadania badawczego'
  | 'Inne zadanie';
export const taskTypes: FormATaskType[] = [
  'Praca licencjacka',
  'Praca magisterska',
  'Praca doktorska',
  'Przygotowanie projektu naukowego',
  'Realizacja projektu krajowego (NCN, NCBiR, itp.)',
  'Realizacja projektu zagranicznego (ERC, Programy ramowe UE, fundusze norweskie, itp)',
  'Realizacja projektu wewnętrznego UG',
  'Realizacja innego projektu naukowego',
  'Realizacja projektu komercyjnego',
  'Dydaktyka',
  'Realizacja własnego zadania badawczego',
  'Inne zadanie',
];
export type FormAAuthorTitleTaskDto = {
  type: '0' | '1' | '2';
  author: string;
  title: string;
};
export type FormATitleDateFinancingApprovedTaskDto = {
  type: '3';
  title: string;
  date: string;
  financingApproved: 'true' | 'false';
};
export type FormATitleFinancingAmountSecuredAmountWithDatesTaskDto = {
  type: '4' | '5' | '6' | '7' | '8';
  title: string;
  financingAmount: string;
  startDate: string;
  endDate: string;
  securedAmount: string;
};
export type FormADescriptionTaskDto = {
  type: '9' | '11';
  description: string;
};
export type FormAMinisterialPointsTaskDto = {
  type: '10';
  title: string;
  date: string;
  magazine: string;
  ministerialPoints: string;
};
export type FormATaskDto =
  | FormAAuthorTitleTaskDto
  | FormATitleDateFinancingApprovedTaskDto
  | FormATitleFinancingAmountSecuredAmountWithDatesTaskDto
  | FormADescriptionTaskDto
  | FormAMinisterialPointsTaskDto;
export const getEmptyTask = (type: FormATaskType): FormAResearchTask => {
  switch (type) {
    case 'Praca licencjacka':
      return { type: '0', author: '', title: '' } as FormAAuthorTitleTaskDto;
    case 'Praca magisterska':
      return { type: '1', author: '', title: '' } as FormAAuthorTitleTaskDto;
    case 'Praca doktorska':
      return { type: '2', author: '', title: '' } as FormAAuthorTitleTaskDto;
    case 'Przygotowanie projektu naukowego':
      return { type: '3', title: '', date: '', financingApproved: 'false' } as FormATitleDateFinancingApprovedTaskDto;
    case 'Realizacja projektu krajowego (NCN, NCBiR, itp.)':
      return {
        type: '4',
        title: '',
        financingAmount: '5.00',
        startDate: '',
        endDate: '',
        securedAmount: '0.00',
      } as FormATitleFinancingAmountSecuredAmountWithDatesTaskDto;
    case 'Realizacja projektu zagranicznego (ERC, Programy ramowe UE, fundusze norweskie, itp)':
      return {
        type: '5',
        title: '',
        financingAmount: '0.00',
        startDate: '',
        endDate: '',
        securedAmount: '0.00',
      } as FormATitleFinancingAmountSecuredAmountWithDatesTaskDto;
    case 'Realizacja projektu wewnętrznego UG':
      return {
        type: '6',
        title: '',
        financingAmount: '0.00',
        startDate: '',
        endDate: '',
        securedAmount: '0.00',
      } as FormATitleFinancingAmountSecuredAmountWithDatesTaskDto;
    case 'Realizacja innego projektu naukowego':
      return {
        type: '7',
        title: '',
        financingAmount: '0.00',
        startDate: '',
        endDate: '',
        securedAmount: '0.00',
      } as FormATitleFinancingAmountSecuredAmountWithDatesTaskDto;
    case 'Realizacja projektu komercyjnego':
      return {
        type: '8',
        title: '',
        financingAmount: '0.00',
        startDate: '',
        endDate: '',
        securedAmount: '0.00',
      } as FormATitleFinancingAmountSecuredAmountWithDatesTaskDto;
    case 'Dydaktyka':
      return { type: '9', description: '' } as FormADescriptionTaskDto;
    case 'Realizacja własnego zadania badawczego':
      return { type: '10', title: '', date: '', magazine: '', ministerialPoints: '0' } as FormAMinisterialPointsTaskDto;
    case 'Inne zadanie':
      return { type: '11', description: '' } as FormADescriptionTaskDto;
    default:
      throw new Error(`Unknown task type: ${type}`);
  }
};
