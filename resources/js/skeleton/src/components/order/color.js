import React, { Component, Fragment } from 'react';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';

export default class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayBackgroundColor: false,
            displayProductColor: false,
            displayCustomerColor: false,
            displayTextColor: false,
            displayPurchasingColor: false,
        };
    }
    
    handleClick(event){
        switch(event.target.name) {
            case 'backgroundColor':
                this.setState({
                    displayBackgroundColor: !this.state.displayBackgroundColor,
                    displayProductColor: false,
                    displayCustomerColor: false,
                    displayTextColor: false,
                    displayPurchasingColor: false,
                });
                break;
            case 'productColor':
                this.setState({
                    displayProductColor: !this.state.displayProductColor,
                    displayBackgroundColor: false,
                    displayCustomerColor: false,
                    displayTextColor: false,
                    displayPurchasingColor: false,
                });
                break;
            case 'customerColor':
                this.setState({
                    displayCustomerColor: !this.state.displayCustomerColor,
                    displayBackgroundColor: false,
                    displayProductColor: false,
                    displayTextColor: false,
                    displayPurchasingColor: false,
                });
                break;
            case 'textColor':
                this.setState({
                    displayTextColor: !this.state.displayTextColor,
                    displayBackgroundColor: false,
                    displayProductColor: false,
                    displayCustomerColor: false,
                    displayPurchasingColor: false,
                });
                break;
            case 'purchasingColor':
                this.setState({
                    displayPurchasingColor: !this.state.displayPurchasingColor,
                    displayTextColor: false,
                    displayBackgroundColor: false,
                    displayProductColor: false,
                    displayCustomerColor: false,
                });
                break;
            default:    
                return;
        }
    }   

    handleClose(){
        this.setState({ 
            displayBackgroundColor: false,
            displayProductColor: false,
            displayCustomerColor: false,
            displayTextColor: false,
            displayPurchasingColor: false, 
        })
    }

    changeHandlerColor = (name, colors) => {
        this.props.changeHandlerColor(name, colors)
    };
    
    handleChangeColor(event){
        this.props.handleChangeColor(event.target.name, event.target.value)
    }

    toggle(event){
        this.props.handleChangeToggle(event.target.dataset.index);
    }

    render(){
        const { backgroundColor, productNameColor, customerColor, textColor, purchasingColor, orderColor } = this.props;
        const {  displayBackgroundColor, displayProductColor, displayCustomerColor, displayTextColor, displayPurchasingColor} = this.state;
        return(
            <div className="order-color-view order-setting-item">
                <div className="order-title-item">
                    <p data-index="orderColor" className={`collapsible-title ${orderColor ? 'open': ''}`} onClick={this.toggle.bind(this)}>
                        {lang.color}
                        <span><i class="fa fa-minus"></i></span> 
                        <span><i class="fa fa-plus"></i></span> 
                    </p>
                </div>
                <div className={`order-color order-content-detail collapsible ${orderColor ? 'open ': ''}`}> 
                    <div className="full-width">
                        <p>{lang.background}</p>
                        <input 
                            type="text" 
                            style={{ backgroundColor: backgroundColor }} 
                            value={backgroundColor} 
                            onChange={this.handleChangeColor.bind(this)} 
                            onClick={this.handleClick.bind(this)}
                            name="backgroundColor"
                            className="form-control" 
                        />
                        {
                            displayBackgroundColor 
                            ?
                            <Fragment>
                                <ColorPickerPanel 
                                    alpha={80} 
                                    color={ backgroundColor } 
                                    onChange={this.changeHandlerColor.bind(this, 'backgroundColor')} 
                                    mode="HSB" 
                                    onBlur={ this.handleClose.bind(this) }
                                />
                            </Fragment>
                            :
                            null
                        }
                    </div>

                    <div  className="haft-width">
                        <p>{lang.product_name}</p>
                        <input 
                            type="text" 
                            style={{ backgroundColor: productNameColor }} 
                            value={productNameColor} 
                            onChange={this.handleChangeColor.bind(this)} 
                            onClick={this.handleClick.bind(this)}
                            name="productNameColor"
                            
                        />
                        {
                            displayProductColor 
                            ?
                            <Fragment>
                                <ColorPickerPanel 
                                    alpha={80} 
                                    color={ productNameColor } 
                                    onChange={this.changeHandlerColor.bind(this, 'productNameColor')} 
                                    mode="HSB" 
                                    onBlur={ this.handleClose.bind(this) }
                                />
                            </Fragment>
                            :
                            null
                        }
                    </div>
                    
                    <div className="haft-width right">
                        <p>{lang.customers_name}</p>
                        <input 
                            type="text" 
                            style={{ backgroundColor: customerColor }} 
                            value={customerColor} 
                            onChange={this.handleChangeColor.bind(this)} 
                            onClick={this.handleClick.bind(this)}
                            name="customerColor"
                            
                        />
                        {
                            displayCustomerColor 
                            ?
                            <Fragment>
                                <ColorPickerPanel 
                                    alpha={80} 
                                    color={ customerColor } 
                                    onChange={this.changeHandlerColor.bind(this, 'customerColor')} 
                                    mode="HSB" 
                                    onBlur={ this.handleClose.bind(this) }
                                />
                            </Fragment>
                            :
                            null
                        }
                    </div>

                    <div className="haft-width">
                        <p>{lang.text}</p>
                        <input 
                            type="text" 
                            style={{ backgroundColor: textColor }} 
                            value={textColor} 
                            onChange={this.handleChangeColor.bind(this)} 
                            onClick={this.handleClick.bind(this)}
                            name="textColor"
                            
                        />
                        {
                            displayTextColor 
                            ?
                            <Fragment>
                                <ColorPickerPanel 
                                    alpha={80} 
                                    color={ textColor } 
                                    onChange={this.changeHandlerColor.bind(this, 'textColor')} 
                                    mode="HSB" 
                                    onBlur={ this.handleClose.bind(this) }
                                />
                            </Fragment>
                            :
                            null
                        }
                    </div>

                    <div className="haft-width right">
                        <p>{lang.purchasing_time}</p>
                        <input 
                            type="text" 
                            style={{ backgroundColor: purchasingColor }} 
                            value={purchasingColor} 
                            onChange={this.handleChangeColor.bind(this)} 
                            onClick={this.handleClick.bind(this)}
                            name="purchasingColor"
                            
                        />
                        {
                            displayPurchasingColor 
                            ?
                            <Fragment>
                                <ColorPickerPanel 
                                    alpha={80} 
                                    color={ purchasingColor } 
                                    onChange={this.changeHandlerColor.bind(this, 'purchasingColor')} 
                                    mode="HSB" 
                                    onBlur={ this.handleClose.bind(this) }
                                />
                            </Fragment>
                            :
                            null
                        }
                    </div>
                </div> 
            </div>
        );
    }
}