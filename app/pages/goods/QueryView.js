/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Button, message, Table, Spin} from 'antd';
import SelectView from '../widgets/SelectView';
import GoodsCategorySelectView from '../widgets/GoodsCategorySelectView';
import AddGoodsDialog from './AddGoodsDialog';
import NetUtils from '../../utils/NetUtils';
import * as Urls from '../../constant/Urls';

const columns = [{
    title: ' 图片',
    dataIndex: 'image',
    key: 'image',
    render: function (text, record) {
        var image = "https://www.jichuangtech.site/clothshopserver/api/goods/picture/" + record.image;
        return (<img style={{width: 34, height: 34}}
                     src={image}/>);
    }
}, {
    title: '商品',
    dataIndex: 'goods',
    key: 'goods',
    render: text => <a href="#">{text}</a>,

}, {
    title: '简介',
    dataIndex: 'title',
    key: 'title',
    render: text => <a href="#">{text}</a>,

}, {
    title: '库存',
    dataIndex: 'storeCount',
    key: 'storeCount',
    render: text => <a href="#">{text}</a>,

}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#" onClick={queryViewRef.deleteGoods.bind(queryViewRef, record.id)}>删除</a>
      <span className="ant-divider"/>
            <a href="#" onClick={queryViewRef.editGoods.bind(queryViewRef, record.id)}>编辑</a>
    </span>
    ),
}];

var queryViewRef;

const defaultOption = {
    value: "-1",
    title: "全部分类",
};

class QueryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsData: [],
            loading: false,
            goodsCategoryOptions: [
                defaultOption
            ],
            categoryOptionId: -1
        };

        queryViewRef = this;
    }

    deleteGoods() {
        message.info("删除商品");
    }

    editGoods() {
        message.info("编辑商品");
    }

    render() {
        console.log("Goods Query render")
        return (
            <div className="goodsBody">
                <div style={{textAlign: "left", backgroundColor: "#E5F5F5"}}>
                    <p style={{fontSize: "16px", margin: "5px"}}>商品>查看商品</p>
                </div>
                <div className="topNav">
                    <GoodsCategorySelectView
                        isShowAllItem={true}
                        className="topNavItem"
                        optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>
                </div>
                <Spin spinning={this.state.loading} style={{width: 0}}>
                    <Table columns={columns} dataSource={this.state.goodsData}/>
                </Spin>
            </div>

        );
    }

    onGoodsCategoryOptionChange(categoryId) {
        this.setState({
            categoryOptionId: categoryId,
        });
        if (categoryId < 0) {
            this.queryGoods();
        } else {
            this.queryGoodsByCategoryId(categoryId);
        }

    }

    publishGoods() {
        message.info("发布商品成功.")
    }

    componentWillMount() {
        this.queryGoods();
        this.queryCategory();
    }

    queryGoodsByCategoryId(categoryId) {
        this.setState({
            loading: true
        });

        const self = this;
        const url = Urls.GOODS_CATEGORIES_URL + "/" + categoryId + "/goods";
        console.log("queryGoodsByCategoryId url: " + url);
        NetUtils.get(url, null, (responseJson) => {
            self.updateGoods(responseJson);
            this.setState({
                loading: false
            });
        }, (error) => {
            message.info("获取商品失败: ");
            console.log(error);
            this.setState({
                loading: false
            });
        });

        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     }
        // }).then((response) => response.json())
        //     .then(function (responseJson) {
        //         console.log(" goods query 获取商品成功 ");
        //         self.updateGoods(responseJson)
        //     }, function (error) {
        //         message.info("获取商品失败: " + error);
        //     });

    }

    queryGoods() {
        this.setState({
            loading: true
        });
        var url = Urls.ADD_GOODS_URL;
        var self = this;
        NetUtils.get(url, null, (responseJson) => {
            this.setState({
                loading: false
            });
            self.updateGoods(responseJson);
        }, (error) => {
            message.info("获取商品失败: ");
            console.log(error);
            this.setState({
                loading: false
            });
        });
    }

    updateGoods(json) {
        var goods = [];

        for (var index = 0; index < json.length; index++) {

            var row = {
                key: '' + index,
                goods: json[index].goodsName,
                image: json[index].originalImg,
                title: json[index].goodsRemark,
                storeCount: json[index].storeCount,
                id: json[index].id
            };

            goods.push(row);
        }

        this.setState({
            goodsData: goods
        });
    }

    queryCategory() {
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories";
        ;


        var self = this;
        NetUtils.get(Urls.GOODS_CATEGORY, [], (data) => {
            self.updateCategoryOptions(data);
        }, (error) => {
            message.info("获取商品分类失败: ");
            console.log(error);
        });
    }

    updateCategoryOptions(json) {
        var options = [
            defaultOption
        ];

        for (var index = 0; index < json.length; index++) {

            var option = {
                title: json[index].name,
                value: json[index].id
            };

            options[index + 1] = option;
        }

        this.setState({
            goodsCategoryOptions: options
        });
    }
}

export default QueryView;
