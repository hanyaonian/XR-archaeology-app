import * as React from "react";
import { AuthProvider } from "../providers/auth_provider";
import { customFonts, theme } from "../styles";
import { Stack } from "expo-router";

import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AppWrapperNonSync } from "../providers/db_provider";
import { AppWrapperSync } from "../providers/db_sync_provider";
import { SYNC_CONFIG } from "../sync.config";

export default function RootLayout() {
  const [loadedFont, error] = useFonts(customFonts);
  if (!loadedFont) return null;
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AppWrapperSync appId={SYNC_CONFIG.appId}>
              <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="search_result" options={{}} />
                <Stack.Screen name="category" options={{}} />
                <Stack.Screen name="detail" options={{}} />
              </Stack>
              <StatusBar style="light" />
            </AppWrapperSync>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
