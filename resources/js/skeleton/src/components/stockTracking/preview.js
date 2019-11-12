import React, { Component,Fragment } from 'react';
import ClassNames from 'classnames'

export default class Preview extends Component {

    renderContent(){
        const { content, textColor, quantityColor, backgroundColor, stock } = this.props;
        let style={
            color: textColor,
        };
        const randomNumber = Math.floor((Math.random() * stock) + 1)
        const result = content.indexOf("[[Qty]]") >= 0 ? content.replace("[[Qty]]", "<span style='color: "+quantityColor+" !important;'>"+randomNumber+"</span>") : content;
        return (
            <div className="render-content" style={{backgroundColor: backgroundColor}}>
                <p style={style} dangerouslySetInnerHTML={{ __html: result }}></p>
            </div>
        );
    }

    render(){
        const {stock} = this.props;
        return(
            <Fragment>
                <p class="title-preview">{lang.preview}</p>
                <div className={ClassNames({'preview-stock': true}, {'disabled-form' : !this.props.display})}>
                    <div className="preview-item-header">
                        <p className="item-small">{lang.quantity}</p>
                        <p>{lang.message}</p>
                    </div>
                    <div className="preview-item">
                        <p className="item-small">0</p>
                        <p>{lang.no_message}</p>
                    </div>
                    {
                        stock > 0 
                        ?
                        <Fragment>
                            <div className="preview-item">
                                <p className="item-small">{parseInt(stock)}</p>
                                {this.renderContent()}
                            </div>
                            <div className="preview-item">
                                <p className="item-small">{parseInt(stock)+1}</p>
                                <p>{lang.no_message}</p>
                            </div>
                        </Fragment>
                        :
                        null
                    }
                </div>
            </Fragment>
        );
    }
}