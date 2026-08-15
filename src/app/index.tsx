import { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';

import VehicleCard from '../components/VehicleCard';
import { getAllVehicles, Vehicle } from '../db/vehicles';
import { getMaintenanceTypesByVehicle } from '../db/maintenance';
import { getMaintenanceStatus, MaintenanceStatus } from '../utils/maintenanceStatus';

function getWorstStatus(vehicle: Vehicle): MaintenanceStatus {
  const types = getMaintenanceTypesByVehicle(vehicle.id);
  if (types.length === 0) return 'ok';

  let worst: MaintenanceStatus = 'ok';
  for (const type of types) {
    const { status } = getMaintenanceStatus(type, vehicle.current_km);
    if (status === 'overdue') return 'overdue';
    if (status === 'warning') worst = 'warning';
  }
  return worst;
}

export default function VehiclesHomeScreen() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useFocusEffect(
    useCallback(() => {
      setVehicles(getAllVehicles());
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-5 pt-4 pb-2">
        <Text className="text-white text-2xl font-bold">Fakarni</Text>
      </View>

      <View className="px-5 mb-2">
        <Text className="text-white text-xl font-semibold">Mon garage</Text>
        <Text className="text-gray-400 text-sm">Gère tes véhicules et leur entretien</Text>
      </View>

      {vehicles.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-gray-400 text-center text-base mb-4">