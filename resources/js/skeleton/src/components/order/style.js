import React, { Component } from 'react';
import {AppProvider, Select } from '@shopify/polaris';
import { optionFontWeight } from "../../constants";

export default class Style extends Component {

    toggle(event){
        this.props.handleChangeToggle(event.target.dataset.index);
    }

    handleChangeValue  = ( name, newValue) => {
        this.props.handleChangeValue(name, newValue)
    };

    render(){
        const { textStyle, productStyle, customerStyle, orderStyle} = this.props;
        return(
            <div className="order-font-view  order-setting-item hide-content">
                <div className="order-title-item">
                    <p data-index="orderStyle" className={`collapsible-title ${orderStyle ? 'open ': ''}`} onClick={this.toggle.bind(this)}>
                        {lang.style}
                        <span><i class="fa fa-minus"></i></span> 
                        <span><i class="fa fa-plus"></i></span> 
                    </p>
                </div>
                <div className={`order-style order-content-detail collapsible ${orderStyle ? 'open ': ''}`}> 
                    <div className="full-width">
                        <p>{lang.text}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionFontWeight}
                                onChange={this.handleChangeValue.bind(this, 'textStyle')}
                                value={textStyle}
                            /> 
                        </AppProvider>
                    </div>

                    <div className="haft-width">
                        <p>{lang.product_name}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionFontWeight}
                                onChange={this.handleChangeValue.bind(this, 'productStyle')}
                                value={productStyle}
                            /> 
                        </AppProvider>
                    </div>

                    <div className="haft-width right">
                        <p>{lang.customers_name}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionFontWeight}
                                onChange={this.handleChangeValue.bind(this, 'customerStyle')}
                                value={customerStyle}
                            /> 
                        </AppProvider>
                    </div>
                </div>
            </div>
        );
    }
}