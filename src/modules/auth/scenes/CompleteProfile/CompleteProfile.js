import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import moment from 'moment';

import { actions as auth } from "../../index"
const { createUser } = auth;

import Form from "../../components/Form"
import AuthContainer from "../../components/AuthContainer"
import firebase from 'react-native-firebase';

const fields = [
    {
        key: 'fname',
        label: "First Name",
        placeholder: "Firstname",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'lname',
        label: "Last Name",
        placeholder: "Lastname",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    }
];

const error = {
    general: "",
    username: ""
}

class CompleteProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log("Complete Profile User : ", props);
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        //attach user id
        const { user } = this.props;
        console.log("Complete Profile User : ", user);
        //data['uid'] = user.uid;
        data['email'] = firebase.auth().currentUser.email;
        data['key'] = firebase.auth().currentUser.uid;
        data['status'] = 'Active';
        data['createdAt'] = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        // or is this better firebase.firestore.FieldValue.serverTimestamp();
        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <AuthContainer>
                <Form fields={fields}
                      showLabel={false}
                      onSubmit={this.onSubmit}
                      buttonTitle={"CONTINUE"}
                      error={this.state.error}/>
            </AuthContainer>
        );
    }
}

export default connect(null, { createUser })(CompleteProfile);