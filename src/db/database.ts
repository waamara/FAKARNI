import * as SQLite from 'expo-sqlite';  

const db = SQLite.openDatabaseSync('fakarni.db');  
export function initDatabase() {
    db.execSync(` 
        CREATE TABLE IF NOT EXISTS vehicles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL, 
            brand TEXT NOT NULL,
            model TEXT, 
            year INTEGER, 
            current_km INTEGER NOT NULL DEFAULT 0, 
            created_at TEXT NOT NULL 
        ); 
    
    
}