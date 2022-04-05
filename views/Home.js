import { StyleSheet, Text, View, TextInput, Vibration, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';

export default function Home({ logOut }) {
    const [inputNormal, setInputNormal] = useState(styles.input)

    const [ingredientsList, setIngredientsList] = useState([])
    const [text, setText] = useState("")

    const [ingredientSelected, setIngredientSelected] = useState({})
    const [modalVisible, setModalVisible] = useState(false)

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={() => {
                setIngredientSelected(item)
                setModalVisible(true)
            }}
        >
            <Text style={styles.listItemText}>{item.value}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* logout button on top right corner */}
            <TouchableOpacity

                style={styles.logoutButton}
                onPress={() => {
                    Vibration.vibrate(100);
                    logOut();
                }}
            >
                <Ionicons name="ios-log-out" size={24} color="#fff" />
            </TouchableOpacity>

            <View
                style={styles.inputContainer}>
                <TextInput
                    style={inputNormal}
                    onBlur={() => setInputNormal(styles.input)}
                    onFocus={() => setInputNormal(styles.inputPress)}
                    onChangeText={newText => setText(newText)}
                    placeholderTextColor={'#9c9c9c'}
                    placeholder="Ingredient"
                    value={text}
                >
                </TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (text) {
                            setIngredientsList([...ingredientsList, { id: Math.random(), value: text }])
                            setText('')
                            Vibration.vibrate(50)
                        }
                    }}
                >
                    <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={ingredientsList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>


            <Modal
                transparent={true}
                animationType='slide'
                visible={modalVisible}>
                <View style={styles.modalCentered}>
                    <View style={styles.modalView}>
                        <View style={styles.cuerpoModal}>
                            <Text style={styles.textoTitulo}>¿Estás seguro que deseas eliminar el ingrediente {ingredientSelected.value}?</Text>
                        </View>
                        <View style={styles.botonModal}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setIngredientsList(ingredientsList.filter(ingredient => ingredient.id !== ingredientSelected.id))
                                    setModalVisible(false)
                                    Vibration.vibrate(50)
                                }}
                            >
                                <Text style={styles.botonModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
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
        width: "74%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#27282D",
        borderBottomWidth: 1,
    },
    input: {
        width: "85%",
        padding: 10,
        color: "#fff",
    },
    inputPress: {
        width: "85%",
        padding: 10,
        color: "#fff",
        borderBottomColor: "#fff",
        borderBottomWidth: 1
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        paddingRight: 20,
        backgroundColor: "transparent"
    },
    listContainer: {
        width: "75%",
        height: "50%",
        marginTop: 20,
        color: "#fff",
        borderColor: "#27282D",
        borderWidth: 1,
        borderRadius: 7,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        height: 60,
        borderBottomColor: "#27282D",
        borderBottomWidth: 1,
        overflow: "scroll"
    },
    listItemText: {
        color: "#fff",
        fontSize: 15,
    },
    listItemButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        paddingLeft: 20,
        backgroundColor: "transparent"
    },
    modalCentered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        borderWidth: 1,
        borderRadius: 20,
        width: 200,
        height: 200,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },
    cuerpoModal: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textoTitulo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    botonModal: {
        flex: 2,
        paddingBottom: 15,
        flexDirection: 'row',
        color: '#fff',
    }
});
