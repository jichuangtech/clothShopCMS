/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Table, Icon} from 'antd';

const columns = [{
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    render: text => <a href="#">{text}</a>,
}, {
    title: '图片',
    key: 'image',
    render: function(text, record){
        var image = "http://www.jichuangtech.site/clothshopserver/api/goodsCategories/picture/" + record.image;
        return(<img style={{width:40,height:40}}
                    src={image} />);
    }
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
    ),
}];


class QueryView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
    }

    addCate(name, image) {
        var cate = {
            name: name,
            image: image
        }

        // var url = "http://localhost:8070/api/goodsCategories";
        var url = "http://www.jichuangtech.site/clothshopserver/api/goodsCategories";

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
                self.queryCategory();
            }, function (error) {
                alert("请求失败 error: " + error);
            });

    }

    onAddBtnClick() {
        this.addCate(this.refs.name.value, this.refs.image.value);
    }

    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}/>
                <div>
                    <input type="text" placeholder="商品分类" ref="name"/> <br/>
                    <input placeholder="商品分类图片" ref="image"/> <br/>
                    <input type="submit" onClick={this.onAddBtnClick.bind(this)} />
                </div>
            </div>);
    }

    componentWillMount() {
        this.queryCategory();
    }

    queryCategory() {
        var url = "http://www.jichuangtech.site/clothshopserver/api/goodsCategories";
        var self = this;
        fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(function (responseJson) {
                self.updateCategory(responseJson)
            }, function (error) {
                alert("请求失败 error: " + error);
            });
    }

    updateCategory(json) {
        var data = [];

        for(var index = 0; index < json.length; index ++) {

            var row = {
                key: '' + index,
                category: json[index].name,
                image: json[index].image,
            };

            data.push(row);
        }

        this.setState({

            data: data
        });
    }
}

export default QueryView;
