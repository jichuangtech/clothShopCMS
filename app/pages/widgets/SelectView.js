import {Select} from 'antd';
var React = require("react");

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

    render() {
        return (
            <div>
                <Select defaultValue={this.getDefaultValue()}
                        style={{ width: 120 }} onChange={this.props.optionChange}>
                    {this.getOptionViews()}
                </Select>
            </div>
        );
    }

    getOptionViews() {
        var options = this.props.options;
        var optionViews = [];

        for(var index = 0; index < options.length; index++) {
            var view  = <Option value={options[index].value}>{options[index].title}</Option>;
            optionViews[index] = view;
        }

        return optionViews;
    }

    getDefaultValue() {
        return this.props.options.length == 0 ? "未知" : this.props.options[0].value;
    }

}

SelectView.propTypes = {
    options: React.PropTypes.array.isRequired,
    optionChange: React.PropTypes.func

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