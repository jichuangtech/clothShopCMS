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
        // alert("render");
        return viewMap.get(this.state.action);
    }

    componentWillReceiveProps(nextProps) {
        // alert("componentWillReceiveProps");
        this.updateAction(nextProps.match.params.action);
    }

    /**
     * 下面不返回的话，就是返回false
     * 该函数在 componentWillReceiveProps 之后被调用，
     * （1）如果返回true(默认缺省值) 则进行调用render(),所以可以在componentWillReceiveProps()这个中提前 update state
     * （2）日过返回false，说明不需要进行更新，则不调用render()
     */
    shouldComponentUpdate() {
        // alert("shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        // alert("componentWillUpdate");
    }

    componentDidUpdate() {
        // alert("componentDidUpdate");
    }

    componentWillUnmount() {
    }

};

export default GoodsCategoryView;
