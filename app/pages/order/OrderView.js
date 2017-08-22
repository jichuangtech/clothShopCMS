/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");

var OrderView = React.createClass({
    render() {
        return (<div><h1 style={{color: '#0f0'}}>我是订单{this.props.match.params.action}</h1></div>);
    }
});

export default OrderView;
