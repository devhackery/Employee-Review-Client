import React from 'react';
var { ScrollView, View, StyleSheet, Alert, Text } = require('react-native');

import {PricingCard, Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import firebase from "../../../../config/firebase"
const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log ('props UID@constructor', this.props);

        console.log('Loggedin use: ', firebase.auth().currentUser.uid);
        console.log('Loggedin user Email,: ', firebase.auth().currentUser.email);
        //var userRef = firebase.firestore().collection('users').where('email', '==', firebase.auth().currentUser.email);
        // var userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
        // console.log('Loggedin uses clients : ', userRef);
        
        // userRef.get().then(function(doc) {
        //     if (doc.exists) {
        //         const {uid, fname, email, status} = doc.data();
        //         let myClents = firebase.firestore().collection('users').doc(uid).collection('clients');
        //         console.log("Clients:", myClents);
        //         console.log("Document data:", doc.data());
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function(error) {
        //     console.log("Error getting document:", error);
        // });

        this.curCol = firebase.firestore().collection("clients").where("sponsorID", "==", firebase.auth().currentUser.uid);
        
        // .get()
        // .then(function(querySnapshot) {
        //     console.log("Clients Count: ", querySnapshot.size);
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         const {fname, email, status} = doc.data();
        //         console.log('Client :', fname);
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });
        

        // myClents.get()
        // .then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         const {fname, email} = doc.data();
        //         console.log(doc.id, " => ", doc.data());
        //         console.log('User Name: ', fname, name.first);
        //         // this.curUser.push({
        //         //     fname,
        //         //     email
        //         // });
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });

        this.state = {
          loading: true,
          totClients: 0,
          actvClients: 0,
          inactvClients: 0,
        };

        this.onSignOut = this.onSignOut.bind(this);
    }

    componentDidMount () {
        this.unsubscribe =  this.curCol.onSnapshot(this.onCollectionUpdate);
    }
    
    componentWillUnmount () {
        this.unsubscribe ();
    }

    onCollectionUpdate = querySnapshot => {
        let aCnt = 0;
        let inAct = 0;
        let tCnt = 0;
    
        querySnapshot.forEach (doc => {
          const {fname, email, status} = doc.data ();
          console.log('Client Name: ', fname);
          tCnt++; // total client count
    
          if (status == 'Active') {
            // console.log('Active Client Name: ', fname);
            aCnt++;
          } else if (status == 'Inactive') {
            inAct++;
          }
        });
        console.log('Active Client Count: ', aCnt);
        console.log('Inactive Client Count: ', inAct);
        console.log('Total Client Count: ', tCnt);
    

        // setting state
        this.setState ({
          loading: false,
          totClients: tCnt,
          actvClients: aCnt,
          inactvClients: inAct,
        });
    };

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {

        // Graph Pie data
        const piedata = [
            {x: 'Active', y: this.state.actvClients},
            {x: 'Inactive', y: this.state.inactvClients},
        ];
  
         if (this.state.loading) {
            return (
                <View>
                    <Text>loading... Dashboard</Text>
                </View>
            );
        }

        return (
            <ScrollView>
                {/* <Card title="MEMBERS">
                    <VictoryPie
                        style={{
                            flex: 1,
                            labels: {
                                fill: 'white',
                                stroke: 'none',
                                fontSize: 15,
                                fontWeight: 'normal',
                            },
                        }}
                        innerRadius={90}
                        labelRadius={100}
                        colorScale={['#7fd553', '#b8b8b8']}
                        padAngle={3}
                        padding={{right: 85}}
                        data={piedata}
                        //data = {[{ x: "Active", y: this.state.actvClients},
                        //{ x: "Inactive", y: this.state.inactvClients }]}
                        animate={{duration: 1500}}
                    />
                </Card> */}
                <PricingCard
                    color="#43a1f8"
                    title="This Week"
                    price={this.state.totClients}
                    info={['User', 'Renewals']}
                    button={{title: ' View All', icon: 'flight-takeoff'}}
                />
            <View style={styles.container}>
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
            </ScrollView>
        );
    }
}

export default connect(null, { signOut })(Home);