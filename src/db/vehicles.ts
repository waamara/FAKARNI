import db from './database';

export interface Vehicle {
    id: string;
    name: string;
    brand?: string;
    model?: string;
    year?: number;
    current_km: number;
    created_at: string;
}

// Générer un identifiant unique simple
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// Créer un véhicule
export function createVehicle(data: {
    name: string;
    brand?: string;
    model?: string;
    year?: number;
}): Vehicle {
    const vehicle: Vehicle = {
        id: generateId(),
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: data.year,
        current_km: 0,
        created_at: new Date().toISOString(),
    };

    db.runSync(
        `INSERT INTO vehicles (id, name, brand, model, year, current_km, created_at)  VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [vehicle.id, vehicle.name, vehicle.brand ?? null, vehicle.model ?? null, vehicle.year ?? null, vehicle.current_km, vehicle.created_at]
    );

    return vehicle;
}

// Récupérer tous les véhicules
export function getAllVehicles(): Vehicle[] {
    return db.getAllSync<Vehicle>('SELECT * FROM vehicles ORDER BY created_at DESC');
}

// Récupérer un véhicule par son id
export function getVehicleById(id: string): Vehicle | null {
    const result = db.getFirstSync<Vehicle>('SELECT * FROM vehicles WHERE id = ?', [id]);
    return result ?? null;
}

// Mettre à jour le kilométrage d'un véhicule
export function updateVehicleKm(id: string, newKm: number): void {
    db.runSync('UPDATE vehicles SET current_km = ? WHERE id = ?', [newKm, id]);
}

// Modifier les infos d'un véhicule
export function updateVehicle(id: string, data: Partial<Omit<Vehicle, 'id' | 'created_at'>>): void {
    const fields = Object.keys(data);
    if (fields.length === 0) return;

    const setClause = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as any)[f]);

    db.runSync(`UPDATE vehicles SET ${setClause} WHERE id = ?`, [...values, id]);
}

// Supprimer un véhicule
export function deleteVehicle(id: string): void {
    db.runSync('DELETE FROM vehicles WHERE id = ?', [id]);
}