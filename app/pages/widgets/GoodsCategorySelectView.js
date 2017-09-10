var React = require("react");
import {Button, message, Table} from 'antd';
import SelectView from '../widgets/SelectView';

const defaultOption = {
    value : "-1",
    title : "全部分类",
};

class GoodsCategorySelectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsCategoryOptions: [],
            isQueryInfoComplete: false
        }
    }


    render(){
        console.log(" GoodsCategorySelectView render");
        return <SelectView className={this.props.className}
                           options={this.state.goodsCategoryOptions}
                           optionChange={this.onOptionChange.bind(this)}/>
    }

    componentDidMount() {
        console.log(" GoodsCategorySelectView componentDidMount");
        this.queryCategory();
    }

    onOptionChange(value) {
        if(this.props.optionChange != undefined) {
            this.props.optionChange(value);
        }
    }

    queryCategory() {
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories";
        var self = this;
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateCategoryOptions(responseJson)
            }, function (error) {
                message.info("获取商品分类失败: " + error);
            });
    }

    updateCategoryOptions(json) {
        var options = [];

        for(var index = 0; index < json.length; index ++) {

            var option = {
                title: json[index].name,
                value: json[index].id + ""
            };

            options[index] = option;
        }

        if(this.props.isShowAllItem) {
            options.unshift(defaultOption);
        }

        this.setState({
            goodsCategoryOptions: options,
            isQueryInfoComplete: true
        });

        var defId = options.length > 0 ? options[0].value : -1;
        if(this.props.onInfoQueryComplete) {
            this.props.onInfoQueryComplete(defId);
        }
    }

    componentWillReceiveProps() {
        console.log(" GoodsCategorySelectView componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        return !this.state.isQueryInfoComplete;
    }


}

GoodsCategorySelectView.propTypes = {
    optionChange: React.PropTypes.func,
    isShowAllItem : React.PropTypes.bool,
    onInfoQueryComplete: React.PropTypes.func
};

GoodsCategorySelectView.defaultProps = {
    isShowAllItem: true
};

export default GoodsCategorySelectView;