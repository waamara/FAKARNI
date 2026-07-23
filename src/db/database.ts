import * as SQLite from 'expo-sqlite';  

const db = SQLite.openDatabaseSync('fakarni.db');  
export function initDatabase() {
    db.execSync(` 
        CREATE TABLE IF NOT EXISTS vehicules (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL, 
            brand TEXT NOT NULL,
            model TEXT, 
            year INTEGER, 
            current_km INTEGER NOT NULL DEFAULT 0, 
            created_at TEXT NOT NULL 
        ); 
    
    CRETE TABLE IF NOT EXISTS maintenance_types (  
            id TEXT PRIMARY KEY, 
            vehicule_id TEXT NOT NULL, 
            name TEXT NOT NULL, 
            icon TEXT, 
            interval_km INTEGER NOT NULL, 
            alert_before_km INTEGER NOT NULL DEFAULT 500, 
            last_service_km INTEGER NOT NULL DEFAULT 0,
            last_service_date TEXT, 
            is_custom INTEGER DEFAULT 0,
            FOREIGN KEY (vehicule_id) REFERENCES vehicules(id) ON DELETE CASCADE
        );

    CREATE TABLE IF NOT EXISTS km_history (
            id TEXT PRIMARY KEY, 
            vehicule_id TEXT NOT NULL,
            km INTEGER NOT NULL,
            recorded_at TEXT NOT NULL,
            FOREIGN KEY (vehicule_id) REFERENCES vehicules(id) ON DELETE CASCADE
        );
}