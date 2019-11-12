import React, { Component } from 'react';
import {AppProvider, Select } from '@shopify/polaris';
import { optionsOrderFont } from "../../constants";
export default class Font extends Component {

    toggle(event){
        this.props.handleChangeToggle(event.target.dataset.index);
    }

    handleChangeValue  = (name, newValue) => {
        this.props.handleChangeValue(name, newValue)
    };

    render(){
        const { textFont, productFont, customerFont, orderFont } = this.props;
        return(
            <div className="order-font-view order-setting-item hide-content">
                <div className="order-title-item">
                    <p  data-index="orderFont" className={`collapsible-title ${orderFont ? 'open ': ''}`} onClick={this.toggle.bind(this)}>
                        {lang.font}
                        <span><i class="fa fa-minus"></i></span> 
                        <span><i class="fa fa-plus"></i></span> 
                    </p>
                </div>
                <div className={`order-font order-content-detail collapsible ${orderFont ? 'open ': ''}`}>
                    <div className="full-width">
                        <p>{lang.text}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderFont}
                                onChange={this.handleChangeValue.bind(this, 'textFont')}
                                value={textFont}
                            /> 
                        </AppProvider>
                    </div>

                    <div className="haft-width">
                        <p>{lang.product_name}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderFont}
                                onChange={this.handleChangeValue.bind(this, 'productFont')}
                                value={productFont}
                            /> 
                        </AppProvider>
                    </div>

                    <div className="haft-width right">
                        <p>{lang.customers_name}</p>
                        <AppProvider>
                            <Select
                                label=""
                                labelInline
                                options={optionsOrderFont}
                                onChange={this.handleChangeValue.bind(this, 'customerFont')}
                                value={customerFont}
                            /> 
                        </AppProvider>
                    </div>
                </div>
            </div>
        );
    }
}