import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Components
import { useNavigation } from '@react-navigation/native';
import { AsyncSetSessionToken } from '../functions/GlobalFunctions';

// Components
import { LoginForm, RegisterForm } from '../shared/components/login/FormContainer';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Login() {
    return (
        <Stack.Navigator
            initialRouteName='LoginForm'
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Nunito-Regular',
                    fontSize: 18,
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#000000',
                },
                headerStyle: {
                    width: '75%',
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 0,
                    elevation: 0,
                },
                headerTintColor: '#000000',
            }}
        >
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="RegisterForm" component={RegisterForm}
                options={{
                    gestureEnabled: true,
                    gestureDirection: "horizontal-inverted"
                }}

            />
            {/* <View style={styles.loginView}>
                <FormContainer />
            </View> */}
        </Stack.Navigator>
    )
}
