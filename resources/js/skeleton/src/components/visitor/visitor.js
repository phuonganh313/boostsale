import React, { Component } from 'react';
import api from '../../api';
import 'emoji-mart/css/emoji-mart.css'
import Preview from './preview';
import Color from './color';
import Font from './font';
import Content from './content';
import Notification from '../notification';
import ClassNames from 'classnames'

export default class Visitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            isChecked: null,
            form: {
                textColor: '#000000',
                quantityColor: '#F54337',
                fontWeight: 'bold',
                fontStyle: 'timesNewRoman',
                content: lang.you_and_qty_other_people_viewing_this_product,
                timeToDisplay: 2,
                timeAmong: 5,      
                active: 1,      
            },
            message: '',     
            display: true,
            displayTextColor: false,
            displayQuantityColor: false,
        };
    }
    showPicker() {
        this.setState( { showPicker: !this.state.showPicker } );
    }
    showPersonalize() {
        this.setState( { showPersonalize: !this.state.showPersonalize } );
    }
    async componentWillMount(){
        const response = await api.getVisitor();
        const result = JSON.parse(response.text);
        this.setState( { isChecked: this.props.isChecked } );
        this.setState( { showPicker: !this.props.showPicker } );
        this.setState( { showPersonalize: !this.state.showPersonalize } );
	    if(result.data){
            this.setState({
                form: Object.assign({}, this.state.form, {
                    textColor: result.data.text_color,
                    quantityColor: result.data.quantity_color,
                    fontWeight: result.data.style,
                    fontStyle: result.data.font,
                    content: result.data.content,
                    timeToDisplay: result.data.time_to_display,
                    timeAmong: result.data.repeat,
                    active: result.data.active,
                }),
                isFetching: false,
            })
        }else{
            this.setState({
                isFetching: false,
            })
        }
    }

    handleClick(name){
        switch(name) {
            case 'textColor':
                this.setState({
                    displayTextColor: !this.state.displayTextColor,
                    displayQuantityColor: false,
                });
                break;
            case 'quantityColor':
                this.setState({
                    displayQuantityColor: !this.state.displayQuantityColor,
                    displayTextColor: false,
                });
                break;
            default: 
                return;
        }
    }

    changeHandlerColor = (name, colors) => {
        this.setState({ 
            form: Object.assign({}, this.state.form, {
                [name]: colors.color
            }), 
        });
    };


    handleChangeValue = (name, newValue) => {
        this.setState({
            form: Object.assign({}, this.state.form, {
                [name]: newValue
            }),
        });
    };


    async onSubmit(){
        this.setState({
            isFetching: true
        });
        try{
            const fetch = await api.saveRecentVistors(this.state.form);
            const result = JSON.parse(fetch.text);
            if(result.data){
                this.setState({
                    isFetching: false,
                    message: result.message
                })
            }
        }catch(errors){
            alert(errors.message)
        }
    }

    showChange = () => {
        this.setState({
            display: !this.state.display,
            active: this.state.display ? 1 : 0
        });
    }

    closedColorPicker = () => {
        this.setState({
            displayTextColor: false,
            displayQuantityColor: false,
        });
    }

    
    render(){
        const { isFetching, form, message, display, displayQuantityColor, displayTextColor } = this.state;
        const { textColor, quantityColor, fontStyle, fontWeight, content, timeAmong, timeToDisplay} = this.state.form;
        if(isFetching){ return (
            <div id="page_loading">
                <div className="loading">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom" />
                </div>
            </div>
        )}else {
            return(
                <div className="home-container">
                    <p className="text-intro-screen">{lang.show_number_of_customers_viewing_a_product_at_the_same_time_in_slides}</p>
                    <div className="left-container">
                        <div className="showing-popup">
                            <div className="switch-container1">
                                <span className="show-hide-popup">{lang.show}</span>
                                <div className="switch-container">
                                    <label>
                                        <input ref="switch" checked={ this.state.isChecked } onChange={ this._handleChange } onClick={this.showChange} className="switch" type="checkbox" />
                                        <div>
                                            <span>{lang.yes}</span><span className="no-fake">{lang.no}</span>
                                            <div className="show-change"><span>{lang.no}</span><span>{lang.yes}</span></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={ClassNames({'visitors-settings': true}, {'disabled-form' : !display})}>
                            <Color 
                                textColor = {textColor}
                                quantityColor = {quantityColor}
                                handleChangeValue = {this.handleChangeValue.bind(this)}
                                changeHandlerColor = {this.changeHandlerColor.bind(this)}
                                handleClick = {this.handleClick.bind(this)} 
                                displayQuantityColor = {displayQuantityColor}
                                displayTextColor = {displayTextColor}
                                closedColorPicker = {this.closedColorPicker}
                            />

                            <Font 
                                fontStyle = {fontStyle}
                                fontWeight = {fontWeight}
                                handleChangeValue = {this.handleChangeValue.bind(this)}
                                closedColorPicker = {this.closedColorPicker}
                            />

                            <Content 
                                content = {content}
                                timeAmong = {timeAmong}
                                timeToDisplay = {timeToDisplay}
                                handleChangeValue = {this.handleChangeValue.bind(this)}
                                closedColorPicker = {this.closedColorPicker}
                            />
                        </div>
                        <div className="pos-button-view">
                            <a 
                                href="javascript:void(0);" 
                                className="pos-button btn-preview"
                            >
                                Preview
                            </a>
                            <a 
                                href="javascript:void(0);" 
                                onClick ={this.onSubmit.bind(this)} 
                                className={ClassNames({'pos-button': true}, {'disabled-form' : !display})}
                            >
                                {lang.save}
                            </a>
                        </div>
                    </div>
                    <div className="right-container hide">
                        <Preview
                            content = {content}
                            fontStyle = {fontStyle}
                            fontWeight = {fontWeight}
                            textColor = {textColor}
                            quantityColor = {quantityColor}
                            timeAmong = {timeAmong}
                            timeToDisplay = {timeToDisplay}
                            display = {display}
                        />
                    </div>
                    {
                        message 
                        ?
                        <Notification 
                            content = {message}
                        />
                        :
                        null
                    }
                </div>
            );
        }
    }
}