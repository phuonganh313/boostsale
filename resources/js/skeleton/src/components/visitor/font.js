import React, { Component, Fragment } from 'react';
import {AppProvider, Select } from '@shopify/polaris';
import { optionFontWeight, optionsOrderFont } from "../../constants";

export default class Font extends Component {
    
    handleChangeValue  = ( name, newValue) => {
        this.props.handleChangeValue(name, newValue)
    };

    render(){
        const { fontWeight, fontStyle } = this.props;
        return(
        <Fragment>
            <div className="font-weight haft-width">
                <p>{lang.style}</p>
                <AppProvider>
                    <Select
                        label=""
                        labelInline
                        options={optionFontWeight}
                        onChange={this.handleChangeValue.bind(this, 'fontWeight')}
                        value={fontWeight}
                        onFocus={this.props.closedColorPicker}
                    /> 
                </AppProvider>
            </div>
            <div className="font-style haft-width right">
                <p>{lang.font}</p>
                <AppProvider>
                    <Select
                        label=""
                        labelInline
                        options={optionsOrderFont}
                        onChange={this.handleChangeValue.bind(this, 'fontStyle')}
                        value={fontStyle}
                        onFocus={this.props.closedColorPicker}
                    /> 
                </AppProvider>
            </div>
        </Fragment>
        );
    }
}