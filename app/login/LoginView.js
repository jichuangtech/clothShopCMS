import React from 'react';
import { Provider } from 'react-redux';
import LoginRoot from './LoginRoot';
import store from '../store/index';

class LoginView extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoginRoot/>
            </Provider>
        );
    }
}

module.exports =  LoginView;