import React from 'react';
import SignupButton from './components/signup-button';
import LoginButton from './components/login-button';

class Form extends React.Component {
    render() {
        return (
            <form>
                <label>Username<input></input></label>
                <label>Password<input type="password"></input></label>
                <SignupButton />
                <LoginButton />
            </form>
        );
    }
}

export default Form;
