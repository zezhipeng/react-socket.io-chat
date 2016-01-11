var React = require("react");
var emojione = require("emojione");


var EmojiList = React.createClass({
    getInitialState:function(){
        return ({
            emoji:[":grinning:",":grimacing:",":grin:",":joy:",":smiley:",":sweat_smile:",
                ":innocent:",":wink:",":blush:",":slight_smile:",":yum:",":heart_eyes:",
                ":kissing_heart:",":stuck_out_tongue_closed_eyes:",":money_mouth:",":nerd:",
                ":sunglasses:",":hugging:",":thinking:",":flushed:",":disappointed:",":rage:",
                ":confused:",":persevere:",":tired_face:",":triumph:",":open_mouth:",":scream:",
                ":cold_sweat:",":cry::disappointed_relieved:",":sweat::sob:",":head_bandage:",":poop:",
                ":spy::tongue:",":pray::muscle:",":clap::v:",":ok_hand:",":point_up:",":middle_finger:",
                ":metal::vulcan:"]
        })
    },

    render:function(){

        var emojiList = this.state.emoji.map(function(v,n){
            var createMarkup = function(){
                return {__html:emojione.shortnameToImage(v).toString()}
            }
            return <li key={n} dangerouslySetInnerHTML={createMarkup()} className="theEmoji" value={v}></li>
        })
        return (<ul className={this.props.hide?"hide":"show"+" emoji "}>
            {emojiList}
        </ul>)
    }
});
module.exports=EmojiList