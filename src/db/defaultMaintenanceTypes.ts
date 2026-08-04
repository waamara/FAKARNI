import { createMaintenanceType } from "./maintenance" ; 


const DEFAULT_TYPES = [ 
    { name: 'Vidange' , icon: 'oil-can' , interval_km: 10000 }, 
    { name: 'Pneus / rotation' , icon: 'titre' , interval_km:20000 },
    { name: "Filtre a air" , icon: 'air-filter' , interval_km:15000 },
    { name: 'Courroie' , icon: 'belt' , interval_km:60000 },
]


