import { MaintenanceType } from "../db/maintenance"; 

export type MaintenanceStatus = 'ok' | 'warning' | 'overdue' ; 

export interface MaintenanceStatusResult {
    status: MaintenanceStatus;
    KmRemaining: number; 
    nextServiceKm: number; 
}