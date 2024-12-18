import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import IconWrapper from "@/components/IconWrapper";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].color3,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarLabelStyle: {
          color: Colors.light.color3, // Cambia el color del texto aquí
          
        },
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="explore2"
        options={{
          title: "Repaso",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={18} name="book.fill" color={Colors.light.color3} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconWrapper>
              <IconSymbol size={28} name="house.fill" color={color} />
              <Text style={{color:color,fontSize:10}}>Home</Text>
            </IconWrapper>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Aprendizaje",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={18} name="graduationcap.fill" color={Colors.light.color3} />
          ),
        }}
      />
    </Tabs>
  );
}
