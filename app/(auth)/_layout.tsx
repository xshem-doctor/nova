import { useFonts } from 'expo-font';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    background: '#ffffff', // 👈 light background
    surface: '#ffffff',
    text: '#222222',       // 👈 dark readable text
    onSurface: '#222222',
    placeholder: '#888888',
  },
  
};
export default function AuthLayout() {
  const [fontsLoaded] = useFonts({
    Cairo: require('../../assets/fonts/Cairo-Regular.ttf'),
  });

  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('Token');
      if (token) {
        router.replace('/(core)/home');
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  if (!fontsLoaded || !authChecked) return null;

  return (
    <PaperProvider theme={theme}>
      <Slot />
    </PaperProvider>
  );
}
