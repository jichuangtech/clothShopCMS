/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import {Table, Icon, Alert, message} from 'antd';
import NetUtils from '../../utils/NetUtils';
import AddCategoryDialog from './AddCategoryDialog';

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
        return(<img style={{width:34,height:34}}
                    src={image} />);
    }
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#" style={{display: 'none'}}>Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#" onClick={queryViewRef.deleteCategory.bind(queryViewRef, record.id)}>删除</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link" style={{display: 'none'}} >
        More actions <Icon type="down" />
      </a>
    </span>
    ),
}];

var queryViewRef;

class QueryView extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
        queryViewRef  = this;
    }

    deleteCategory(categoryId) {
        var self = this;
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories";

        var params = [];
        params["categoryId"] = categoryId;
        NetUtils.delete(url, params, function (json) {
            if(json.statusCode == 200) {
                self.queryCategory();
                message.info("删除成功！");
            } else {
                message.info(json.msg);
            }
        }, function (e) {
            alert(" 删除失败 e: " + e);
        });
    }

    render() {
        return (
            <div className="goodsBody">

                <div className="topNav">
                    <AddCategoryDialog className="topNavItem" onDismiss={()=>{this.queryCategory()}}/>
                </div>

                <Table columns={columns} dataSource={this.state.data}/>
            </div>);
    }

    componentWillMount() {
        this.queryCategory();
    }

    queryCategory() {
        var url = "https://www.jichuangtech.site/clothshopserver/api/goodsCategories";
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
                id: json[index].id
            };

            data.push(row);
        }

        this.setState({
            data: data
        });
    }
}

export default QueryView;
