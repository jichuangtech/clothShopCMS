var React = require("react");
import {Button, message, Table} from 'antd';
import SelectView from '../widgets/SelectView';
import * as Urls from '../../constant/Urls';
import NetUtils from '../../utils/NetUtils';
const defaultOption = {
    value: "-1",
    title: "全部分类",
};

class GoodsCategorySelectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsCategoryOptions: [],
            isQueryInfoComplete: false
        }
    }


    render() {
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
        if (this.props.optionChange != undefined) {
            this.props.optionChange(value);
        }
    }

    queryCategory() {
        var url = Urls.GOODS_CATEGORIES_URL;
        var self = this;
        NetUtils.get(url, null, (responseJson) => {

            self.updateCategoryOptions(responseJson);
        }, (error) => {
            message.info("获取商品分类失败: " + error);
        });
    }

    updateCategoryOptions(json) {
        let categories = json.data;
        var options = [];
        for (var index = 0; index < categories.length; index++) {

            var option = {
                title: categories[index].name,
                value: categories[index].id + ""
            };

            options[index] = option;
        }

        if (this.props.isShowAllItem) {
            options.unshift(defaultOption);
        }

        this.setState({
            goodsCategoryOptions: options,
            isQueryInfoComplete: true
        });

        var defId = options.length > 0 ? options[0].value : -1;
        if (this.props.onInfoQueryComplete) {
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
    isShowAllItem: React.PropTypes.bool,
    onInfoQueryComplete: React.PropTypes.func
};

GoodsCategorySelectView.defaultProps = {
    isShowAllItem: true
};

export default GoodsCategorySelectView;