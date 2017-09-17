/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Button, message, Table} from 'antd';

const columns = [{
    title: ' 订单总价',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: text => <a href="#">{text}</a>,
}, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
    render: text => <a href="#">{text}</a>,

}, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    render: text => <a href="#">{text}</a>,

}, {
    title: '收货人',
    dataIndex: 'consignee',
    key: 'consignee',
    render: text => <a href="#">{text}</a>,

}, {
    title: '订单编号',
    dataIndex: 'orderSn',
    key: 'orderSn',
    render: text => <a href="#">{text}</a>,
}, {
    title: '订单号',
    dataIndex: 'orderId',
    key: 'orderId',
    render: text => <a href="#">{text}</a>,
}, {
    title: '用户标识',
    dataIndex: 'userId',
    key: 'userId',
    render: text => <a href="#">{text}</a>,
}, {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
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

class QueryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ordersData: [],
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

                {/*<div className="topNav">*/}
                {/*<AddGoodsDialog*/}
                {/*className="topNavItem"*/}
                {/*onOkClick={this.queryGoodsByCategoryId.bind(this, this.state.categoryOptionId)}/>*/}

                {/*<GoodsCategorySelectView*/}
                {/*isShowAllItem={true}*/}
                {/*className="topNavItem"*/}
                {/*optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>*/}
                {/*</div>*/}

                <Table columns={columns} dataSource={this.state.ordersData}/>

            </div>

        );
    }

    componentWillMount() {
        this.queryOrders();
    }

    queryOrders() {
        var url = "https://www.jichuangtech.site/clothshopserver/api/order/0";
        var self = this;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateOrders(responseJson)
            }, function (error) {
                message.info("获取订单失败: " + error);
            });
    }

    updateOrders(json) {
        var orders = [];
        json = json.data;
        for (var index = 0; index < json.length; index++) {
            var row = {
                key: '' + index,
                totalAmount: json[index].totalAmount,
                address: json[index].address,
                mobile: json[index].mobile,
                consignee: json[index].consignee,
                orderId: json[index].orderId,
                userId: json[index].userId,
                orderStatus: json[index].orderStatus,
                orderSn: json[index].orderSn
            };

            orders.push(row);
        }
        this.setState({
            ordersData: orders
        });
    }
}

export default QueryView;
