var React = require("react");
import {Modal, Button, message, Input, Row, Col, Radio, Checkbox, Upload, Icon, Form} from 'antd';
import StringUtils from '../../utils/StringUtils';
import GoodsCategorySelectView from '../widgets/GoodsCategorySelectView';
import NetUtils from '../../utils/NetUtils';
import * as Urls from "../../constant/Urls";
import {connect} from 'react-redux';

const FormItem = Form.Item;
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

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.onPublicBtnClick(values);
            }
        });
    }

    render() {
        const props = {
            beforeUpload: (file) => {
                var isImage = false;
                // || file.type === 'image/png'
                if (file.type === 'image/jpeg') {
                    isImage = true;
                }
                if (!isImage) {
                    message.error('请上传JPG的图片!');
                    return false;
                }
                this.setState(({image}) => ({
                    image: [file],
                }));
                return false;
            },
            fileList: this.state.image,
        };

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const {getFieldDecorator} = this.props.form;

        return (<div className="modalDialogRoot">
            <div style={{textAlign: "center", backgroundColor: "#E5F5F5"}}>
                <h2 style={{fontSize: "25px", margin: "5px"}}>添加商品</h2>
            </div>
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                    {...formItemLayout}
                    label="商品分类"
                    hasFeedback
                >
                    <GoodsCategorySelectView
                        isShowAllItem={false}
                        onInfoQueryComplete={this.onGoodsCategorySelectViewComplete.bind(this)}
                        optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="商品名称"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            min: 2, message: '商品名称至少要有两个字!',
                        }, {
                            required: true, message: '请输入商品名称!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="商品编号"
                    hasFeedback
                >
                    {getFieldDecorator('goodsSn', {
                        rules: [{
                            min: 4, message: '商品编号至少4个字母!',
                        }, {
                            required: true, message: '请输入商品编号!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="库存"
                    hasFeedback
                >
                    {getFieldDecorator('storeCount', {
                        rules: [{
                            pattern: '^[0-9]*$', message: '库存必须是数字!',
                        }, {
                            required: true, message: '请输入库存数量!',
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="简单描述"
                    hasFeedback
                >
                    {getFieldDecorator('goodsRemark')(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="详细描述"
                    hasFeedback
                >
                    {getFieldDecorator('goodsContent')(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="是否热销"
                    hasFeedback
                >
                    {getFieldDecorator('isHot', {
                        rules: [{
                            required: true, message: '请选择是否热销!',
                        }], valuePropName: 'isHot', initialValue: this.state.isHot
                    })(
                        <RadioGroup onChange={this.onIsHotChange.bind(this)} value={this.state.isHot}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="是否推荐"
                    hasFeedback
                >
                    {getFieldDecorator('isRecommend', {
                        rules: [{
                            required: true, message: '请选择是否推荐!',
                        }], valuePropName: 'isRecommend', initialValue: this.state.isRecommend
                    })(
                        <RadioGroup onChange={this.onIsRecommendChange.bind(this)} value={this.state.isRecommend}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="规格"
                    hasFeedback
                >
                    {getFieldDecorator('isCodeCheck')(
                        <div>
                            <Checkbox name="codeCheck" onChange={this.onCodeChange.bind(this)}>码</Checkbox>
                            <Input ref="codePrice" placeholder="价格/码"
                                   className="addCateInput" disabled={!this.state.isCodeCheck}/>
                        </div>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="规格"
                    hasFeedback
                >
                    {getFieldDecorator('isKgCheck')(
                        <div>
                            <Checkbox name="kgCheck" onChange={this.onKgChange.bind(this)}>千克</Checkbox>
                            <Input ref="kgPrice" placeholder="价格/千克"
                                   className="addCateInput" disabled={!this.state.isKgCheck}/>
                        </div>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="颜色选择"
                    hasFeedback
                >
                    {getFieldDecorator('colorSelect')(
                        <div>
                            <CheckboxGroup options={this.state.colorOptions}
                                           value={this.state.colorCheckedList}
                                           onChange={this.onColorCheckChange.bind(this)}/>
                            | <Checkbox
                            indeterminate={this.state.colorIndeterminate}
                            onChange={this.onColorCheckAllChange.bind(this)}
                            checked={this.state.colorCheckAll}>
                            全选
                        </Checkbox>
                        </div>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="商品图片"
                    hasFeedback
                >
                    {getFieldDecorator('image')(
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload"/> Select File
                            </Button>
                        </Upload>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">发布</Button>
                </FormItem>
            </Form>

            {/*<hr/>*/}
            {/*<Button onClick={this.onPublicBtnClick.bind(this)}>发布</Button>*/}

        </div>);
    }

    onPublicBtnClick(values) {
        if (this.checkValid()) {
            this.publicGoods(values);
        }
    }

    publicGoods(values) {
        let form = this.props.form;
        var goodsVO = {};
        // let fieldsValue = form.getFieldsValue('isKgCheck');
        // console.log(fieldsValue);

        goodsVO.goodsName = values['name'];
        goodsVO.categoryId = this.state.categoryId;
        goodsVO.goodsSn = values['goodsSn'];
        goodsVO.storeCount = values['storeCount'];
        goodsVO.goodsRemark = values['goodsRemark'];
        goodsVO.goodsContent = values['goodsContent'];
        goodsVO.isRecommend = this.state.isRecommend ? 1 : 0;
        goodsVO.isHot = this.state.isHot ? 1 : 0;

        if (this.state.isKgCheck) {
            goodsVO.kgPrice = this.refs.kgPrice.refs.input.value;
        }
        if (this.state.isCodeCheck) {
            goodsVO.codePrice = this.refs.codePrice.refs.input.value;
        }

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
        console.log(goodsVO);
        NetUtils.postJsonWithFile(Urls.GOODS_URL, goodsVO, function (response) {
            message.info("发布商品成功");
            form.resetFields();
            // self.props.history.push("/main/goods/query");
        }, function (error) {
            console.log("发布商品失败1", error);
        }, (error) => {
            console.log("发布商品失败2", error);
        })

    }

    checkValid() {
        if (this.state.image.length === 0) {
            message.info("请选择一张商品图片上传");
            return false;
        }
        var reg = new RegExp("^[0-9]*$");
        var codePrice = this.refs.codePrice.refs.input.value;
        var kgPrice = this.refs.kgPrice.refs.input.value;
        if (!reg.test(codePrice)) {
            message.info("价格/码请选择输入数字");
            return false;
        }
        if (!reg.test(kgPrice)) {
            message.info("价格/千克请选择输入数字");
            return false;
        }
        return true;
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

const WrappedNormalAddView = Form.create()(AddView);

//state 对象，就是经过 combineReducers()创建出来的
const mapStateToProps = state => ({
    loginProps: state.loginReducer
})

// export default AddView;
export default connect(mapStateToProps)(WrappedNormalAddView);