import React from 'react'; 
import { connect } from 'react-redux';
//import { Facebook } from 'expo';

import { actions as auth, constants as c } from "../../index"
const { signInWithFacebook } = auth;

import styles from "./styles"
import AuthContainer from "../../components/AuthContainer"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}


        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
    }


    //get users permission authorization (ret: facebook token)
    async onSignInWithFacebook() {
        // const options = {permissions: ['public_profile', 'email'],}
        // const {type, token} = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, options);

        // if (type === 'success') {
        //     this.props.signInWithFacebook(token, this.onSuccess, this.onError)
        // }
    }

    onSuccess({ exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({ user })
    }

    onError(error) {
        alert(error.message);
    }

    render() {
        return (
          <div>Welcome PAGE</div>
        );
    }
}


export default connect(null, {  signInWithFacebook })(Welcome);