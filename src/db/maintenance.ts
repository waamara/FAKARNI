import db from './database';

export interface MaintenanceType {
    id: string;
    vehicle_id: string;
    name: string;
    icon?: string;
    interval_km: number;
    alert_before_km: number;
    last_service_km: number;
    last_service_date?: string;
    is_custom: number;
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function createMaintenanceType(data: {
    vehicle_id: string;
    name: string;
    icon?: string;
    interval_km: number;
    alert_before_km?: number;
    is_custom?: boolean;
}): MaintenanceType {
    const maintenanceType: MaintenanceType = {
        id: generateId(),
        vehicle_id: data.vehicle_id,
        name: data.name,
        icon: data.icon,
        interval_km: data.interval_km,
        alert_before_km: data.alert_before_km ?? 500,
        last_service_km: 0,
        last_service_date: undefined,
        is_custom: data.is_custom ? 1 : 0,
    };

    db.runSync(
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

export function getMaintenanceTypesByVehicle(vehicleId: string): MaintenanceType[] {
    return db.getAllSync<MaintenanceType>(
        'SELECT * FROM maintenance_types WHERE vehicle_id = ?',
        [vehicleId]
    );
}

export function recordMaintenance(data: {
    vehicle_id: string;
    maintenance_type_id: string;
    km_at_service: number;
    notes?: string;
    cost?: number;
}): void {
    const serviceDate = new Date().toISOString();

    db.runSync(
        `INSERT INTO maintenance_history (id, vehicle_id, maintenance_type_id, km_at_service, service_date, notes, cost)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [generateId(), data.vehicle_id, data.maintenance_type_id, data.km_at_service, serviceDate, data.notes ?? null, data.cost ?? null]
    );

    db.runSync(
        'UPDATE maintenance_types SET last_service_km = ?, last_service_date = ? WHERE id = ?',
        [data.km_at_service, serviceDate, data.maintenance_type_id]
    );
}

export function deleteMaintenanceType(id: string): void {
    db.runSync('DELETE FROM maintenance_types WHERE id = ?', [id]);
}

export function addKmEntry(vehicleId: string, km: number): void {
    db.runSync(
        'INSERT INTO km_history (id, vehicle_id, km, recorded_at) VALUES (?, ?, ?, ?)',
        [generateId(), vehicleId, km, new Date().toISOString()]
    );

    db.runSync('UPDATE vehicles SET current_km = ? WHERE id = ?', [km, vehicleId]);
}

export function getKmHistory(vehicleId: string) {
    return db.getAllSync(
        'SELECT * FROM km_history WHERE vehicle_id = ? ORDER BY recorded_at DESC',
        [vehicleId]
    );
}