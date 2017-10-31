var React = require("react");
import {Modal, Button, message, Input, Row, Col, Radio, Checkbox, Upload, Icon} from 'antd';
import StringUtils from '../../utils/StringUtils';
import GoodsCategorySelectView from '../widgets/GoodsCategorySelectView';
import NetUtils from '../../utils/NetUtils';
import * as Urls from "../../constant/Urls";
import {connect} from 'react-redux';

const RadioGroup = Radio.Group;
const TitleSpan = 4;
const ValueSpan = 8;

const CheckboxGroup = Checkbox.Group;

class AddView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryId: -1,
            visible: false,
            isHot: 0,
            isRecommend: 0,
            colorOptions: [],
            colorIdMap: new Map(),
            colorCheckedList: [],
            colorIndeterminate: false,
            colorCheckAll: false,
            isCodeCheck: false,
            isKgCheck: false,
            colorData: [],
            image: []
        }
    }

    onGoodsCategorySelectViewComplete(defCategoryId) {
        this.setState({
            categoryId: defCategoryId
        })
    }


    render() {
        const props = {
            beforeUpload: (file) => {
                var isImage = false;
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    isImage = true;
                }
                if (!isImage) {
                    message.error('请上传JPG或者PNG格式的图片!');
                    return false;
                }
                this.setState(({image}) => ({
                    image: [file],
                }));
                return false;
            },
            fileList: this.state.image,
        };

        return (<div className="modalDialogRoot">
            <div style={{textAlign: "left", backgroundColor: "#E5F5F5"}}>
                <p style={{fontSize: "16", margin: "5"}}>商品>查看商品</p>
            </div>
            <Row>
                <Col span={TitleSpan}><label>商品分类</label></Col>
                <Col span={ValueSpan}>
                    <GoodsCategorySelectView
                        isShowAllItem={false}
                        onInfoQueryComplete={this.onGoodsCategorySelectViewComplete.bind(this)}
                        optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>商品名称</label></Col>
                <Col span={ValueSpan}><Input ref="name" className="addCateInput"/></Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>商品编号</label></Col>
                <Col span={ValueSpan}> <Input ref="goodsSn" className="addCateInput"/> </Col>
            </Row>
            <Row>
                <Col span={TitleSpan}><label>商品图片</label></Col>
                <Col span={ValueSpan}>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/> Select File
                        </Button>
                    </Upload>
                </Col>
            </Row>
            <Row>
                <Col span={TitleSpan}><label>*库存</label></Col>
                <Col span={ValueSpan}> <Input ref="storeCount" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>简单描述</label></Col>
                <Col span={ValueSpan}> <Input ref="goodsRemark" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>详细描述</label></Col>
                <Col span={ValueSpan}> <Input ref="goodsContent" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>是否热销</label></Col>
                <Col span={ValueSpan}>
                    <RadioGroup onChange={this.onIsHotChange.bind(this)} value={this.state.isHot}>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </RadioGroup>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>是否推荐</label></Col>
                <Col span={ValueSpan}>
                    <RadioGroup onChange={this.onIsRecommendChange.bind(this)} value={this.state.isRecommend}>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </RadioGroup>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>价格</label></Col>
                <Col span={ValueSpan}>
                    <div>
                        <Checkbox name="codeCheck" onChange={this.onCodeChange.bind(this)}>码</Checkbox>
                        <Input ref="codePrice" placeholder="价格/码"
                               className="addCateInput" disabled={!this.state.isCodeCheck}/>
                    </div>
                    <div>
                        <Checkbox name="kgCheck" onChange={this.onKgChange.bind(this)}>千克</Checkbox>
                        <Input ref="kgPrice" placeholder="价格/千克"
                               className="addCateInput" disabled={!this.state.isKgCheck}/>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>添加颜色</label></Col>
                <Col span={ValueSpan + 4}>
                    <CheckboxGroup options={this.state.colorOptions}
                                   value={this.state.colorCheckedList}
                                   onChange={this.onColorCheckChange.bind(this)}/>
                    |<Checkbox
                    indeterminate={this.state.colorIndeterminate}
                    onChange={this.onColorCheckAllChange.bind(this)}
                    checked={this.state.colorCheckAll}>
                    全选
                </Checkbox>
                </Col>
            </Row>

            <hr/>
            <Button onClick={this.onPublicBtnClick.bind(this)}>发布</Button>

        </div>);
    }

    onPublicBtnClick() {

        if (this.checkValid()) {
            this.publicGoods();
        } else {
            message.info("参数无效");
        }
    }

    publicGoods() {
        var goodsVO = {};

        goodsVO.goodsName = this.refs.name.refs.input.value;
        goodsVO.categoryId = this.state.categoryId;
        goodsVO.goodsSn = this.refs.goodsSn.refs.input.value;
        goodsVO.storeCount = this.refs.storeCount.refs.input.value;
        goodsVO.goodsRemark = this.refs.goodsRemark.refs.input.value;
        goodsVO.goodsContent = this.refs.goodsContent.refs.input.value;
        goodsVO.isRecommend = this.state.isRecommend ? 1 : 0;
        goodsVO.isHot = this.state.isHot ? 1 : 0;

        var specs = [];
        if (this.state.isKgCheck) {
            var spec = {};
            spec.specId = 1;
            spec.price = this.refs.kgPrice.refs.input.value;
            specs.push(spec);
        }

        if (this.state.isCodeCheck) {
            var spec = {};
            spec.specId = 2;
            spec.price = this.refs.codePrice.refs.input.value;
            specs.push(spec);
        }
        goodsVO.specs = specs;

        var colorIds = [];

        var colorIdMap = this.state.colorIdMap;
        var colorCheckedList = this.state.colorCheckedList;
        /**
         * for(var value : 数组)
         *  value是数组的下标
         */
        for (var colorName in this.state.colorCheckedList) {
            colorIds.push(colorIdMap.get(colorCheckedList[colorName]));
        }
        goodsVO.colorIds = colorIds;
        goodsVO.image = this.state.image[0];
        NetUtils.postJsonWithFile(Urls.ADD_GOODS_URL, goodsVO, function (response) {
            console.log("发布商品成功 response: " + JSON.stringify(response));
        }, function () {
            console.log("发布商品失败");
        })

    }

    checkValid() {
        var valid = true;

        return valid;
    }


    onCodeChange(e) {
        this.setState({
            isCodeCheck: e.target.checked
        });
    }

    onKgChange(e) {
        this.setState({
            isKgCheck: e.target.checked
        });
    }

    onColorCheckChange(colorCheckedList) {
        this.setState({
            colorCheckedList: colorCheckedList,
            colorIndeterminate: !!colorCheckedList.length
            && (colorCheckedList.length < this.state.colorOptions.length),
            colorCheckAll: colorCheckedList.length === this.state.colorOptions.length,
        });
    }

    onColorCheckAllChange(e) {
        this.setState({
            colorCheckedList: e.target.checked ? this.state.colorOptions : [],
            colorIndeterminate: false,
            colorCheckAll: e.target.checked,
        });
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
        this.setState({
            categoryId: categoryId,
        });
    }

    componentDidMount() {
        //进行颜色的获取
        this.queryColorInfo();
    }

    queryColorInfo() {
        var self = this;
        var url = Urls.COLOR_URL;
        console.log("queryGoodsByCategoryId url: " + url);

        NetUtils.get(url, null, function (colorData) {
            self.updateColor(colorData);
        }, function (error) {
            message.info("获取颜失败 error: " + error);
        }, function (catchMsg) {
            message.info("获取颜失败 catchMsg: " + catchMsg);
        });
    }

    updateColor(colorData) {
        var colorOptions = [];
        var idMap = new Map();
        var nameSet = new Set();
        for (var index = 0; index < colorData.length; index++) {
            var color = colorData[index];
            if (nameSet.has(color.colorName)) {
                continue;
            }
            colorOptions[index] = color.colorName;
            console.log(" color: " + color.colorName + ", id: " + color.id);
            idMap.set(color.colorName, color.id);
            nameSet.add(color.colorName);
        }

        this.setState({
            colorOptions: colorOptions,
            colorIdMap: idMap
        });
    }

}

//state 对象，就是经过 combineReducers()创建出来的
const mapStateToProps = state => ({
    loginProps: state.loginReducer
})

// export default AddView;
export default connect(mapStateToProps)(AddView);