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

    render() {
        return <Table columns={columns} dataSource={this.state.data}/>;
        // return (<div><h1 style={{color:  '#0f0'}}>我是商品分类查询</h1></div>);
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
