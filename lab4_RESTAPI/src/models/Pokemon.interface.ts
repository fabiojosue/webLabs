import { Hability } from './Hability.interface';

export interface Pokemon {
    id: number,
    name: string,
    habilities: Hability [],
    type: string,
    secondType: string,
    description: string
}
