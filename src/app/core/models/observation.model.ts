export interface Observation {
    // TODO Det hadde vært fint om vi kan bruke discriminated union for å kunne si at
    // FullObject er enten ObjA eller ObjB. Må undersøke typescript regler.
    FullObject: any;
    RegistrationName: string;
    RegistrationTid: number;
    TypicalValue1: string;
    TypicalValue2: string;
}
