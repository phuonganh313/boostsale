import React, { Component } from 'react';
import { BOTTON_LEFT } from "../../models/bottomLeft.model";
import { BOTTON_RIGHT } from "../../models/bottomRight.model";
import { TOP_LEFT } from "../../models/topLeft.model";
import { TOP_RIGHT } from "../../models/topRight.model";
import { MB_BOTTOM_LEFT } from "../../models/mobileBottomLeft.model";
import { MB_BOTTOM_RIGHT } from "../../models/mobileBottomRight.model";
import { MB_TOP_LEFT } from "../../models/mobileTopLeft.model";
import { MB_TOP_RIGHT } from "../../models/mobileTopRight.model";

export default class Position extends Component {

    toggle(event){
        this.props.handleChangeToggle(event.target.dataset.index);
    }


    handleChangeValue = (event) => {
        this.props.handleChangeValue(event.target.name, event.target.value);
    }

    render(){
        const { pcPosition, mbPosition, orderPosition } = this.props;
        return(
            <div className="order-font-view order-setting-item hide-content">
                <div className="order-title-item">
                    <p data-index="orderPosition" className={`collapsible-title ${orderPosition ? 'open ': ''}`} onClick={this.toggle.bind(this)}>
                        {lang.position}
                        <span><i class="fa fa-minus"></i></span> 
                        <span><i class="fa fa-plus"></i></span> 
                    </p>
                </div>
                <div className={`order-position order-content-detail collapsible ${orderPosition ? 'open ': ''}`}> 
                    <div className="desktop">
                        <p className="">{lang.desktop}</p>
                        <div className="desktop-item-all">
                            <div className="desktop-item">
                                <img className="logo" src={BOTTON_LEFT} />
                                <input 
                                    type="radio" 
                                    name="pcPosition"
                                    value="botton_left"
                                    onClick={this.handleChangeValue.bind(this)}
                                    defaultChecked={pcPosition == 'botton_left' ? true : false} 
                                />
                            </div>
                            <div className="desktop-item">
                                <img className="logo" src={BOTTON_RIGHT} />
                                <input 
                                    type="radio" 
                                    name="pcPosition" 
                                    value="botton_right"
                                    onClick={this.handleChangeValue.bind(this)}
                                    defaultChecked={pcPosition == 'botton_right' ? true : false}  
                                />
                            </div>
                            <div className="desktop-item">
                                <img className="logo" src={TOP_LEFT} />
                                <input 
                                    type="radio" 
                                    name="pcPosition" 
                                    value="top_left"
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={pcPosition == 'top_left' ? true : false} 
                                />
                            </div>
                            <div className="desktop-item">
                                <img className="logo" src={TOP_RIGHT} />
                                <input 
                                    type="radio" 
                                    name="pcPosition" 
                                    value="top_right"
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={pcPosition == 'top_right' ? true : false} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mobile">
                        <p className="">{lang.mobile_tablet}</p>
                        <div className="mobile-item-all">
                            <div className="mobile-item">
                                <img className="logo" src={MB_BOTTOM_LEFT} />
                                <input 
                                    type="radio" 
                                    name="mbPosition" 
                                    value="botton_left"
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={mbPosition == 'botton_left' ? true : false} 
                                />
                            </div>
                            <div className="mobile-item">
                                <img className="logo" src={MB_BOTTOM_RIGHT} />
                                <input 
                                    type="radio" 
                                    name="mbPosition"
                                    value="botton_right" 
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={mbPosition == 'botton_right' ? true : false} 
                                />
                            </div>
                            <div className="mobile-item">
                                <img className="logo" src={MB_TOP_LEFT} />
                                <input 
                                    type="radio" 
                                    name="mbPosition" 
                                    value="top_left"
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={mbPosition == 'top_left' ? true : false} 
                                />
                            </div>
                            <div className="mobile-item">
                                <img className="logo" src={MB_TOP_RIGHT} />
                                <input 
                                    type="radio" 
                                    name="mbPosition" 
                                    value="top_right"
                                    onClick={this.handleChangeValue.bind(this)} 
                                    defaultChecked={mbPosition == 'top_right' ? true : false} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}