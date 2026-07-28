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

function generateId(): string {
    return Date.now().tostring(36) + Math.random().toString(36).substring(2, 9);
}


// creer un type dentretien 
export function createMaintenanceType(data: {
    vehicle_id: string;
    name: string;
    icone?: string;
    interval_km: string;
    alert_before_km: string;
    is_costum?: boolean;
}): MaintenanceType {
    const maintenanceType: MaintenanceType = {
        id: generateId(),
        vehicle_id: data.vehicle_id,
        name: data.name,
        icon: data.icone || '',
        interval_km: parseInt(data.interval_km),
        alert_before_km: parseInt(data.alert_before_km),
        last_service_km: 0,
        last_service_date: undefined,
        is_costum: data.is_costum ? 1 : 0
    }; db.runSync(
        `INSERT INTO maintenance_types (id, vehicle_id, name, icon, interval_km, alert_before_km, last_service_km, last_service_date, is_custom)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            maintenanceType.id,
            maintenanceType.vehicle_id,
            maintenanceType.name,
            maintenanceType.icon ?? null,
            maintenanceType.interval_km,
            maintenanceType.alert_before_km,
            maintenanceType.last_service_km,
            maintenanceType.last_service_date ?? null,
            maintenanceType.is_custom,
        ]
    );

    return maintenanceType;
} 

//recuperer tous les types d'entretien d'un vehicule 

