import React, { Component } from 'react';
import ClassNames from 'classnames'

export default class Preview extends Component {

    changeContent(){
        const { contentDisplay, backgroundColor, customerColor, productNameColor, purchasingColor, productFont, productStyle, customerFont, customerStyle, textColor, textFont, textStyle  } = this.props.form;
        const { order } = this.props;
        let style={
            color: textColor,
            fontFamily: textFont,
            fontWeight: textStyle,
            fontStyle : textStyle == 'italic' ? textStyle : ''
        };   
        const res = contentDisplay.replace("[[First Name]]", contentDisplay.indexOf("[[First Name]]") >= 0 ? "<span class='content-customer' style='color: "+customerColor+" !important; font-family: "+customerFont+" !important; font-weight: "+customerStyle+" !important; font-style: "+(customerStyle == 'italic' ? customerStyle : '')+" !important; '>"+order.customer_name+"</span>" : "[[First Name]]")
            .replace("[[City]]",contentDisplay.indexOf("[[City]]") >= 0 ?  "<span class='content-address'>"+order.customer_address+"</span>" : "[[City]]")
            .replace("[[Product Name]]",contentDisplay.indexOf("[[First Name]]") >= 0 ?  "<span class='content-product-name' style='color: "+productNameColor+" !important; font-family: "+productFont+" !important; font-weight: "+productStyle+" !important'; font-style: "+(productStyle == 'italic' ? productStyle : '')+" !important; '>"+order.product_name+"</span>" : "[[Product Name]]")
            .replace("[[Country]]",contentDisplay.indexOf("[[Country]]") >= 0 ?  "<span class='content-country'>"+order.customer_country+"</span>" : "[[Country]]")
            .replace("[[Last Name]]",contentDisplay.indexOf("[[Last Name]]") >= 0 ?  "<span class='content-lastname'>"+order.customer_last_name+"</span>" : "[[Last Name]]")
            .replace("[[Purchasing time]]",contentDisplay.indexOf("[[Purchasing time]]") >= 0 ?  "<span class='content-time' style='color: "+purchasingColor+" !important'>5 "+lang.minutes_ago+" </span>" : "[[Purchasing time]]");
        return (
            <div style={{ backgroundColor: backgroundColor }} className={ClassNames({'preview-order': true}, {'disabled-form' : !this.props.display})}>
                <img className="logo" src={order.product_img} />
                <p className="preview-info" style={style} dangerouslySetInnerHTML={{ __html: res }}></p>
            </div>
        );
    }   

    render(){
        return(
            <div className="demo-settings">
                <p className="title-preview">{lang.preview}</p>
                {this.changeContent()}
            </div>
        );
    }
}