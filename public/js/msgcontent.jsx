var React = require("react");
var emojione = require("emojione");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactDOM = require("react-dom");


module.exports = React.createClass({

    componentDidUpdate: function () {
        this.props.scrollSwitch ? this.handleScroll() : null

    },
    handleScroll: function () {
        var node = ReactDOM.findDOMNode(this.refs.msgContent);
        node.scrollTop = node.scrollHeight
    },
    render: function () {
        var msg = this.props.messages.map(function (v, n) {
            var createMarkup = function(){
                return {__html:emojione.shortnameToImage(v.text).toString()}
            }
            return <li key={n} className="message">
                <span>{v.user.name}: </span>
                <span dangerouslySetInnerHTML={createMarkup()}></span>
            </li>
        });

        return (

            <ul className="msg-content" ref="msgContent">
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1000}
                                         transitionLeaveTimeout={1000}>
                    {msg}
                </ReactCSSTransitionGroup>
            </ul>

        )
    }
});