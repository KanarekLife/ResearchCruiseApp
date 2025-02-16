export type CruiseApplication = {
  id: string;
  number: string;
  year: number;
  date: string;

  cruiseManagerId: string;
  cruiseManagerEmail: string;
  cruiseManagerFirstName: string;
  cruiseManagerLastName: string;
  
  deputyManagerId: string;
  deputyManagerEmail: string;
  deputyManagerFirstName: string;
  deputyManagerLastName: string;

  hasFormA: boolean;
  hasFormB: boolean;
  hasFormC: boolean;

  points: number;
  status: string;
  effectsDoneRate: string;
  note: string | null;
};
