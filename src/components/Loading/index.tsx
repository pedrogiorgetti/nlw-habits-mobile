import { ActivityIndicator, View } from "react-native";

export function ComponentLoading() {
  return (
    <View style={{ backgroundColor: "#09090A", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={24} color="#7C3AED" />
    </View>
  )
};