var React = require("react");
import {Modal, Button, message, Input, Row, Col, Radio, Checkbox} from 'antd';
import StringUtils from '../../utils/StringUtils';
import GoodsCategorySelectView from '../widgets/GoodsCategorySelectView';

const RadioGroup = Radio.Group;
const TitleSpan = 4;
const ValueSpan = 8;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

class AddView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isHot: 0,
            isRecommend: 0,
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            codeIsCheck: false,
            kgIsCheck: false,
        };
    }

    render() {
        return (<div className="modalDialogRoot">
            <Row>
                <Col span={TitleSpan}><label>商品分类</label></Col>
                <Col span={ValueSpan}>
                    <GoodsCategorySelectView
                        isShowAllItem={false}
                        optionChange={this.onGoodsCategoryOptionChange.bind(this)}/>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>商品名称</label></Col>
                <Col span={ValueSpan}><Input ref="name" className="addCateInput"/></Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>商品编号</label></Col>
                <Col span={ValueSpan}> <Input ref="image" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>*库存</label></Col>
                <Col span={ValueSpan}> <Input ref="image" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>简单描述</label></Col>
                <Col span={ValueSpan}> <Input ref="image" className="addCateInput"/> </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>详细描述</label></Col>
                <Col span={ValueSpan}> <Input ref="image" className="addCateInput"/> </Col>
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
                        <Input ref="image" placeholder="价格/码"
                               className="addCateInput" disabled={!this.state.codeIsCheck}/>
                    </div>
                    <div>
                        <Checkbox name="kgCheck" onChange={this.onKgChange.bind(this)}>千克</Checkbox>
                        <Input ref="image" placeholder="价格/千克"
                               className="addCateInput" disabled={!this.state.kgIsCheck}/>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={TitleSpan}><label>添加颜色</label></Col>
                <Col span={ValueSpan + 4}>
                    <CheckboxGroup options={plainOptions} value={this.state.checkedList}
                                   onChange={this.onColorCheckChange.bind(this)} />
                    |<Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onColorCheckAllChange.bind(this)}
                        checked={this.state.checkAll}>
                        全选
                    </Checkbox>
                </Col>
            </Row>

        </div>);
    }

    onCodeChange(e) {
        this.setState({
            codeIsCheck: e.target.checked
        });
    }

    onKgChange(e) {
        this.setState({
            kgIsCheck: e.target.checked
        });
    }

    onColorCheckChange(checkedList) {

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }

    onColorCheckAllChange(e){
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
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
    }

    componentDidMount() {
    }

    queryColorInfo() {

    }
}

export default AddView;
