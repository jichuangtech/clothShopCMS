import React from 'react';

import * as LoginType from '../constant/loginType';
import * as RegisterType from '../constant/registerType';

let skipUser = {
  'name' : 'bingo',
    'age' : '26'
};

let testUser = {
    'name' : 'linlin',
    'age' : '26'
};

//login
export function login(opt) {
    console.log(" login, email: " + opt.email + ", password: " + opt.password);
    return (dispatch)=> {
        //先发送登录中的状态
        dispatch({ type : LoginType.LOGGED_ING});

        var loginValue = {
            email : opt.email,
            password : opt.password
        };
        //
        // //进行网络请求
        // NetUtils.postJson('https://www.guufar.com/api/user/login',
        //     loginValue,
        //     function (success) {
        //         if(success.code != null && success.code == 200) {
        //             dispatch({ type : LoginType.LOGGED_IN});
        //         } else {
        //             dispatch({ type : LoginType.LOGGED_ERROR, tip: success.message});
        //         }
        //
        //     }, function (error) {
        //         dispatch({ type : LoginType.LOGGED_ERROR, tip: error.message});
        //     });

    }

}

export function register(opt) {

    return (dispatch)=> {
        //先发送登录中的状态
        dispatch({ type : RegisterType.REGISTER_ING});

        //进行网络请求
        // fetch('http://www1.baidu1.com')
        //     .then((res) => {
        //         dispatch({ type : LoginType.LOGGED_IN, user : testUser});
        //     })
        //     .catch((error) => {
        //         dispatch({ type : LoginType.LOGGED_ERROR, error : error});
        //     })
        //     .done();

        var registerValue = {
            email: opt.email,
            password: opt.password,
            username: opt.username,
        };
        // NetUtils.postJson('https://www.guufar.com/api/user/register',
        //     registerValue,
        //     function (success) {
        //         dispatch({ type : RegisterType.REGISTER_SUCCESS});
        //     }, function (error) {
        //         dispatch({ type : RegisterType.REGISTER_FAIL});
        //     });

    }
}

export function skipUser() {
    return {
        type : LoginType.LOGGED_IN,
        user : skipUser
    }
}

export function loging() {
    return {
        type : LoginType.LOGGED_ING,
    }
}

export function logout() {
    return {
        type : LoginType.LOGGED_OUT,
    }
}

