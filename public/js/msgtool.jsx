var React = require("react");
var Switch = require("rc-switch");
module.exports = React.createClass({
    getInitialState: function () {
        return {scrollSwitch: true, scroll: "启用滚屏"}
    },
    handleSwitch: function (v) {
        console.log(v);
        this.setState({scrollSwitch: v, scroll: v ? "启用滚屏" : "关闭滚屏"});
        this.props.switchCallback(v)
    },
    render: function () {
        return (<div className="MsgTool">{this.state.scroll}
                <Switch defaultChecked={this.state.scrollSwitch} onChange={this.handleSwitch}/>
            </div>
        )
    }
});