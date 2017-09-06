/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import QueryView from './QueryView';
import {message} from 'antd';
import AddView from './AddView';

var GoodsView = React.createClass({
    render() {
        // message.info(" msg: " + this.props.match.params.action + ", url: " + this.props.match.url);
        // message.info(" msg: " + this.props.match.params.goods + ", url: " + this.props.match.url);
        return <QueryView />;
    }
});

export default GoodsView;
