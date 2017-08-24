/**
 * Created by Administrator on 2017/8/16.
 */
var React = require("react");
import QueryView from "./QueryView"
import AddView from "./AddView"
import DeleteView from "./DeleteView"
import  * as ActionType from '../../constant/ActionType';


const viewMap = new Map();


class GoodsCategoryView extends React.Component {

    constructor(props) {
        super(props);
        //下面要先进行各种状态的定义，不然会出现undefined的情况
        this.state = {
            view: (<QueryView/>),
            action:ActionType.QUERY
        }

        viewMap.set(ActionType.ADD, (<AddView/>));
        viewMap.set(ActionType.QUERY, (<QueryView/>));
        viewMap.set(ActionType.DELETE, (<DeleteView/>));
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
        return viewMap.get(this.state.action);
    }

    componentWillReceiveProps(nextProps) {
        this.updateAction(nextProps.match.params.action);
    }

    componentWillUnmount() {
    }

};

export default GoodsCategoryView;
