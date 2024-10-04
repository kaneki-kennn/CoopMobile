import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {

  useFonts ({
    'poppins-bold':require ('./../assets/fonts/Poppins-Bold.ttf'),
    'poppins-extrabold':require ('./../assets/fonts/Poppins-ExtraBold.ttf'),
    'poppins-light':require ('./../assets/fonts/Poppins-Light.ttf'),
    'poppins-regular':require ('./../assets/fonts/Poppins-Regular.ttf'),
    'poppins-semibold' : require ('./../assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-semibolditalic' : require ('./../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'poppins-lightitalic' : require ('./../assets/fonts/Poppins-LightItalic.ttf'),


  })
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
