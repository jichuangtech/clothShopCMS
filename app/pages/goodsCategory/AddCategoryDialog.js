var React = require("react");
import {Modal, Button, message, Input} from 'antd';
import StringUilts from '../../utils/StringUilts';

class AddCategoryDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    render() {
        var self = this;
        return (
            <div>
                <Button onClick={this.showDialog.bind(this)}>新增商品分类</Button>
                <Modal
                    title="新增商品分类"
                    visible={this.state.visible}
                    onOk={this.onAddBtnClick.bind(this)}
                    onCancel={this.hideDialog.bind(this)}
                    okText="新增"
                    cancelText="退出"
                >
                    <Input placeholder="商品分类" ref="name" className="addCateInput"/> <br/>
                    <Input placeholder="商品分类图片" ref="image" className="addCateInput"/> <br/>
                </Modal>
            </div>
        );
    }

    onAddBtnClick() {
        this.addCate(this.refs.name.refs.input.value, this.refs.image.refs.input.value);
    }

    addCate(name, image) {
        if(StringUilts.isNullOrEmpty(name)) {
            message.info("商品分类名不能为空.");
            return;
        }

        if(StringUilts.isNullOrEmpty(image)) {
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
            }, function (error) {
                message.info("添加商品分类失败");
            });

    }

    hideDialog() {
        this.setState({
            visible: false,
        });

        this.props.onDismiss();
    }

    showDialog() {
        this.setState({
            visible: true,
        });
    }

}

export default AddCategoryDialog;