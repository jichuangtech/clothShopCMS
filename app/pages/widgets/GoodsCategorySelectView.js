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
            goodsCategoryOptions: []
        }
    }


    render(){
        return <SelectView className={this.props.className}
                           options={this.state.goodsCategoryOptions}
                           optionChange={this.props.optionChange.bind(this)}/>
    }

    componentDidMount() {
        this.queryCategory();
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
                value: json[index].id
            };

            options[index] = option;
        }

        if(this.props.isShowAllItem) {
            options.unshift(defaultOption);
        }

        this.setState({
            goodsCategoryOptions: options
        });
    }



}

GoodsCategorySelectView.propTypes = {
    optionChange: React.PropTypes.func,
    isShowAllItem : React.PropTypes.bool
};

GoodsCategorySelectView.defaultProps = {
    isShowAllItem: true
};

export default GoodsCategorySelectView;