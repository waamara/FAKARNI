import { useCallback, useState } from "react"; 
import { View , Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView} from 'react-native-safe-area-context'; 
import VehicleCard  from "../components/VehicleCard"; 
import { getAllVehicles } from "../db/vehicles"; 
import { getMaintenanceTypesByVehicle } from "../db/maintenance"; 
import { getMaintenanceStatus, MaintenanceStatus } from "../utiles/maintenanceStatus"; 

