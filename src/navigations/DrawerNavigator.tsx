import { createDrawerNavigator } from "@react-navigation/drawer";
import ConversationScreen from "@screens/ConversationScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureHandlerProps: {
          enabled: true,
        },
        swipeEdgeWidth: 200,
        drawerContentStyle: { paddingBottom: 0 },
      }}
    >
      <Drawer.Screen name="conversation" component={ConversationScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
