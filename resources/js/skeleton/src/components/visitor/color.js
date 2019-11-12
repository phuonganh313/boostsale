import React,{ Component, Fragment } from 'react';
import 'rc-color-picker/assets/index.css';
import { Panel as ColorPickerPanel } from 'rc-color-picker';

export default class Color extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTextColor: false,
            displayQuantityColor: false,
        };
    }

    handleClick(event){
        this.props.handleClick(event.target.name)
    }

    changeHandlerColor(name, colors){
        this.props.changeHandlerColor(name, colors)
    };
    
    handleChangeValue(event){
        this.props.handleChangeValue(event.target.name, event.target.value);
    }
    
    render(){
        const { textColor, quantityColor, displayTextColor, displayQuantityColor } = this.props;
        return(
        <Fragment>
            <div className="text-color haft-width">
                <p>{lang.text_Color}</p>
                <input 
                    type="text" 
                    style={{ backgroundColor: textColor }} 
                    value={textColor} 
                    onChange={this.handleChangeValue.bind(this)} 
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
                            onBlur={ this.props.closedColorPicker }
                        />
                    </Fragment>
                    :
                    null
                }
            </div>
            <div className="text-color haft-width right">
                <p>{lang.quantity_color}</p>
                <input 
                    type="text" 
                    style={{ backgroundColor: quantityColor }} 
                    value={quantityColor} 
                    onChange={this.handleChangeValue.bind(this)} 
                    onClick={this.handleClick.bind(this)}
                    name="quantityColor"
                />
                {
                    displayQuantityColor 
                    ?
                    <Fragment>
                        <ColorPickerPanel 
                            alpha={80} 
                            color={ quantityColor } 
                            onChange={this.changeHandlerColor.bind(this, 'quantityColor')} 
                            mode="HSB" 
                            onBlur={ this.props.closedColorPicker }
                        />
                    </Fragment>
                    :
                    null
                }
            </div>
        </Fragment>    
        )
    }
}