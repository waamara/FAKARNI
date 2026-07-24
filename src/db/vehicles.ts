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

    db.
}

