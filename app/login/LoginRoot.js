/**
 * Created by Bingo on 2017/6/5.
 */
var React = require("react");
import { connect } from 'react-redux';
import * as LoginAction from '../action/login';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "unknown",
            password: "**"
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        alert("状态: " + this.props.loginProps.status)
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.__submitBtn.bind(this)}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        );
    }

    __submitBtn() {
        var loginValue = {
            email:this.state.email,
            password:this.state.password
        };
        this.props.dispatch(LoginAction.login(loginValue));
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


//state 对象，就是经过 combineReducers()创建出来的
const mapStateToProps = state => ({
    loginProps: state.loginReducer
})



export default connect(mapStateToProps)(WrappedNormalLoginForm);