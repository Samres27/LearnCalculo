import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import {app} from "@/firestoreConfig"
import { useColorScheme } from '@/hooks/useColorScheme';
import { getAuth, onAuthStateChanged,User } from 'firebase/auth';
import { Colors } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
const auth = getAuth(app);
SplashScreen.preventAutoHideAsync();
const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: Colors['light'].color5,
    border: Colors['light'].color5, 
  },
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);  // Tipado explícito
  const [initializing, setInitializing] = useState(true);
  const pathname = usePathname();  // Para conocer la ruta actual
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (!initializing) {
      if (user && pathname === '/login') {
        router.replace('/');
      } else if (!user && pathname !== '/login') {
        router.replace('/login');
      }
    }
  }, [user, initializing, pathname]);
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// import { useEffect, useState } from 'react';
// import { Stack, router, usePathname } from 'expo-router';
// import { getAuth, onAuthStateChanged,User } from 'firebase/auth';
// import { getApps, initializeApp } from 'firebase/app';
// import {app} from "@/firestoreConfig"


// export default function RootLayout() {
//   const [user, setUser] = useState<User | null>(null);  // Tipado explícito
//   const [initializing, setInitializing] = useState(true);
//   const pathname = usePathname();  // Para conocer la ruta actual

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (user) => {
//   //     setUser(user);  // user puede ser null o de tipo User

//   //     if (initializing) {
//   //       if (user && pathname === '/login') {
//   //         router.replace('/');  // Redirige al home si está autenticado
//   //       } else if (!user && pathname !== '/login') {
//   //         router.replace('/login');  // Redirige al login si no está autenticado
//   //       }
//   //       setInitializing(false);
//   //     }
//   //   });

//   //   return () => unsubscribe();
//   // }, [initializing, pathname]);

//   // if (initializing) return null;  // Evita parpadeos mientras verifica el estado

//   return (
//     <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       {/* <Stack.Screen name="login" options={{ headerShown: false }} /> */}
//     </Stack>
//   );
// }