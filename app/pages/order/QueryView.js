/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Button, message, Table, Select, Modal, Row, Col, Input, Spin} from 'antd';
import NetUtils from '../../utils/NetUtils';

const TitleSpan = 4;
const ValueSpan = 8;
const columns = [{
    title: '订单号',
    dataIndex: 'orderId',
    key: 'orderId',
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
    title: ' 订单总价',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: text => <a href="#">{text}</a>,
}, {
    title: '用户Id',
    dataIndex: 'userId',
    key: 'userId',
    render: text => <a href="#">{text}</a>,
}, {
    title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    render: text => {
        switch (text) {
            case 1:
                return <a href="#">待支付</a>
            case 2:
                return <a href="#">待收货</a>
            case 3:
                return <a href="#">已收货</a>
            case 4:
                return <a href="#">已完成</a>
            default:
                return <a href="#">{text}</a>
        }
    },
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#"
               onClick={queryViewRef.editOrders.bind(queryViewRef, record.orderId, record.address, record.mobile, record.consignee, record.orderStatus, record.userId)}>编辑</a>
    </span>
    ),
}];

var queryViewRef;
const Option = Select.Option;
class QueryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ordersData: [],
            userData: [],
            orderId: "",
            address: "",
            phone: "",
            consignee: "",
            orderStatus: "",
            userId: "",
            visible: false,
            loading: false,
            selectUserId: 0
        };

        queryViewRef = this;
    }

    deleteGoods() {
        message.info("删除商品");
    }

    editOrders(orderId, address, phone, consignee, orderStatus, userId) {
        // this.props.editCallback.bind(this, order_id);

        this.setState({
            visible: true,
            orderId: orderId,
            userId: userId,
            address: address,
            phone: phone,
            consignee: consignee,
            orderStatus: orderStatus + ""
        });
    }

    render() {
        return (
            <div className="goodsBody">

                <Select style={{width: 120}} defaultValue="0" onChange={this.handleUserChange.bind(this)}>
                    {this.state.userData}
                </Select>
                <Spin spinning={this.state.loading} style={{width: 0}}>
                    <Table columns={columns} dataSource={this.state.ordersData}/>
                </Spin>

                <Modal
                    title="修改订单"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="modalDialogRoot">
                        <Row style={{margin: 10}}>
                            <Col span={TitleSpan}><label>订单Id</label></Col>
                            <Col span={ValueSpan}><label>{this.state.orderId}</label></Col>
                        </Row>

                        <Row style={{margin: 10}}>
                            <Col span={TitleSpan}><label>订单状态</label></Col>
                            <Col span={ValueSpan}>
                                <Select onChange={this.handleChange.bind(this)} style={{width: 120}}
                                        ref="orderStatusSelect"
                                        value={this.state.orderStatus}>
                                    <Option key="1" value="1">待支付</Option>
                                    <Option key="2" value="2">待收货</Option>
                                    <Option key="3" value="3">已收货</Option>
                                    <Option key="4" value="4">已完成</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>

        );
    }

    handleChange(value) {
        this.setState({
            orderStatus: value
        });
    }

    handleUserChange(value) {
        this.setState({
            selectUserId: value
        });
        this.queryOrders(value);
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleOk() {
        console.log(this.state.orderStatus);
        let self = this;
        NetUtils.postJson(`https://www.jichuangtech.site/clothshopserver/api/order/${this.state.userId}/orderstatus/${this.state.orderId}/${this.state.orderStatus}`, {}, function (data) {
            message.info('保存成功');
            self.queryOrders();
        }, function (data) {
            alert("保存失败");
        });

        this.setState({
            visible: false
        });
    }

    componentWillMount() {
        this.queryOrders();
        this.queryUser();
    }

    queryOrders(userId) {
        this.setState({
            loading: true
        });
        if (userId === undefined) {
            userId = 0;
        }
        var url = `https://www.jichuangtech.site/clothshopserver/api/order/${userId}`;
        var self = this;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateOrders(responseJson);
                self.setState({
                    loading: false
                });
            }, function (error) {
                message.info("获取订单失败: " + error);
                self.setState({
                    loading: false
                });
            });
    }

    queryUser() {
        var users = [];
        users.push(<Option key="0" value="0">全部用户</Option>);
        NetUtils.get("https://www.jichuangtech.site/clothshopserver/list", {}, function (data) {
            console.log(data);
            for (var index = 0; index < data.length; index++) {
                let userId = data[index].userId;
                users.push(<Option key={userId} value={userId}>{userId}</Option>);
            }
        }, data => {
            alert("错误" + data)
        }, data => {
            alert("错误" + data)
        });
        this.setState({
            userData: users
        });
    }

    updateOrders(json) {
        var orders = [];
        json = json.data;
        if (json != undefined && json != null) {
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
        }
        this.setState({
            ordersData: orders
        });
    }
}

export default QueryView;
