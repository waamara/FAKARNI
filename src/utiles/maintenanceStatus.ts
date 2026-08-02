import { MaintenanceType } from "../db/maintenance"; 

export type MaintenanceStatus = 'ok' | 'warning' | 'overdue' ; 

export interface MaintenanceStatusResult {
    status: MaintenanceStatus;
    KmRemaining: number; 
    nextServiceKm: number; 
} 

export function getMaintenanceStatus (
    maintenanceType: MaintenanceType, 
    currentKm: number 
): MaintenanceStatusResult {
    const nextServiceKm = maintenanceType.last_service_km + maintenanceType.interval_km;
    const KmRemaining = nextServiceKm - currentKm; 

    let status: MaintenanceStatus; 
    if (KmRemaining <= 0) {
        status = 'overdue';
    } else if (KmRemaining <= maintenanceType.alert_before_km) {
        status = 'warning';
    } else {
        status ='ok';
    } 

    return {status, KmRemaining, nextServiceKm };
}
