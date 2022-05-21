import * as firebase from "firebase";
import { auth } from "./firebase";

export const getUserData = async () => {
    await firebase.firestore().collection('users').doc(auth.currentUser.uid).get().then(doc => {
        if (doc.exists) {
            console.log('Document data:', doc.data());
            return doc.data();
        } else {
            return null;
        }
    }).catch(error => {
        //console.log("Error al conseguir los datos del usuario");
        console.log(error);
    });
}

export const createNewUser = async (userData) => {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(async () => {
            await firebase.firestore().collection('users').add({
                name: userData.name,
                surname: userData.surname,
                country: userData.country,
                phone: userData.phone,
                document: userData.document,
                uid: auth.currentUser.uid,
                verified: false
            }).then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            }).catch(error => {
                console.error("Error adding document: ", error);
            });
        })
        .catch(error => {
            Alert.alert('Error', error.message, [{ text: 'OK' }], { cancelable: false });
            //console.log(error);
        });
}