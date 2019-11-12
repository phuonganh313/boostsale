import React, { Component } from 'react';
import api from '../../api';
import Preview from './preview';
import Color from './color';
import Content from './content';
import Notification from '../notification';
import ClassNames from 'classnames'
import * as Validate from "../../models/validate.model"; 
import Lodash from 'lodash';

export default class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBackgroundColor: false,
            displayTextColor: false,
            displayQuantityColor: false,
            isFetching: true,
            isChecked: null,
            form: {
                stock: 0,
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                quantityColor: '#F54337',
                content: lang.only_qty_items_in_our_stock_hurry_up,
                active: 1,      
            }, 
            message: '',  
            display: true,
            displayBackgroundColor: false,
            displayTextColor: false,
            displayQuantityColor: false,
            validates: {}
        };
    }

    async componentWillMount(){
        const response = await api.getStockTracking();
        const result = JSON.parse(response.text);
        this.setState( { isChecked: this.props.isChecked } );
        this.setState( { showPicker: !this.props.showPicker } );
        this.setState( { showPersonalize: !this.state.showPersonalize } );
	    if(result.data){
            this.setState({
                form: Object.assign({}, this.state.form, {
                    backgroundColor: result.data.background_color,
                    textColor: result.data.text_color,
                    quantityColor: result.data.quantity_color,
                    content: result.data.content,
                    stock: result.data.stock_quantity,
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
            case 'backgroundColor':
                this.setState({
                    displayBackgroundColor: !this.state.displayBackgroundColor,
                    displayTextColor: false,
                    displayQuantityColor: false,
                });
                break;
            case 'textColor':
                this.setState({
                    displayTextColor: !this.state.displayTextColor,
                    displayBackgroundColor: false,
                    displayQuantityColor: false,
                });
                break;
            case 'quantityColor':
                this.setState({
                    displayQuantityColor: !this.state.displayQuantityColor,
                    displayBackgroundColor: false,
                    displayTextColor: false,
                });
                break;
            default: 
                return;
        }
    }

    handleChangeValue(name, value){
        let {validates} = this.state;
        switch(name){
            case 'stock':
                validates[name] = Validate.isNumeric(value) ? 'valid' : 'invalid';
            break;
        }
        this.setState({ 
            form: Object.assign({}, this.state.form, {
                [name]: value
            }),
            validates: Lodash.assign({}, this.state.validates, validates),
        });
        
    }

    changeHandlerColor = (name, colors) => {
        this.setState({ 
            form: Object.assign({}, this.state.form, {
                [name]: colors.color
            }), 
        });
    };
   
    async onSubmit(){
        this.setState({
            isFetching: true
        });
        try{
            const fetch = await api.saveStockTracking(this.state.form);
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
            displayBackgroundColor: false,
            displayTextColor: false,
            displayQuantityColor: false,
        });
    }

    render(){
        const { isFetching, form, message, display, displayBackgroundColor, displayTextColor, displayQuantityColor, validates } = this.state;
        const { textColor, quantityColor, content, stock,  backgroundColor} = this.state.form;
        const disabledOnClick =  Lodash.every(Lodash.values(validates), function(value) {return value == 'valid'}) ? true : false;
        if(isFetching){ return (
            <div id="page_loading">
                <div className="loading">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom" />
                </div>
            </div>
        )}else {
            return(
                <div className="home-container">
                    <p className="text-intro-screen">{lang.show_your_low_stock_state_Make_a_message}</p>
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
                        
                        <div className={ClassNames({'stock-settings': true}, {'disabled-form' : !display})}>
                            <Content 
                                content = {content}
                                stock = {stock}
                                handleChangeValue = {this.handleChangeValue.bind(this)}
                                closedColorPicker = {this.closedColorPicker}
                            />

                            <Color 
                                backgroundColor = {backgroundColor}
                                textColor   = {textColor}
                                quantityColor = {quantityColor}
                                handleChangeValue = {this.handleChangeValue.bind(this)}
                                changeHandlerColor = {this.changeHandlerColor.bind(this)}
                                handleClick={this.handleClick.bind(this)}
                                displayBackgroundColor = {displayBackgroundColor}
                                displayQuantityColor = {displayQuantityColor}
                                displayTextColor = {displayTextColor}
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
                                className={ClassNames({'pos-button': true}, {'disabled-form' : !display}, {'disabled-form': !disabledOnClick})}
                            >
                                {lang.save}
                            </a>
                        </div>
                    </div>
                    <div className="right-container hide">
                        <Preview 
                            content = {form.content}
                            textColor = {form.textColor}
                            quantityColor = {form.quantityColor}
                            backgroundColor = {form.backgroundColor}
                            stock = {stock}
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