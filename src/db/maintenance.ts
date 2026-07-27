import db from './database' 

export interface MaintenanceType {
    id: string;
    vehicle_id: string;
    name: string;
    icon?: string;
    interval_km: number;
    alert_before_km: number;
    last_service_km: number;
    last_service_date?: string;
    is_costum: number;
}

