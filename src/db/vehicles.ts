import { brand } from 'expo-device';
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

function generateID() : string {
    return Date.now().toString(36) +Math.random().toString(36).substring(2, 9);
}

export function createVehicle(data: {
    name: string; 
    brand?: string; 
    model?: string;
    year?: number;  
}): Vehicle {
    const vehicle: Vehicle = {
        id: generateID(), 
        name: data.name,
        brand: data.brand, 
        model: data.model, 
        year : data.year, 
        current_km: 0, 
        created_at: new Date().toISOString(), 
    }; 

    db.runSync(
        `INSERT INTO vehicles (id, name, brand, model, year, current_km, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [vehicle.id, vehicle.name, vehicle.brand ?? null, vehicle.model ?? null, vehicle.year ?? null, vehicle.current_km, vehicle.created_at]         
    );

    return vehicle;
}

// recuperation des vehicules 
export function getALLVehicles(): Vehicle[] {
    return db.getAllAsync<Vehicle>('SELECT * FROM vehicles ORDER BY created_at DESC'); 
}

// recuperation des vehicules par leur id 

export function getVehicleByid(id: string, newKm: number):Vehicle | null {
    const result = db.getFirstSync<Vehicle>('SELECT * FROM vehicles WHERE id = ?', [id]);
    return result ?? null; 
}

//mettre a jour le kilometrage d'un vehicule 
export function updateVehicleKM(id: string, newKm: number) : void {
    db.runSync('UPDATE vehicles SET current_km = ? WHERE id = ?', [newKm, id]);
}

// supprimer un vehicule
export function deleteVehicle(id: string): void {
    db.runSync('DELETE FROM vehicles WHERE id = ?', [id]);
}

// Modifier les information d'un vehicule 
export function  updateVehicule(id: string, data: Partial<0mit<Vehicle, 'id' | 'creates_at'>>): void {
    const fields = Objecct.keys(data); 
    if(fields.length === 0) return;

    const setClasue = fields.map((f) => `${f} = ?`).join(', ');
    const values = fields.map((f) => (data as any)[f]);

    db.runSync(`UPDATE vehicles SET ${setClasue} WHERE id = ?`, [...values, id]);
}

