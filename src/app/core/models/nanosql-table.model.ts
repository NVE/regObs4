import { DataModel } from 'nano-sql';

export class NanoSqlTable {
    name: string;
    instancePerAppMode: boolean;
    model: DataModel[];
}
