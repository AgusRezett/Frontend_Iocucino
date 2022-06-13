
import { auth, firebase } from "./firebase";
import { Alert } from "react-native";

export const getUserData = async () => {
    const userData = await firebase.firestore().collection('users').doc(auth.currentUser.uid).get()
        .then(
            (doc) => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    Alert.alert('Error', 'No se pudo obtener los datos del usuario');
                    return null;
                }
            }
        );
    return userData;
}

export const createNewUser = async (userData, navigation, setRegisterLoading) => {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(async () => {
            await firebase.firestore().collection('users').doc(`${auth.currentUser.uid}`).set({
                name: userData.name,
                surname: userData.surname,
                country: userData.country,
                phone: userData.phone,
                document: userData.document,
                gender: userData.gender,
                status: {
                    account: 'created',
                    email: 'unverified',
                    phone: 'unverified'
                },
                photoUrl: ''
            }).then(() => {
                // login
                auth.signInWithEmailAndPassword(userData.email, userData.password)
                    .then(() => {
                        setRegisterLoading(false);
                        navigation.navigate('Validation');
                    })
            }).catch(error => {
                console.error("Error adding document: ", error);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateUserStatus = async (statusKey, statusValue, navigation) => {
    getUserData().then(async (userData) => {
        const newStatus = { ...userData.status, [statusKey]: statusValue };

        await firebase.firestore().collection('users').doc(`${auth.currentUser.uid}`).update({
            status: newStatus
        }).catch(error => {
            console.error("Error updating document: ", error);
        });
    });
}

export const uploadImage = async (setFilesUploading, imageUri, userDocument, imageName, changeUploadStatus) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`/${userDocument}-validation`).child(`${imageName}`);
    const task = ref.put(blob);

    return new Promise((resolve, reject) => {
        task.on('state_changed',
            snapshot => {
                setFilesUploading(true);
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                changeUploadStatus(progress);
            },
            error => {
                reject(error);
            },
            () => {
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                    resolve(downloadURL);
                });
            });
    });
}