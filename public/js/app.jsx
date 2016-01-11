var React = require("react");
var ReactDOM = require("react-dom");
var socket = io();
var marked = require('marked');
var MsgContent = require("./msgcontent.jsx");
var MsgTool = require("./msgtool.jsx");
var MsgForm = require("./msgform.jsx");
var ChatApp = React.createClass({
    getInitialState: function () {
        return {messages: [], system: [], scrollSwitch: true}
    },
    componentDidMount: function () {
        socket.on("join", this.handleJoin);
        socket.on("msg", this.handleMsgRce)
    },

    handleJoin: function (msg) {
        console.log(msg);
        var self = this;
        var {system}=this.state;
        system.push(msg);
        this.setState({msg});
        setTimeout(function () {
            system.pop();
            self.setState({system});
        }, 5000)
    },
    handleMsgRce: function (msg) {
        console.log(this.state);
        var {messages}=this.state;
        messages.push(msg)
        this.setState({messages});
    },
    socketEmitMsg: function (msg) {
        socket.emit("msg", msg)
    },
    switchCallback: function (v) {
        this.setState({scrollSwitch: v})
    },
    render: function () {
        return (
            <div className="col-md-12 panel chat">
                <div className="panel-header">
                    <MsgTool switchCallback={this.switchCallback}/>
                </div>
                <div className="panel-body">
                    <MsgContent messages={this.state.messages} system={this.state.system}
                                scrollSwitch={this.state.scrollSwitch}/>
                </div>
                <div className="panel-footer">
                    <MsgForm user={this.props.user}  socketEmitMsg={this.socketEmitMsg}/>
                </div>
            </div>
        )

    }
});

ReactDOM.render(<ChatApp user={user}/>, document.getElementById("content"))