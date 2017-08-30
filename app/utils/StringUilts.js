var React = require("react");


class StringUtils extends React.Component {

    static isNullOrEmpty(value) {
        return value == undefined || value == null || value == "";
    }

}

export default StringUtils;