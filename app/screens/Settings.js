
//Components
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { ActionButton } from '../shared/components/common/ActionButton';

// Styles

// Funtions
//import { getSelectedBadges } from '../functions/HomeFunctions';

export default function Settings() {
    return (
        <View style={styles.container}>
            <View style={styles.settingsActionsContainer}>
                <Text style={styles.carouselTitle}>Preferencias</Text>
                <View style={styles.actionsContainer}>
                    <ActionButton title="Mis divisas" />
                    <ActionButton title="Interfaz" />
                    <ActionButton title="Idioma y región" />
                </View>
            </View>
            <View style={styles.settingsActionsContainer}>
                <Text style={styles.carouselTitle}>Seguridad</Text>
                <View style={styles.actionsContainer}>
                    <ActionButton title="Dispositivos activos" />
                    <ActionButton title="Verificacióon de dos pasos" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#faf9f9',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    settingsActionsContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
    },
    actionsContainer: {
        width: '100%',
        height: 'auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    carouselTitle: {
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        color: '#323232',
    },
});
