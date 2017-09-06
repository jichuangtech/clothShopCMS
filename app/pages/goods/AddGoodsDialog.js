var React = require("react");
import {Modal, Button, message, Input, Row, Col, Radio} from 'antd';
import StringUtils from '../../utils/StringUtils';
import GoodsCategorySelectView from '../widgets/GoodsCategorySelectView';

const RadioGroup = Radio.Group;

class AddGoodsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isHot: 0,
            isRecommend: 0
        };
    }

    render() {
        return (
            <div className={this.props.className}>
                <Button onClick={this.showDialog.bind(this)}>发布商品</Button>
                <Modal
                    title="发布商品"
                    visible={this.state.visible}
                    onOk={this.onAddBtnClick.bind(this)}
                    onCancel={this.hideDialog.bind(this)}
                    okText="新增"
                    cancelText="退出"
                >
                    <div className="modalDialogRoot">
                        <Row>
                            <Col span={8}><label>商品分类</label></Col>
                            <Col span={8}><GoodsCategorySelectView optionChange={this.onGoodsCategoryOptionChange.bind(this)}/></Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>商品名称</label></Col>
                            <Col span={16}><Input ref="name" className="addCateInput"/></Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>商品简介</label></Col>
                            <Col span={16}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>商品编号</label></Col>
                            <Col span={16}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>*库存</label></Col>
                            <Col span={16}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>简单描述</label></Col>
                            <Col span={16}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>详细描述</label></Col>
                            <Col span={16}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>是否热销</label></Col>
                            <Col span={16}>
                                <RadioGroup onChange={this.onIsHotChange.bind(this)} value={this.state.isHot}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}><label>是否推荐</label></Col>
                            <Col span={16}>
                                <RadioGroup onChange={this.onIsRecommendChange.bind(this)} value={this.state.isRecommend}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={4}><label>详细描述</label></Col>
                            <Col span={8}> <Input ref="image" className="addCateInput"/> </Col>
                            <Col span={4}><label>详细描述</label></Col>
                            <Col span={8}> <Input ref="image" className="addCateInput"/> </Col>
                        </Row>



                    </div>
                </Modal>
            </div>
        );
    }

    onIsRecommendChange(event) {
        this.setState({
            isRecommend: event.target.value
        });
    }

    onIsHotChange(event) {
        this.setState({
            isHot: event.target.value
        });
    }

    onGoodsCategoryOptionChange(categoryId) {
        message.info("categoryId: " + categoryId + ",被选中");

    }

    onAddBtnClick() {
        this.addCate(this.refs.name.refs.input.value, this.refs.image.refs.input.value);
    }

    addCate(name, image) {
        if(StringUtils.isNullOrEmpty(name)) {
            message.info("商品分类名不能为空.");
            return;
        }

        if(StringUtils.isNullOrEmpty(image)) {
            message.info("商品分类图片名不能为空.");
            return;
        }

        var cate = {
            name: name,
            image: image
        }

        // var url = "http://localhost:8070/api/goodsCategories";
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories";

        var self = this;

        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cate)
        }).then((response) => response.text())
            .then(function (responseJson) {
                //如果添加成功
                message.info("添加成功! ");
                self.hideDialog();
                this.props.onOkClick();
            }, function (error) {
                self.hideDialog();
                message.info("添加商品分类失败");
                this.props.onOkClick();
            });

    }

    hideDialog() {
        this.setState({
            visible: false,
        });

        if(this.props.onDismiss instanceof React.PropTypes.func) {
            this.props.onDismiss();
        }

    }

    showDialog() {
        this.setState({
            visible: true,
        });
    }

}

AddGoodsDialog.propTypes = {
    className: React.PropTypes.style,
    onDismiss: React.PropTypes,
    onOkClick: React.PropTypes.func.isRequired

}

AddGoodsDialog.defaultProps = {
}

export default AddGoodsDialog;