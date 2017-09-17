/**
 * Created by Administrator on 2017/8/16.
 */
import QueryView from './QueryView';
import  * as ActionType from '../../constant/ActionType';

var React = require("react");
const viewMap = new Map();
class OrderView extends React.Component {
    constructor(props) {
        super(props);
        //下面要先进行各种状态的定义，不然会出现undefined的情况
        this.state = {
            view: (<QueryView/>),
            action: ActionType.QUERY
        }
        viewMap.set(ActionType.QUERY, (<QueryView/>));
    }


    componentWillMount() {
        this.updateAction(this.props.match.params.action);
    }


    updateAction(action) {
        this.setState({
            action: action
        });

    }

    render() {
        // alert("render");
        return viewMap.get(this.state.action);
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps");
        this.updateAction(nextProps.match.params.action);
    }
}

export default OrderView;
