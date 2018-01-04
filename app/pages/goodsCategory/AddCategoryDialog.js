var React = require("react");
import {Modal, Button, message, Input, Upload, Icon} from 'antd';
import StringUtils from '../../utils/StringUtils';
import NetUtils from '../../utils/NetUtils';
import * as Urls from "../../constant/Urls";
class AddCategoryDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: []
        };
    }

    render() {
        const props = {
            beforeUpload: (file) => {
                var isImage = false;
                // || file.type === 'image/png'
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    isImage = true;
                }
                if (!isImage) {
                    message.error('请上传JPG/PNG的图片!');
                    return false;
                }
                this.setState({
                    image: [file]
                });
                return false;
            },
            fileList: this.state.image,
        };
        return (
            <div className={this.props.className}>
                <Button onClick={this.showDialog.bind(this)}>发布商品分类</Button>
                <Modal
                    title="发布商品分类"
                    visible={this.state.visible}
                    onOk={this.onAddBtnClick.bind(this)}
                    onCancel={this.hideDialog.bind(this)}
                    okText="新增"
                    cancelText="退出"
                >
                    <Input placeholder="商品分类" ref="name" className="addCateInput"/> <br/><br/>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/> 选择图片
                        </Button>
                    </Upload>
                    <br/>
                </Modal>
            </div>
        );
    }

    onAddBtnClick() {
        this.addCate(this.refs.name.refs.input.value);
    }

    addCate(name) {
        if (StringUtils.isNullOrEmpty(name)) {
            message.info("商品分类名不能为空.");
            return;
        }

        if (this.state.image.length == 0) {
            message.info("请选择商品分类图片.");
            return;
        }

        var cate = {
            name: name,
            image: this.state.image[0]
        }
        var self = this;
        NetUtils.postJsonWithFile(Urls.GOODS_CATEGORIES_URL, cate, function (response) {
            if(response.statusCode === 200) {
                message.info("发布商品分类成功");
            } else {
                message.info("发布商品分类失败：" + response.msg);
            }
            self.hideDialog();
        }, function (error) {
            message.info("发布商品分类失败： " + JSON.stringify(error));
            console.log("发布商品分类1", error);
        }, (error) => {
            message.info("发布商品分类失败： " + JSON.stringify(error));
            console.log("发布商品分类2", error);
        })

    }

    hideDialog() {
        this.setState({
            visible: false,
        }, function () {
            this.props.onDismiss();
        });
    }

    showDialog() {
        this.setState({
            visible: true,
        });
    }

}

AddCategoryDialog.propTypes = {
    className: React.PropTypes.style,

}

AddCategoryDialog.defaultProps = {
    className: ""
}

export default AddCategoryDialog;