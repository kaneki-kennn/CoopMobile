import React from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    'poppins-bold': require('./../assets/fonts/Poppins-Bold.ttf'),
    'poppins-extrabold': require('./../assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-light': require('./../assets/fonts/Poppins-Light.ttf'),
    'poppins-regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    'poppins-semibold': require('./../assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-semibolditalic': require('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'poppins-lightitalic': require('./../assets/fonts/Poppins-LightItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null; // You can also return a loading spinner here if you prefer
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="Login"/>
      <Stack.Screen name="Dashboard"/>
      <Stack.Screen name="CreateAccount"/>
    </Stack>
  );
}
