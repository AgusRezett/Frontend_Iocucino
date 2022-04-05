import { StyleSheet, Text, View, TextInput, Vibration, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Home from './views/Home';
import Login from './views/Login';

export default function App() {
  const [accountData, setAccountData] = useState({ email: '', password: '' })
  const [loaded] = useFonts({
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'GrapeNuts-Regular': require('./assets/fonts/GrapeNuts-Regular.ttf'),
  });

  return (
    <>
      {loaded ? (
        <>
          {!accountData.email ? (
            <Login logIn={(email, password) => {
              setAccountData({ email, password })
            }} />
          ) : (
            <Home logOut={() => {
              setAccountData({ email: '', password: '' })
            }} />
          )}
        </>
      ) : (
        <AppLoading />
      )}


    </>
  );
}

