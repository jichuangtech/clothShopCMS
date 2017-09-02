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

class QueryView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            goodsData: []
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
                    <SelectView className="topNavItem" />
                </div>

                <Table columns={columns} dataSource={this.state.goodsData}/>

            </div>

        );
    }

    publishGoods() {
        message.info("发布商品成功.")
    }

    componentWillMount() {
        this.queryGoods();
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
                message.info("请求数据失败: " + error);
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
}

export default QueryView;
