import React, { Component } from 'react';
import api from '../../api';
import 'emoji-mart/css/emoji-mart.css'
import 'rc-color-picker/assets/index.css';
import Preview from './preview';
import Color from './color';
import Font from './font';
import Style from './style';
import Position from './position';
import Display from './display';
import Notification from '../notification';
import ClassNames from 'classnames'

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            isChecked: null,
            form: {
                active: 1,
                backgroundColor: '#f1cbcb',
                productNameColor: '#F54337',
                customerColor: '#FF6437',
                textColor: '#000000',
                purchasingColor: '#2296F3',
                textFont: 'verdana',
                productFont: 'verdana',
                customerFont: 'verdana',
                textStyle: 'italic',
                productStyle: 'normal',
                customerStyle: 'normal',
                timeToDisplay: 2,
                timeAmong: 5,
                orderDisplay: 7,
                placesDisplay: ["product_detail"],
                contentDisplay: lang.first_name_from_city_has_just_got_product_name,
                pcPosition: 'botton_left',
                mbPosition: 'botton_left',
            },      
            personalizeDisplay: false,
            order: '',
            message: '',
            display: true,
            orderColor: false,
            orderFont: false,
            orderStyle: false,
            orderPosition: false,
            orderContent: false,
        };
    }

    async componentWillMount(){
        const response = await api.getOrderSetup();
        const result = JSON.parse(response.text);
        this.setState({ 
            isChecked: this.props.isChecked,
            order: result.data.order,
        });
	    if(result.data.setting){
            this.setState({
                form: Object.assign({}, this.state.form, {
                    active: result.data.setting.active,
                    backgroundColor: result.data.setting.background,
                    productNameColor: result.data.setting.product_name_color,
                    customerColor: result.data.setting.customer_name_color,
                    textColor: result.data.setting.text_color,
                    purchasingColor: result.data.setting.purchasing_time,
                    textFont: result.data.setting.text_font,
                    productFont: result.data.setting.product_name_font,
                    customerFont: result.data.setting.customer_name_font,
                    textStyle: result.data.setting.text_style,
                    productStyle: result.data.setting.product_name_style,
                    customerStyle: result.data.setting.customer_name_style,
                    timeToDisplay: result.data.setting.time_to_display,
                    timeAmong: result.data.setting.repeat,
                    orderDisplay: result.data.setting.order_to_display,
                    placesDisplay: result.data.setting.places_to_display,
                    contentDisplay: result.data.setting.content,
                    position: result.data.setting.position,
                    pcPosition: result.data.setting.mb_position,
                    mbPosition: result.data.setting.pc_position,
                }),
                isFetching: false,
            })
        }else{
            this.setState({
                isFetching: false,
            })
        }
    }

    changeHandlerColor = (name, colors) => {
        this.setState({ 
            form: Object.assign({}, this.state.form, {
                [name]: colors.color
            }), 
        });
    };

    handleChangeColor(name, value){
        this.setState({ 
            form: Object.assign({}, this.state.form, {
                [name]: value
            }),
        });
        
    }

    handleChangeValue  = ( name, newValue) => {
        this.setState({
            form: Object.assign({}, this.state.form, {
                [name]: newValue
            }),
        });
    };

    handChangeContentDisplay = (event) => {
        this.setState({
            form: Object.assign({}, this.state.form, {
                contentDisplay: event.target.value
            }),
        });
    }

    async onSubmit(){
        this.setState({
            isFetching: true
        });
        try{
            const fetch = await api.saveRecentOrder(this.state.form);
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

    handleChangeToggle = (name) => {
        switch(name) {
            case 'orderColor':
                this.setState({
                    orderColor: !this.state.orderColor,
                    orderFont: false,
                    orderStyle: false,
                    orderPosition: false,
                    orderContent: false,
                });
                break;
            case 'orderFont':
                this.setState({
                    orderColor: false,
                    orderFont: !this.state.orderFont,
                    orderStyle: false,
                    orderPosition: false,
                    orderContent: false,
                });
                break;
            case 'orderStyle':
                this.setState({
                    orderColor: false,
                    orderFont: false,
                    orderStyle: !this.state.orderStyle,
                    orderPosition: false,
                    orderContent: false,
                });
                break;
            case 'orderPosition':
                this.setState({
                    orderColor: false,
                    orderFont: false,
                    orderStyle: false,
                    orderPosition: !this.state.orderPosition,
                    orderContent: false,
                });
                break;
            case 'orderContent':
                this.setState({
                    orderColor: false,
                    orderFont: false,
                    orderStyle: false,
                    orderPosition: false,
                    orderContent: !this.state.orderContent,
                });
                break;
            default:    
                return;
        }
    }

    render() {
        const { form, order, isFetching, message, display, orderColor, orderContent, orderFont, orderPosition, orderStyle } = this.state;
        if(isFetching){ return (
            <div id="page_loading">
                <div className="loading">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom" />
                </div>
            </div>
        )}else {
            return (
                <div className="home-container">
                    <p className="text-intro-screen">{lang.show_your_recently_purchased_products_by_showing_pop_ups}</p>
                    <div className="left-container">
                        <div className="showing-popup recent-order">
                            <div className="switch-container1">
                                <span className="show-hide-popup">{lang.show}</span>
                                <div className="switch-container">
                                    <label>
                                        <input ref="switch" checked={this.state.isChecked} onChange={this._handleChange} onClick={this.showChange} className="switch" type="checkbox" />
                                        <div>
                                            <span>{lang.yes}</span><span className="no-fake">{lang.no}</span>
                                            <div className="show-change"><span>{lang.no}</span><span>{lang.yes}</span></div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={ClassNames({'order-setting': true}, {'disabled-form' : !display})}>
                            <Color 
                                backgroundColor = {form.backgroundColor}
                                productNameColor = {form.productNameColor} 
                                customerColor = {form.customerColor}
                                textColor = {form.textColor}
                                purchasingColor = {form.purchasingColor}
                                changeHandlerColor = {this.changeHandlerColor.bind(this)}
                                handleChangeColor = {this.handleChangeColor.bind(this)}
                                orderColor = {orderColor}
                                handleChangeToggle = {this.handleChangeToggle}
                            />

                            <Font 
                                textFont = {form.textFont}
                                productFont = {form.productFont}
                                customerFont = {form.customerFont}
                                handleChangeValue = {this.handleChangeValue}
                                orderFont = {orderFont}
                                handleChangeToggle = {this.handleChangeToggle}
                            />
                            
                            <Style 
                                textStyle = {form.textStyle}
                                productStyle = {form.productStyle}
                                customerStyle = {form.customerStyle}
                                handleChangeValue = {this.handleChangeValue}
                                orderStyle = {orderStyle}
                                handleChangeToggle = {this.handleChangeToggle}
                            />
                           
                            <Position 
                                pcPosition = {form.pcPosition}
                                mbPosition = {form.mbPosition}
                                handleChangeValue = {this.handleChangeValue}
                                orderPosition = {orderPosition}
                                handleChangeToggle = {this.handleChangeToggle}
                            />
                              
                            <Display 
                                timeToDisplay = {form.timeToDisplay}
                                timeAmong = {form.timeAmong}
                                orderDisplay = {form.orderDisplay}
                                placesDisplay = {form.placesDisplay}
                                contentDisplay = {form.contentDisplay}
                                handleChangeValue = {this.handleChangeValue}
                                orderContent = {orderContent}
                                handleChangeToggle = {this.handleChangeToggle}
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
                    <div className={ClassNames({'right-container': true}, 'hide')}>
                        <Preview 
                            form = {form}
                            order = {order}
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


