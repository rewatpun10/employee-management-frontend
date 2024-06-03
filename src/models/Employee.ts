import { Department } from "./Department";

export interface Employee {
    id: number;
    created: Date;
    firstName: string;
    lastName: string;
    email: string;
    department: Department;
}