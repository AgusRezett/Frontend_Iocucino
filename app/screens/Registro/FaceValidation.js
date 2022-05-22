import { useState, useRef, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Vibration,
    Keyboard,
    Alert
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import { loginStack } from '../../shared/styles/loginStack';
import { background, logo, text } from '../../shared/styles/colors';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Audio } from 'expo-av';
import * as ImageManipulator from 'expo-image-manipulator';
import { updateUserStatus, uploadImage } from '../../database/requests';
import * as Progress from 'react-native-progress';

export const FaceValidation = ({ navigation, route }) => {
    const { userDocument } = route.params;

    const [faceDetected, setFaceDetected] = useState(false);
    const [sound, setSound] = useState();
    const [photosTaken, setPhotosTaken] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [filesUploading, setFilesUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    let cameraRef = useRef();

    const submitForm = () => {
        Vibration.vibrate(20);
        photosTaken.forEach(async (photo, index) => {
            await uploadImage(setFilesUploading, photo, userDocument, userDocument + '_face_' + index + '.png', setUploadProgress)
                .then(() => {
                    setFilesUploading(false);
                    updateUserStatus('account', 'unverified', navigation);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../../../assets/sounds/next_step.mp3'),
        );
        setSound(sound);
        await sound.playAsync();
    }

    const handleFacesDetected = (detections) => {
        if (detections.faces.length <= 1) {
            setFaceDetected(true);
        } else {
            setFaceDetected(false);
        }
    }

    const startPhotoSession = async () => {
        if (faceDetected) {
            Vibration.vibrate(20);
            handlePhoto();
            playSound();
        } else {
            Alert.alert('No face detected', 'Please take a photo with a face in it', [
                { text: 'OK' }
            ]);
        }
    }

    const handlePhoto = async () => {
        if (photosTaken.length < 3) {
            if (cameraRef) {
                const options = { quality: 1 };
                let photo = await cameraRef.current.takePictureAsync(options);
                manipResult(photo.uri, setPhotosTaken);
            }
        }
    }

    const manipResult = async (imageUri, setImageAction) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 640 } }],
            { format: 'png' },
        );
        setImageAction([...photosTaken, manipResult.uri]);
    }

    useEffect(() => {
        switch (photosTaken.length) {
            case 0:
                setCurrentStep(0);
                break;
            case 1:
                setCurrentStep(1);
                break;
            case 2:
                setCurrentStep(2);
                break;
            default:
                setCurrentStep(3);
                break;
        }
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [photosTaken, setCurrentStep, sound]);


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
                            <View style={styles.cameraViewer}>
                                <Camera style={styles.cameraContent}
                                    ref={cameraRef}
                                    type={Camera.Constants.Type.front}
                                    countDownSeconds={5}
                                    onFacesDetected={(e) => handleFacesDetected(e)}
                                    faceDetectorSettings={{
                                        mode: FaceDetector.FaceDetectorMode.fast,
                                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                                        runClassifications: FaceDetector.FaceDetectorClassifications.none,
                                        minDetectionInterval: 100,
                                        tracking: true,
                                    }}
                                />
                            </View>
                            <View style={styles.stepsContainer}>
                                <View style={styles.step}>
                                    <MaterialCommunityIcons
                                        name={currentStep === 0 ? "emoticon-happy-outline" : "emoticon-happy"}
                                        size={24}
                                        color={currentStep === 0 ? text.principal : currentStep > 0 ? "green" : text.placeholder} />
                                    <Text style={{ ...styles.stepDesc, color: currentStep === 0 ? text.principal : currentStep > 0 ? "green" : text.placeholder }}>
                                        Sonreí
                                    </Text>
                                </View>
                                <View style={styles.step}>
                                    <MaterialCommunityIcons
                                        name="chevron-double-left"
                                        size={24}
                                        color={currentStep === 1 ? text.principal : currentStep > 1 ? "green" : text.placeholder} />
                                    <Text style={{ ...styles.stepDesc, color: currentStep === 1 ? text.principal : currentStep > 1 ? "green" : text.placeholder }}>
                                        Mirá a tu izquierda
                                    </Text>
                                </View>
                                <View style={styles.step}>
                                    <MaterialCommunityIcons
                                        name="chevron-double-right"
                                        size={24}
                                        color={currentStep === 2 ? text.principal : currentStep > 2 ? "green" : text.placeholder} />
                                    <Text style={{ ...styles.stepDesc, color: currentStep === 2 ? text.principal : currentStep > 2 ? "green" : text.placeholder }}>
                                        Mirá a tu derecha
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        currentStep < 3 ?
                            <View style={{ width: "100%" }}>
                                <TouchableOpacity
                                    style={styles.takePictureBtn}
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        startPhotoSession();
                                    }}
                                >
                                    <View style={styles.takePictureBtnInside}></View>
                                </TouchableOpacity>
                            </View>
                            :
                            <>
                                <Progress.Bar
                                    progress={uploadProgress}
                                    style={{ width: '100%' }}
                                    color={logo.orange}
                                    borderColor={logo.orange}
                                />
                                <View style={{ width: "100%" }}>
                                    <TouchableOpacity
                                        style={{ ...loginStack.submitBtn, backgroundColor: uploadProgress == 100 ? logo.orange : logo.purple }}
                                        onPress={() => {
                                            Vibration.vibrate(20);
                                            submitForm();
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        {
                                            filesUploading ?
                                                <ActivityIndicator size="small" color={background.principal} />
                                                :
                                                uploadProgress == 100 ?
                                                    <Text style={loginStack.submitBtnText}>Finalizar</Text>
                                                    :
                                                    <Text style={loginStack.submitBtnText}>
                                                        Enviar
                                                    </Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </>
                    }
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
    cameraViewer: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#fff',
        borderColor: '#e6e6e6',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    cameraContent: {
        width: 250,
        height: 320,
    },
    captureBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    stepsContainer: {
        width: '100%',
        height: 200,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#e6e6e6',
        borderWidth: 1,
        marginTop: 40,
    },
    step: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
    },
    stepDesc: {
        fontFamily: 'Nunito-Regular',
        color: text.principal,
        fontSize: 18,
        marginLeft: 5,
        marginBottom: 2,
    },
    takePictureBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: '#e6e6e6',
        borderWidth: 5,

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    takePictureBtnInside: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },


    nextBtn: {
        width: '100%',
        height: 50,
        backgroundColor: logo.purple,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
});