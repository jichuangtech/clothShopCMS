import React from 'react';
import { Provider } from 'react-redux';
import LoginRoot from './LoginRoot';
import store from '../store/index';

class LoginView extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoginRoot history={this.props.history}/>
            </Provider>
        );
    }
}

module.exports =  LoginView;