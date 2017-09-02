import {Select} from 'antd';
var React = require("react");

const Option = Select.Option;

class SelectView extends React.Component {
    render() {
        return (
            <div>
                <Select defaultValue="lucy" style={{ width: 120 }} >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        );
    }

}

export default SelectView;