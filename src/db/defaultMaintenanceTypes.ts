import { createMaintenanceType } from "./maintenance" ; 


const DEFAULT_TYPES = [ 
    { name: 'Vidange' , icon: 'oil-can' , interval_km: 10000 }, 
    { name: 'Pneus / rotation' , icon: 'titre' , interval_km:20000 },
    { name: "Filtre a air" , icon: 'air-filter' , interval_km:15000 },
    { name: 'Courroie' , icon: 'belt' , interval_km:60000 },
]

export function createDefaultmaintenanceTypes(vehicleId: string): void {
    for (const type of DEFAULT_TYPES) {
        createMaintenanceType({
            vehicle_id: vehicleId, 
            name: type.name, 
            icon: type.icon, 
            interval_km: type.interval_km,
            is_custom: false,
        });
    }
}


