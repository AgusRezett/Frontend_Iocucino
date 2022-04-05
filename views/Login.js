import { StyleSheet, Text, View, TextInput, Vibration, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';

export default function Login({ logIn }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // validate email and password before login
    const validate = () => {
        if (email && password) {
            logIn(email, password)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9c9c9c"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9c9c9c"
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        validate()
                    }}
                >
                    <Ionicons name="ios-arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
    input: {
        width: '80%',
        fontSize: 18,
        color: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderBottomColor: '#9c9c9c',
        fontFamily: 'Roboto-Regular',
    },
    button: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00a680',
        marginTop: 20,
        borderRadius: 50,
        height: 40,
    }
});
