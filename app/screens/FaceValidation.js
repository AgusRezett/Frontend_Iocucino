import { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Vibration,
    Keyboard,
    Image,
    Alert
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import * as ImagePicker from "expo-image-picker";
import { loginStack } from '../shared/styles/loginStack';
import { logo, text } from '../shared/styles/colors';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Audio } from 'expo-av';

export const FaceValidation = ({ navigation }) => {
    const [faceDetected, setFaceDetected] = useState(false);
    const [sound, setSound] = useState();
    const [photosTaken, setPhotosTaken] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    let cameraRef = useRef();

    const submitForm = () => {
        Vibration.vibrate(20);
        console.log(photosTaken);
        //AsyncSetSessionToken("patata");
        //navigation.navigate('ApplicationContent');
    }

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/next_step.mp3'),
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
                setPhotosTaken([...photosTaken, photo]);
            }
        }
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
                                    style={styles.nextBtn}
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        startPhotoSession();
                                    }}
                                >
                                    <Text style={loginStack.submitBtnText}>Comenzar</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ width: "100%" }}>
                                <TouchableOpacity
                                    style={loginStack.submitBtn}
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        submitForm();
                                    }}
                                >
                                    <Text style={loginStack.submitBtnText}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>
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