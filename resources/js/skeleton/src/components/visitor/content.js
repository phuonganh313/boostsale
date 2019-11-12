import React,{ Component, Fragment } from 'react';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { optionsOrderTimeDisplay, optionsOrderTimeAmong } from "../../constants";
import {AppProvider, Select} from '@shopify/polaris';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicker:false,
            showPersonalize: false,
        };
    }
    componentWillMount(){
        this.setState( { showPicker: !this.props.showPicker } );
        this.setState( { showPersonalize: !this.state.showPersonalize } );
    }

    handleChangeValue(event){
        this.props.handleChangeValue(event.target.name, event.target.value);
    }
    
    handleChangeTimeDisplay(name, value) {
        this.props.handleChangeValue(name, value);
    }

    showPicker() {
        this.setState( { showPicker: !this.state.showPicker } );
    }

    showPersonalize() {
        this.setState( { showPersonalize: !this.state.showPersonalize } );
        this.props.closedColorPicker
    }

    insertAtCaret(areaId, text){
        var txtarea = document.getElementById(areaId);
        if (!txtarea) {
            return;
        }
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
            "ff" : (document.selection ? "ie" : false));
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        } else if (br == "ff") {
            strPos = txtarea.selectionStart;
        }

        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var ieRange = document.selection.createRange();
            ieRange.moveStart('character', -txtarea.value.length);
            ieRange.moveStart('character', strPos);
            ieRange.moveEnd('character', 0);
            ieRange.select();
        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }

        txtarea.scrollTop = scrollPos;
    }

    handleChangeEmoji = (emoji) => {
        this.insertAtCaret('textareaid', emoji.native);
        this.props.closedColorPicker
    }

    render(){
        const { content, timeAmong, timeToDisplay } = this.props;
        return(
        <Fragment>  
            <div className="content">
                <p>{lang.content}</p>
                <div className="content-visitor">
                    <div className="insert-text">
                        <textarea 
                            id="textareaid"
                            name="content"
                            onChange={this.handleChangeValue.bind(this)}
                            onBlur={this.handleChangeValue.bind(this)}
                            value={content}
                            onClick={this.props.closedColorPicker}
                        />
                        <p onClick={ this.showPicker.bind(this) } className="icon-show-picker">
                            <i className="fa fa-smile-o"></i>
                        </p>
                        <div className= { this.state.showPicker ? "picker-list hide-picker" : "picker-list" } >
                            <Picker set='emojione' onClick={this.handleChangeEmoji}/>
                        </div>
                    </div>
                    <div className="personal-info-detail">
                        <p onClick={this.showPersonalize.bind(this)} className= { this.state.showPersonalize ? "" : "no-ative" }>{lang.peronalize}</p>
                        <div className= { this.state.showPersonalize ? "presonalize-infor hide" : "presonalize-infor" }>
                            <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[Qty]]' )}>{lang.peronalize_qty}</button></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="time-to-display haft-width ">
                <p>{lang.time_to_display}</p>
                <AppProvider>
                    <Select
                        label=""
                        labelInline
                        options={optionsOrderTimeDisplay}
                        onChange={this.handleChangeTimeDisplay.bind(this, 'timeToDisplay')}
                        value={timeToDisplay}
                        onFocus={this.props.closedColorPicker}
                    /> 
                </AppProvider>
            </div>
            <div className="time-among haft-width right">
                <p>{lang.repeat}</p>
                <AppProvider>
                    <Select
                        label=""
                        labelInline
                        options={optionsOrderTimeAmong}
                        onChange={this.handleChangeTimeDisplay.bind(this, 'timeAmong')}
                        value={timeAmong}
                        onFocus={this.props.closedColorPicker}
                    /> 
                </AppProvider>
            </div>
        </Fragment>
        )
    }
}