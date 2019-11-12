import React, { Component } from 'react';
import { AppProvider, Autocomplete, Select, Stack, Tag, TextContainer } from '@shopify/polaris';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { optionsOrderTimeDisplay, optionsOrderTimeAmong, optionsOrderDisplay, optionsOrderPlacesDisplay } from "../../constants";

export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            options: optionsOrderPlacesDisplay,
            content: '',
            showPicker:false,
            showPersonalize: false,
        }
    }

    componentWillMount(){
        this.setState({ showPicker: !this.state.showPicker });
        this.setState({ showPersonalize: !this.state.showPersonalize });
    }

    showPicker() {
        this.setState({ showPicker: !this.state.showPicker });
    }

    showPersonalize() {
        this.setState({ showPersonalize: !this.state.showPersonalize });
    }
    
    updateText = (newValue) => {
        this.setState({inputText: newValue});
        this.filterAndUpdateOptions(newValue);
    };
    
    removeTag = (tag) => {
        let newSelected = this.props.placesDisplay;
        newSelected.splice(newSelected.indexOf(tag), 1);
        this.props.handleChangeValue('placesDisplay', newSelected);
    };
    
    renderTags = () => {
        return this.props.placesDisplay.map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = this.titleCase(tagLabel);
          return (
            <Tag key={'option' + option} onRemove={() => this.removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        });
    };
    
    filterAndUpdateOptions = (inputString) => {
        if (inputString === '') {
          this.setState({
            options: optionsOrderPlacesDisplay,
          });
          return;
        }
    
        const filterRegex = new RegExp(inputString, 'i');
        const resultOptions = optionsOrderPlacesDisplay.filter((option) =>
          option.label.match(filterRegex),
        );
        let endIndex = resultOptions.length - 1;
        if (resultOptions.length === 0) {
          endIndex = 0;
        }
        this.setState({
          options: resultOptions,
        });
    };
    
    updateSelection = (updatedSelection) => {
        this.props.handleChangeValue('placesDisplay', updatedSelection);
    };

    titleCase(string) {
        string = string
          .toLowerCase()
          .split(' ')
          .map(function(word) {
            return word.replace(word[0], word[0].toUpperCase());
          });
        return string.join(' ');
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

    handleChangeEmoji = (emoji, event) => {
        this.insertAtCaret('textareaid', emoji.native);
    }

    handleChangeValue = (name, value) => {
        this.props.handleChangeValue(name, value);
    }

    handleChangeContent = (event) => {
        this.props.handleChangeValue(event.target.name, event.target.value);
    }

    toggle(event){
        this.props.handleChangeToggle(event.target.dataset.index);
    }

    render(){
        const { timeToDisplay, timeAmong, orderDisplay, placesDisplay, contentDisplay, orderContent } = this.props;
        return(
            <div className="order-display-view order-setting-item hide-content">
                <div className="order-title-item">
                    <p data-index="orderContent" className={`collapsible-title ${orderContent ? 'open ': ''}`} onClick={this.toggle.bind(this)}>
                        {lang.display}
                        <span><i class="fa fa-minus"></i></span>
                        <span><i class="fa fa-plus"></i></span> 
                    </p>
                </div>
                <div children="order-display" className={`order-display order-content-detail collapsible ${orderContent ? 'open ': ''}`}>
                    <div className="changeContent-item">
                        <p>{lang.content}</p>
                        <div className="content-visitor">
                            <div className="insert-text">
                                <textarea 
                                    id="textareaid"
                                    name="contentDisplay"
                                    onChange={this.handleChangeContent}
                                    onBlur={this.handleChangeContent}
                                    value={contentDisplay}
                                />
                                <p  onClick={ this.showPicker.bind(this) } 
                                    className= "icon-show-picker">
                                    <i className="fa fa-smile-o"></i>
                                </p>
                                <div className= { this.state.showPicker ? "picker-list hide-picker" : "picker-list" } >
                                    <Picker set='emojione' onClick={this.handleChangeEmoji}/>
                                </div>
                            </div>
                            <div className="personal-info-detail">
                                <p onClick={this.showPersonalize.bind(this)} className= { this.state.showPersonalize ? "" : "no-ative"} >{lang.peronalize}</p>
                                <div className= { this.state.showPersonalize ? "presonalize-infor hide" : "presonalize-infor " } >
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[Last Name]]' )}>{lang.peronalize_last_name}</button></span>
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[First Name]]' )}>{lang.peronalize_first_name}</button></span>
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[Product Name]]' )}>{lang.peronalize_product_name}</button></span>
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[City]]' )}>{lang.peronalize_city}</button></span>
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[Country]]' )}>{lang.peronalize_country}</button></span>
                                    <span><button type="button" onClick={this.insertAtCaret.bind(this, 'textareaid', '[[Purchasing time]]' )}>{lang.peronalize_purchasing_time}</button></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="full-width display-block">
                        <p>{lang.time_to_display}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderTimeDisplay}
                                onChange={this.handleChangeValue.bind(this, 'timeToDisplay')}
                                value={timeToDisplay}
                            /> 
                        </AppProvider>
                    </div>
                    <div className="full-width display-block">
                        <p>{lang.repeat}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderTimeAmong}
                                onChange={this.handleChangeValue.bind(this, 'timeAmong')}
                                value={timeAmong}
                            /> 
                        </AppProvider>
                    </div>
                    <div className="limit-display-order">
                        <p>{lang.order_to_display}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderDisplay}
                                onChange={this.handleChangeValue.bind(this, 'orderDisplay')}
                                value={orderDisplay}
                            /> 
                        </AppProvider>
                    </div>
                    <div className="clear-fix">
                        <p>{lang.places_to_display}</p>
                        <div >
                            <AppProvider>
                                <TextContainer>
                                    <Stack>{this.renderTags()}</Stack>
                                </TextContainer>
                            </AppProvider>
                            <p className="hr-provider"></p>
                            <AppProvider>
                                <Autocomplete
                                    allowMultiple
                                    options={this.state.options}
                                    selected={placesDisplay}
                                    textField={
                                        <Autocomplete.TextField
                                            onChange={this.updateText}
                                            label=""
                                            value={this.state.inputText}
                                            placeholder="home page, product list, product detail"
                                        />
                                    }
                                    onSelect={this.updateSelection}
                                    listTitle="Suggested Tags"
                                />
                            </AppProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}