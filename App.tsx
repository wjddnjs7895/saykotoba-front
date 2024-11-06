import "./gesture-handler";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigations/DrawerNavigator";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/lib/api";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaProvider>
          <DrawerNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
