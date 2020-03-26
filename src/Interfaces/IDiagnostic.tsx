export interface IDiagnostic {
    sex: string;
    age: number;
    evidence?: IEvidence[];
}

export interface IEvidence {
    id: string;
    choice_id: string;
}