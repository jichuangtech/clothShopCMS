/**
 * Created by Bingo on 2017/6/5.
 */
var React = require("react");
import { connect } from 'react-redux';
import * as LoginAction from '../action/login';



var defUser = {
  email: '211'
};

class LoginRoot extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            isModalVisible: false,
            email:"",
            password:""
        }
    }

    render() {
        console.log(" 登录提示 :" + this.props.loginProps.tip + ", status: " + this.props.loginProps.status);
        if(!(this.props.loginProps.status == "ing")
            && !(this.props.loginProps.status == "unknown")) {
            alert(" 登录提示 :" + this.props.loginProps.tip + ", status: " + this.props.loginProps.status);
        }
        return (
            <div>
                <h2 onClick={this.__onclick.bind(this)}>你好 {this.props.loginProps.tip}</h2>
            </div>
        );

    }

    __onclick() {
        alert("我被点击了");
        var loginValue = {
            email: "5753",
            password:"2232"
        };
        this.props.dispatch(LoginAction.login(loginValue));
    }

}

//state 对象，就是经过 combineReducers()创建出来的
const mapStateToProps = state => ({
    loginProps: state.loginReducer
})



export default connect(mapStateToProps)(LoginRoot);