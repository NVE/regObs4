export interface AvalancheWarningSimple {
    RegId: number;
    RegionId: number;
    RegionName: string;
    RegionTypeId: number;
    RegionTypeName: string; // A or B
    ValidFrom: string;
    ValidTo: string;
    NextWarningTime: string;
    PublishTime: string;
    DangerLevel: number;
    MainText: string;
}
