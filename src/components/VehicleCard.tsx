import { View, Text, TouchableOpacity } from 'react-native';
import { Vehicle } from '../db/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  status: 'ok' | 'warning' | 'overdue';
  onPress: () => void;
}

const STATUS_STYLES = {
  ok: { bg: 'bg-status-ok', label: 'Bon état' },
  warning: { bg: 'bg-status-warning', label: 'Bientôt' },
  overdue: { bg: 'bg-status-overdue', label: 'À faire' },
};

export default function VehicleCard({ vehicle, status, onPress }: VehicleCardProps) {
  const statusStyle = STATUS_STYLES[status];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-card rounded-2xl p-4 mb-3"
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-lg font-semibold">{vehicle.name}</Text>
        <View className={`${statusStyle.bg} px-2.5 py-1 rounded-full`}>
          <Text className="text-black text-xs font-semibold">{statusStyle.label}</Text>
        </View>
      </View>
      <Text className="text-gray-400 text-sm mb-2">
        {vehicle.brand} {vehicle.model}
      </Text>
      <Text className="text-accent text-base font-semibold">
        {vehicle.current_km.toLocaleString()} km
      </Text>
    </TouchableOpacity>
  );
}