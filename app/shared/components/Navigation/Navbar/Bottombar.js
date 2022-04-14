import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Styles

export default function Bottombar({ state, descriptors, navigation }) {
    /* return (
        <View style={[styles.navbarContainer, styles.navbarShadow]}>
            <View style={styles.navbarContent}>
                <Text style={styles.navbarBrand}>Mino</Text>
            </View>
        </View>
    ); */
    return (
        <View style={[styles.navbarContainer, styles.navbarShadow]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.navbarItem}
                    >
                        <Text style={{ color: isFocused ? '#000' : '#000' }}>
                            {label}
                        </Text>
                        <View
                            style={isFocused ? styles.navbarItemActive : null}
                        ></View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}



const styles = StyleSheet.create({
    navbarContainer: {
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navbarShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 15,
    },
    navbarItem: {
        position: "relative",
        width: 20,
        height: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    navbarItemActive: {
        position: "absolute",
        bottom: 0,
        width: 1,
        height: 1,
        width: "100%",
        backgroundColor: '#3d0052',
    },
});