import db from './database'; 

export interface vehicle {
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

