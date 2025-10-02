// app/(app)/_layout.tsx
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from '@/components/Navigation';

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    Cairo: require('../../assets/fonts/Cairo-Regular.ttf'),
  });

  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('Token');
      if (!token) {
        router.replace('/(auth)/login'); // 👈 redirect to login
      } else {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  if (!fontsLoaded || !authChecked) return null;

  return (
    <PaperProvider theme={{ }}>
      <Navigation />
    </PaperProvider>
  );
}
