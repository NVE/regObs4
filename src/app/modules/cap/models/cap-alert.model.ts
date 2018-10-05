export interface CapAlertWrapper {
    alert: CapAlert;
}

export interface CapAlert {
    identifier: string;
    sender: string;
    sent: Date;
    status: string;
    msgType: string;
    scope: string;
    code: string;
    references: string;
    info: CapAlertInfo | CapAlertInfo[];
}

export interface CapAlertInfo {
    language: string;
    category: string;
    event: string;
    responseType: string;
    urgency: string;
    severity: string;
    certainty: string;
    eventCode: CapAlertParameter | CapAlertParameter[];
    effective: Date;
    expires: Date;
    senderName: string;
    headline: string;
    description: string;
    instruction: string;
    web: string;
    contact: string;
    parameter: CapAlertParameter | CapAlertParameter[];
    area: CapAlertArea;
}

export interface CapAlertParameter {
    valueName: string;
    value: string;
}

export interface CapAlertArea {
    areaDesc: string;
    polygon: string;
    geocode: CapAlertParameter | CapAlertParameter[];
}
