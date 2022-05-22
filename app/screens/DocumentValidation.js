import { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
    Keyboard,
    Image,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import * as ImagePicker from "expo-image-picker";
import { loginStack } from '../shared/styles/loginStack';
import { background, logo, text } from '../shared/styles/colors';
import * as ImageManipulator from 'expo-image-manipulator';
import { getUserData, uploadImage } from '../database/requests';
import * as Progress from 'react-native-progress';

let openGallery = async (setImageAction) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
    });
    if (!pickerResult.cancelled) {
        setImageAction({ localUri: pickerResult.uri });
    }
};

let openCamera = async (setImageAction) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 4]
    });
    if (!pickerResult.cancelled) {
        manipResult(pickerResult.uri, setImageAction);
    };
}

const execAction = (action, setImageAction) => {
    Vibration.vibrate(20);
    switch (action) {
        case 'gallery':
            openGallery(setImageAction);
            break;
        case 'camera':
            openCamera(setImageAction);
            break;
        default:
            break;
    }
}

const manipResult = async (imageUri, setImageAction) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 640 } }],
        { format: 'png' },
    );

    setImageAction(manipResult.uri);
}

const OptionsPicker = ({ setImageAction }) => {
    return (
        <View style={styles.optionsContainer}>
            <TouchableOpacity
                onPress={() => execAction("gallery", setImageAction)}
                activeOpacity={0.4}
                style={styles.imagePickerButton}
            >
                <MaterialIcons name="file-upload" size={24} color={text.attribute} />
                <Text style={styles.imagePickerDesc}>
                    Subir
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => execAction("camera", setImageAction)}
                activeOpacity={0.4}
                style={styles.imagePickerButton}
            >
                <MaterialIcons name="camera-alt" size={24} color={text.attribute} />
                <Text style={styles.imagePickerDesc}>
                    Usar cámara
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export const DocumentValidation = ({ navigation }) => {
    const [dniFrenteImage, setDniFrenteImage] = useState(null)
    const [dniFrenteUploadStatus, setDniFrenteUploadStatus] = useState(0)
    const [dniDorsoImage, setDniDorsoImage] = useState(null)
    const [dniDorsoUploadStatus, setDniDorsoUploadStatus] = useState(0)
    const [isValid, setIsValid] = useState(false)
    const [filesUploading, setFilesUploading] = useState(false)

    const submitForm = () => {
        Vibration.vibrate(20);

        getUserData().then(
            (userData) => {
                const userDocument = userData.document;
                uploadImage(setFilesUploading, dniFrenteImage.localUri, userDocument, userDocument + '_dni_frente' + '.png', setDniFrenteUploadStatus).then((response) => {
                    uploadImage(setFilesUploading, dniDorsoImage.localUri, userDocument, userDocument + '_dni_dorso' + '.png', setDniDorsoUploadStatus).then((response) => {
                        setFilesUploading(false);
                        navigation.navigate('FaceValidation');
                    }).catch((error) => {
                        setFilesUploading(false);
                        console.log(error);
                    });
                }).catch((error) => {
                    setFilesUploading(false);
                    console.log(error);
                })
            }
        );
    }

    useEffect(() => {
        if (dniFrenteImage && dniDorsoImage) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [dniFrenteImage, dniDorsoImage, setIsValid])


    return (
        <TouchableOpacity
            style={loginStack.otherMainView}
            onPress={Keyboard.dismiss}
            accessible={false}
            activeOpacity={1}
        >
            <View style={{ ...loginStack.formContainer, height: '90%' }}>
                <View style={{ ...loginStack.formContent }}>
                    <View style={{ width: "100%" }}>
                        <View style={{ width: "100%" }}>
                            <Text style={styles.optionsTitle}>Frente del DNI</Text>
                            {
                                dniFrenteImage ?
                                    <>
                                        <TouchableOpacity
                                            style={styles.restartBtn}
                                            onPress={() => { Vibration.vibrate(20), setDniFrenteImage(null), setDniFrenteUploadStatus(0) }}
                                        >
                                            <MaterialCommunityIcons
                                                name="restart"
                                                size={24}
                                                color={text.principal}
                                            />
                                        </TouchableOpacity>
                                        <Progress.Bar
                                            progress={dniFrenteUploadStatus}
                                            style={styles.progressBar}
                                            borderColor={logo.purple}
                                            color={logo.orange}
                                        />
                                        <View style={styles.imagePlace}>
                                            <Image
                                                source={{ uri: dniFrenteImage.localUri }}
                                                style={styles.pickerImage}
                                            />
                                        </View>
                                    </>
                                    :
                                    <OptionsPicker
                                        setImageAction={setDniFrenteImage}
                                    />
                            }
                        </View>
                        <View style={{ width: "100%", marginTop: 70 }}>
                            <Text style={styles.optionsTitle}>Dorso del DNI</Text>
                            {
                                dniDorsoImage ?
                                    <>
                                        <TouchableOpacity
                                            style={styles.restartBtn}
                                            onPress={() => { Vibration.vibrate(20), setDniDorsoImage(null), setDniDorsoUploadStatus(0) }}
                                        >
                                            <MaterialCommunityIcons
                                                name="restart"
                                                size={24}
                                                color={text.principal}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.imagePlace}>
                                            <Image
                                                source={{ uri: dniDorsoImage.localUri }}
                                                style={styles.pickerImage}
                                            />
                                        </View>
                                        <Progress.Bar
                                            progress={dniDorsoUploadStatus}
                                            style={styles.progressBar}
                                            borderColor={logo.purple}
                                            color={logo.orange}
                                        />
                                    </>
                                    :
                                    <OptionsPicker
                                        setImageAction={setDniDorsoImage}
                                    />
                            }
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            style={isValid ? loginStack.submitBtn : loginStack.submitBtnDisabled}
                            onPress={() => {
                                Vibration.vibrate(20);
                                submitForm();
                            }}
                            disabled={!isValid}
                        >
                            {
                                filesUploading ?
                                    <ActivityIndicator size="small" color={background.principal} />
                                    :
                                    <Text style={loginStack.submitBtnText}>Siguiente</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </TouchableOpacity >
    )
}


const styles = StyleSheet.create({
    optionsTitle: {
        fontFamily: 'Nunito-Bold',
        color: text.principal,
        fontSize: 20,
        position: 'absolute',
        top: -40,
        left: 0,
    },
    restartBtn: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: -40,
        right: 0,
    },
    optionsContainer: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#e6e6e6',
        borderWidth: 1,
    },
    imagePlace: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
        borderColor: text.placeholderInverted,
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden',
    },
    pickerImage: {
        width: '100%',
        height: '100%',
    },
    imagePickerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: text.placeholderInverted,
        borderWidth: 1,
        marginBottom: 30,
    },
    imagePickerDesc: {
        width: 100,
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        color: text.placeholder,
        position: 'absolute',
        bottom: -35,
        textAlign: 'center',
    },
    progressBar: {
        position: 'absolute',
        bottom: -20,
        width: '100%',
        height: "auto",
        borderRadius: 10,
        overflow: 'hidden',
    },
})