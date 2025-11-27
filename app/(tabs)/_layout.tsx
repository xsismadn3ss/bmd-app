import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { HomeHeader } from "@/components/home/header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTranslation } from "@/context/LanguageContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const t = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerTitle: () => <HomeHeader />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="option" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
