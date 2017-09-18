/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Button, message, Table, Select, Modal, Row, Col, Input} from 'antd';
const TitleSpan = 4;
const ValueSpan = 8;
const inputWidth = 200;
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
    title: '用户Id',
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
            <a href="#"
               onClick={queryViewRef.editGoods.bind(queryViewRef, record.orderId, record.address, record.mobile, record.consignee, record.orderStatus)}>编辑</a>
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
            visible: false
        };

        queryViewRef = this;
    }

    deleteGoods() {
        message.info("删除商品");
    }

    editGoods(orderId, address, phone, consignee, orderStatus) {
        // this.props.editCallback.bind(this, order_id);

        this.setState({
            visible: true,
            orderId: orderId,
            address: address,
            phone: phone,
            consignee: consignee,
            orderStatus: orderStatus
        });
    }

    render() {
        console.log("Goods Query render")
        return (
            <div className="goodsBody">

                <Select style={{width: 120}}>
                    {this.state.userData}
                </Select>

                <Table columns={columns} dataSource={this.state.ordersData}/>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="modalDialogRoot">
                        <Row>
                            <Col span={TitleSpan}><label>商品分类</label></Col>
                            <Col span={ValueSpan}><label>{this.state.orderId}</label></Col>
                        </Row>

                        <Row>
                            <Col span={TitleSpan}><label>地址</label></Col>
                            <Col span={ValueSpan}><Input ref="name" value={this.state.address}
                                                         style={{width: inputWidth}}
                                                         className="addCateInput"/></Col>
                        </Row>

                        <Row>
                            <Col span={TitleSpan}><label>手机</label></Col>
                            <Col span={ValueSpan}> <Input ref="goodsSn" style={{width: inputWidth}}
                                                          value={this.state.phone}
                                                          className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={TitleSpan}><label>收货人</label></Col>
                            <Col span={ValueSpan}> <Input ref="storeCount" style={{width: inputWidth}}
                                                          value={this.state.consignee}
                                                          className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={TitleSpan}><label>订单状态</label></Col>
                            <Col span={ValueSpan}> <Input ref="goodsContent" style={{width: inputWidth}}
                                                          value={this.state.orderStatus}
                                                          className="addCateInput"/> </Col>
                        </Row>

                        <hr/>
                        <Button onClick={this.onPublicBtnClick.bind(this)}>修改</Button>

                    </div>
                </Modal>
            </div>

        );
    }

    onPublicBtnClick() {

    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    handleOk() {
        this.setState({
            visible: false
        });
    }

    componentWillMount() {
        this.queryOrders();
        this.queryUser();
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

    queryUser() {
        var users = [];
        users.push(<Option key="jack">Hack</Option>);
        users.push(<Option key="hal">yangjb</Option>);
        users.push(<Option key="jyangk">asdf</Option>);
        users.push(<Option key="jacaak">sdfef</Option>);
        this.setState({
            userData: users
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
