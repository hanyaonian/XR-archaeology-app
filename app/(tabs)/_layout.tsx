import { NavBar } from "@components";
import { Tabs } from "expo-router/tabs";
import { HomeIcon, ExploreIcon, SettingIcon } from "@components/icons";
import { Routes } from "../composable/routes";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: null,
      }}
      tabBar={(props) => <NavBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: Routes.Home,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <HomeIcon fill={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          href: Routes.Map,
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => <ExploreIcon fill={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          href: Routes.Account,
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => <SettingIcon fill={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
