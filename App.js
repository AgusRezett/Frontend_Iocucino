import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Vibration } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage} onPress={() => Vibration.vibrate(50)}>Hola, Coder!</Text>
      <Text style={styles.newText}>Primer Commit</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeMessage: {
    fontSize: 24,
    color: "#D9D9D9",
    backgroundColor: "#1E1E1E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  newText: {
    fontSize: 18,
    color: "#D9D9D9",
    borderRadius: 7,
    marginTop: 15,
  },
});
