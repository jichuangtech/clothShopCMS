import {Select} from 'antd';
var React = require("react");
import {message} from "antd";

const Option = Select.Option;

/**
 *  this.props.options = [
 *      {
 *          "value": "xxx1",
 *          "title": "xxx1",
 *      },
 *      {
 *          "value": "xxx2",
 *          "title": "xxx2",
 *      }
 *  ]
 *
 */
class SelectView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: "",
            optionViews:[]
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <Select value={this.state.defaultValue}
                        style={{ width: 120 }}
                        onChange={this.props.optionChange}>
                    {this.state.optionViews}
                </Select>
            </div>
        );
    }

    getOptionViews(props) {
        var options = props.options;
        var optionViews = [];

        for(var index = 0; index < options.length; index++) {
            var view  = <Option value={options[index].value}>{options[index].title}</Option>;
            optionViews[index] = view;
        }

        return optionViews;
    }

    componentWillMount() {
        this.setState({
            defaultValue: this.getDefaultValue(this.props),
            optionViews: this.getOptionViews(this.props)
        });
    }

    getDefaultValue(props) {
        var value = props.options.length == 0 ? "" : props.options[0].value;
        return value;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            defaultValue: this.getDefaultValue(nextProps),
            optionViews: this.getOptionViews(nextProps)
        });
    }

}

SelectView.propTypes = {
    options: React.PropTypes.array.isRequired,
    optionChange: React.PropTypes.func,

};
SelectView.defaultProps = {
    options: []
};

export default SelectView;

/*
 使用React.Component创建组件，需要通过在constructor中调用super()将props传递给React.Component。另外react 0.13之后props必须是不可变的。
 由于是用ES6 class语法创建组件，其内部只允许定义方法，而不能定义属性，class的属性只能定义在class之外。所以propTypes要写在组件外部。
 对于之前的getDefaultProps方法，由于props不可变，所以现在被定义为一个属性，和propTypes一样，要定义在class外部。
 */