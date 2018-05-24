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
             <div>HOME PAHE</div>
        );
    }
}

export default connect(null, { signOut })(Home);