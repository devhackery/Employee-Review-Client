 

 
 
//Register the user using email and password
// export function register(data, callback) {
//     const { email, password } = data;
//     auth.createUserWithEmailAndPassword(email, password)
//         .then((user) => callback(true, user, null))
//         .catch((error) => callback(false, null, error));
// }

//Register the user using email and password - firestore
// export function register(data, callback) {
//     const { email, password } = data;
//     auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
//         .then((ref) => {
//             console.log('Ref User: ', ref);
//             if (ref != null) {
//                 const curUser = ref.user;
//                 console.log('Current User: ', curUser);
//                 database.collection('users').doc(curUser.uid).set({uid: curUser.uid, status: 'Active'}) // do I need this???
//                 .then(objRef => {
//                     console.log('New User 11: ', curUser, objRef);
//                     callback(true, objRef, null)
//                 }).catch((error) => callback(false, null, error));
//             } else {
//                 callback(false, null, error);
//             }
//         }).catch((error) => callback(false, null, error));
// }

export function register(data, callback) {
    const { email, password } = data;
    
}

//Create the user object in realtime database
// export function createUser (user, callback) {
//     database.ref('users').child(user.uid).update({ ...user })
//         .then(() => callback(true, null, null))
//         .catch((error) => callback(false, null, {message: error}));
// }

//Create the user object in firebase firestore
export function createUser(user, callback) {
     
}

// Sample:
// firebase.auth()
//   .signInAnonymouslyAndRetrieveData()
//   .then(credential => {
//     if (credential) {
//       console.log('default app user ->', credential.user.toJSON());
//     }
//   });

// issues:
// https://github.com/invertase/react-native-firebase/issues/862
// https://github.com/invertase/react-native-firebase/commit/a6734fa4397271726219d8ebf22bed90b31d380c

//Sign the user in with their email and password
// const { user } = await auth().signInAndRetrieveDataWithCredential(credential);
export function login(data, callback) {
    const { email, password } = data;
  
}

//Get the user object from the realtime database
// export function getUser(user, callback) {
//     database.ref('users').child(user.uid).once('value')
//         .then(function(snapshot) {

//             const exists = (snapshot.val() !== null);

//             //if the user exist in the DB, replace the user variable with the returned snapshot
//             if (exists) user = snapshot.val();

//             const data = { exists, user }
//             callback(true, data, null);
//         })
//         .catch(error => callback(false, null, error));
// }

//Get the user object from the firebase firestore
export function getUser(user, callback) {
    
}


//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
 
}

//Sign user in using Facebook
export function signInWithFacebook (fbToken, callback) {
  
     
}

export function signOut (callback) {
    
}