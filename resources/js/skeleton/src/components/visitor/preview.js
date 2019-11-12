import React, { Component } from 'react';
import ClassNames from 'classnames'

export default class Preview extends Component {
    constructor(props){
        super(props);
        this.intervalId = null;
    }
    componentWillMount(){	
        this.intervalId = setInterval(
            function() {
                this.renderContent();
            }
            .bind(this),
            (5000)
        );
    }

    renderContent(){
        const { content, quantityColor } = this.props;
        const randomNumber = Math.floor((Math.random() * 10) + 1);
        const html = content.indexOf("[[Qty]]") >= 0 ? content.replace("[[Qty]]", "<span style='color: "+quantityColor+" !important;'>"+randomNumber+"</span>") : content;
        document.getElementById('visitor-content').innerHTML = html;
        setTimeout(
            function() {
                document.getElementById('visitor-content').innerHTML = null;
            }
            .bind(this),
            3000
        );
    }   

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render(){
        const { fontStyle, fontWeight, textColor } = this.props;
        const style={ 
            color: textColor,
            fontFamily: fontStyle,  
            fontWeight: fontWeight,
            fontStyle : fontWeight == 'italic' ? fontWeight : '',
        };   
        
        return(                        
            <div className="demo-settings">
                <p className="title-preview">{lang.preview}</p>
                <div className={ClassNames({'preview-visitor': true}, {'disabled-form' : !this.props.display})}>
                    <div className="preview-item-header">
                        <p className="item-small">{lang.qty}</p>
                        <p>{lang.content}</p>
                    </div>
                    <div className="preview-item">
                        <p className="item-small">{lang.no_one}</p>
                        <p>{lang.no_slide}</p>
                    </div>
                    <div className="preview-item">
                        <p className="item-small">>=2</p>
                        <p id="visitor-content" style={style}></p>
                    </div>
                </div>
            </div>
        );
    }
}