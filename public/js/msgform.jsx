var React = require("react");
var EmojiList = require("./emojilist.jsx")

module.exports = React.createClass({
    getInitialState: function () {
        return ({text: "", disabled: false, count: 3,hide:true})
    },
    //把信息传递到父组件
    handleSubmit: function (e) {
        e.preventDefault();
        if (this.state.text) {
            var msg = {text: this.state.text};
            this.props.socketEmitMsg(msg)
            this.setState({text: "", disabled: true,hide:true})
        }
    },
    handleInputMsg: function (e) {
        this.setState({text: e.target.value})
    },
    componentDidMount: function () {
        //发送间隔
        this.interval = setInterval(this.tick, 1000);
        var self = this
        //把表情的string值传递到输入框中
        $(document).ready(function(){
            $(".theEmoji").click(function(){
                var v = $(this).attr("value")
                self.setState({text:self.state.text+v})
            })
        })
    },

    tick: function () {
        if (this.state.count > 0 && this.state.disabled == true) {
            this.setState({count: this.state.count - 1})
        }
        else {
            this.setState({disabled: false, count: 3})
        }
    },
    //显示表情列表
    handleClick:function(){
        this.setState({hide:!this.state.hide})
    },
    submitEmoji:function(v){
        this.state.text +=v
    },
    render: function () {
        return (
            <form style={{"position":"relative"}}>
                <EmojiList hide={this.state.hide} submitEmoji={this.submitEmoji} />
                <div className="input-group sendMsgForm">
                    <span className="input-group-addon">
                        <span className="fa fa-smile-o feedback" onClick={this.handleClick}></span>
                    </span>
                    <input className="form-control" onChange={this.handleInputMsg} value={this.state.text} maxLength="50"/>
                     <span className="input-group-addon">
                        <button className="btn btn-danger" onClick={this.handleSubmit}
                                disabled={this.state.disabled}>{this.state.disabled?this.state.count:"发送"}
                        </button>
                    </span>
                </div>
            </form>
        )
    }
});