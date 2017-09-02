/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Button, message, Table} from 'antd';
import SelectView from '../widgets/SelectView';

const columns = [{
    title: ' 图片',
    dataIndex: 'image',
    key: 'image',
    render: function(text, record){
        var image = "https://www.jichuangtech.site/clothshopserver/api/goods/picture/" + record.image;
        return(<img style={{width:34,height:34}}
                    src={image} />);
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
      <span className="ant-divider" />
            <a href="#" onClick={queryViewRef.editGoods.bind(queryViewRef, record.id)}>编辑</a>
    </span>
    ),
}];

var queryViewRef;

const defaultOption = {
        value : "-1",
        title : "全部分类",
    };

class QueryView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            goodsData: [],
            goodsCategoryOptions:[
                defaultOption
            ]
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
        return (
            <div className="goodsBody">

                <div className="topNav">
                    <Button className="topNavItem" onClick={this.publishGoods.bind(this)}>发布商品</Button>
                    <SelectView className="topNavItem" options={this.state.goodsCategoryOptions}
                                optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>
                </div>

                <Table columns={columns} dataSource={this.state.goodsData}/>

            </div>

        );
    }

    onGoodsCategoryOptionChange(categoryId) {
        if(categoryId < 0) {
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
        var self = this;
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories/"
            + categoryId+ "/goods";
        console.log("queryGoodsByCategoryId url: " + url);

        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateGoods(responseJson)
            }, function (error) {
                message.info("获取商品失败: " + error);
            });

    }

    queryGoods() {
        var url = "https://www.jichuangtech.site/clothshopserver/api/goods";
        var self = this;
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateGoods(responseJson)
            }, function (error) {
                message.info("获取商品失败: " + error);
            });
    }

    updateGoods(json) {
        var goods = [];

        for(var index = 0; index < json.length; index ++) {

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
        var options = [
            defaultOption
        ];

        for(var index = 0; index < json.length; index ++) {

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
