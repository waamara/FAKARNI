import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'; 
import { Vehicle } from '../db/vehicles'; 

interface VehicleCardProps {
    vehicle: Vehicle; 
    status: 'ok' | 'warning' | 'overdue'; 
    onPress: () => void;
} 

