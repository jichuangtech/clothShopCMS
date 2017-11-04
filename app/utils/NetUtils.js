var React = require("react");

const defaultToken = "123456";
class NetUtils extends React.Component {
    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJson(url, data, successCallback, failCallback, errorCallback) {
        console.log("postJson url: " + url + ", data: " + JSON.stringify(data));
        let token = sessionStorage.getItem("access_token");
        if (token === null || token === undefined) {
            token = defaultToken;
        }
        var fetchOption = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOption)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            }, function (failMsg) {
                failCallback(failMsg)
            }).catch(function (error) {
            errorCallback(error)
        });
    }

    /**
     * post请求
     * url : 请求地址
     * data : 参数(Json对象)
     * callback : 回调函数
     * */
    static postJsonWithFile(url, data, successCallback, failCallback, errorCallback) {
        console.log("postJson url: " + url + ", data: " + JSON.stringify(data));
        let token = sessionStorage.getItem("access_token");
        if (token === null || token === undefined) {
            token = defaultToken;
        }
        var formData = new FormData();

        for (var name in data) {
            formData.append(name, data[name]);
        }

        var fetchOption = {
            method: 'POST',
            body: formData
        };

        fetch(url, fetchOption)
            .then((data) => {
                successCallback(data);
            }, function (failMsg) {
                failCallback(failMsg)
            }).catch(function (error) {
            errorCallback(error)
        });
    }

    /*
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */

    static get(url, params, successCallback, failCallback, errorCallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        let token = sessionStorage.getItem("access_token");
        if (token === null || token === undefined) {
            token = defaultToken;
        }
        //fetch请求
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            successCallback(responseJson);
        }, function (failMsg) {
            if (failCallback) {
                failCallback(failMsg)
            } else {
                console.log("failMsg:::");
                console.log(failMsg);
            }
        }).catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log("errorCallback:::");
                console.log(error);
            }
        });
    }

    /**
     * 返回数据不解析成对象
     * @param url
     * @param params
     * @param successCallback
     * @param failCallback
     * @param errorCallback
     */
    static getNormal(url, params, successCallback, failCallback, errorCallback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        let token = sessionStorage.getItem("access_token");
        if (token === null || token === undefined) {
            token = defaultToken;
        }
        //fetch请求
        fetch(url, {
            method: 'GET'
        }).then((responseJson) => {
            successCallback(responseJson);
        }, function (failMsg) {
            if (failCallback) {
                failCallback(failMsg)
            } else {
                console.log("failMsg:::");
                console.log(failMsg);
            }
        }).catch((error) => {
            if (errorCallback) {
                errorCallback(error);
            } else {
                console.log("errorCallback:::");
                console.log(error);
            }
        });
    }

    /*
     *  delete请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */

    static delete(url, params, successCB, failCB) {
        let token = sessionStorage.getItem("access_token");
        if (token === null || token === undefined) {
            token = "";
        }
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url, {
            method: 'DELETE',
        }).then((response) => response.json())
            .then((responseJson) => {
                successCB(responseJson);
            }).catch((error) => {
            failCB(error)
        });
    }
}


/*  第一种：'Content-Type': 'application/json'
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
 *  callback:回调函数
 * */
const postJSON = function (url, params, callback) {
    //fetch请求
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log("error = " + error)
        });
}

/*  第二种： form表单形式
 *  post请求
 *  url:请求地址
 *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
 *  callback:回调函数
 * */
const postForm = function (url, params, callback) {
    //fetch请求
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            callback(responseJSON)
        })
        .catch((error) => {
            console.log("error = " + error)
        });

}

module.exports = NetUtils;


//将JSON数据转换成字符串
//JSON.stringify(params)

//将数据JSON化
//JSON.parse(responseJSON)